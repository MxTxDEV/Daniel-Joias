#!/usr/bin/env node
/**
 * Importa fotografias para o site.
 *
 * Uso:
 *   1. jogue os arquivos (jpg/png/webp/avif/tif) na pasta `fotos/`
 *   2. nomeie cada arquivo com o slot de destino, de um destes jeitos:
 *        fotos/hero/principal.jpg          → slot hero/principal
 *        fotos/hero-principal.jpg          → slot hero/principal
 *        fotos/produtos/anel-signature-01.jpg
 *   3. rode `npm run images:import`
 *
 * O script redimensiona, remove metadados, converte para AVIF e grava em
 * public/images/<slot>.avif — o site passa a usar a fotografia no próximo
 * build, sem alterar nenhum componente.
 */
import { readdir, mkdir, stat, unlink, readFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const ROOT = process.cwd();
const INPUT = path.join(ROOT, process.argv[2] ?? 'fotos');
const OUTPUT = path.join(ROOT, 'public', 'images');

const ACCEPTED = ['.jpg', '.jpeg', '.png', '.webp', '.avif', '.tif', '.tiff'];
const REPLACEABLE = ['.avif', '.webp', '.jpg', '.jpeg', '.png', '.svg'];

/** Largura máxima por tipo de slot — evita subir arquivo maior do que o site usa. */
function maxWidthFor(slot) {
  if (slot.startsWith('hero/') || slot === 'casamento/principal') return 2560;
  if (slot === 'colecoes/ouro' || slot === 'colecoes/prata') return 2560;
  if (slot.startsWith('menu/') || slot.startsWith('instagram/')) return 1200;
  return 1800;
}

/** Prefixos válidos — o primeiro hífen de um nome plano vira barra. */
const PREFIXES = [
  'hero', 'colecoes', 'menu', 'presentes', 'instagram', 'marca', 'produtos',
  'casamento', 'categorias', 'materiais',
];

function toSlot(relativePath) {
  const withoutExt = relativePath.slice(0, -path.extname(relativePath).length);
  const normalized = withoutExt.split(path.sep).join('/');
  if (normalized.includes('/')) return normalized;

  const prefix = PREFIXES.find((p) => normalized.startsWith(`${p}-`));
  return prefix ? `${prefix}/${normalized.slice(prefix.length + 1)}` : normalized;
}

/** Slots citados no código — serve para avisar sobre nomes que não existem. */
async function knownSlots() {
  const files = ['data/collections.ts', 'data/navigation.ts', 'data/brand.ts', 'components/home/Hero.tsx', 'components/home/WeddingSection.tsx'];
  const slots = new Set(['marca/logo-claro', 'marca/logo-escuro']);

  for (const file of files) {
    if (!existsSync(path.join(ROOT, file))) continue;
    const source = await readFile(path.join(ROOT, file), 'utf8');
    for (const match of source.matchAll(/slot: '([^']+)'/g)) slots.add(match[1]);
  }

  const products = await readFile(path.join(ROOT, 'data/products.ts'), 'utf8');
  for (const match of products.matchAll(/gallery\('([^']+)'/g)) {
    for (let i = 1; i <= 5; i += 1) slots.add(`produtos/${match[1]}-0${i}`);
  }
  for (const match of products.matchAll(/category: '([^']+)'/g)) {
    for (let i = 1; i <= 6; i += 1) slots.add(`categorias/${match[1]}-0${i}`);
  }
  for (const metal of ['ouro', 'prata']) {
    for (let i = 1; i <= 6; i += 1) slots.add(`materiais/${metal}-0${i}`);
  }
  // Conjunto genérico: preenche qualquer seção que ainda não tenha foto própria.
  for (let i = 1; i <= 12; i += 1) slots.add(`editorial-${String(i).padStart(2, '0')}`);

  return slots;
}

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) files.push(...(await walk(full)));
    else if (entry.isFile()) files.push(full);
  }
  return files;
}

function kb(bytes) {
  return `${Math.round(bytes / 1024)} kB`;
}

async function main() {
  if (!existsSync(INPUT)) {
    console.log(`\nCrie a pasta "${path.relative(ROOT, INPUT)}/" e coloque as fotografias nela.`);
    console.log('Nomeie cada arquivo com o slot de destino — ex.: hero-principal.jpg\n');
    console.log('A lista de slots está em public/images/README.md\n');
    return;
  }

  const known = await knownSlots();
  const files = (await walk(INPUT)).filter((f) => ACCEPTED.includes(path.extname(f).toLowerCase()));

  if (files.length === 0) {
    console.log(`Nenhuma imagem encontrada em ${path.relative(ROOT, INPUT)}/.`);
    return;
  }

  const unknown = [];
  let imported = 0;

  for (const file of files) {
    const slot = toSlot(path.relative(INPUT, file));
    const target = path.join(OUTPUT, `${slot}.avif`);

    await mkdir(path.dirname(target), { recursive: true });

    // Remove versões anteriores do mesmo slot em outros formatos.
    for (const ext of REPLACEABLE) {
      const previous = path.join(OUTPUT, `${slot}${ext}`);
      if (previous !== target && existsSync(previous)) await unlink(previous);
    }

    const before = (await stat(file)).size;
    const image = sharp(file).rotate();
    const meta = await image.metadata();
    const width = Math.min(meta.width ?? maxWidthFor(slot), maxWidthFor(slot));

    await image
      .resize({ width, withoutEnlargement: true })
      .avif({ quality: 60, effort: 4 })
      .toFile(target);

    const after = (await stat(target)).size;
    const flag = known.has(slot) ? '' : '  ← slot não usado pelo site';
    if (!known.has(slot)) unknown.push(slot);

    console.log(`${slot.padEnd(34)} ${kb(before).padStart(8)} → ${kb(after).padStart(8)}  (${width}px)${flag}`);
    imported += 1;
  }

  console.log(`\n${imported} fotografia(s) importada(s).`);

  if (unknown.length > 0) {
    console.log('\nAtenção: estes nomes não correspondem a nenhum slot do site —');
    console.log('confira a lista em public/images/README.md:');
    for (const slot of unknown) console.log(`  · ${slot}`);
  }

  console.log('\nAgora rode: npm run build\n');
}

main().catch((error) => {
  console.error('Falha ao importar fotografias:', error);
  process.exit(1);
});
