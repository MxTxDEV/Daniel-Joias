#!/usr/bin/env node
/**
 * Gera `data/image-manifest.json` a partir do conteúdo de `public/images`.
 *
 * Como funciona o sistema de imagens do projeto:
 *   - cada imagem referenciada no código tem um `slot` (ex.: `hero/principal`);
 *   - basta salvar o arquivo em `public/images/<slot>.<ext>` e rodar o build:
 *     a fotografia entra no lugar do placeholder automaticamente;
 *   - nenhuma alteração de componente é necessária ao trocar as imagens.
 *
 * Executado automaticamente em `predev` e `prebuild`.
 */
import { readdir, writeFile, stat } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();
const IMAGES_DIR = path.join(ROOT, 'public', 'images');
const OUTPUT = path.join(ROOT, 'data', 'image-manifest.json');

/**
 * Ordem de preferência: SVG (logo) primeiro, depois formatos modernos.
 * Fotografias devem ser entregues em .avif/.webp (ou .jpg como fallback).
 */
const EXTENSION_PRIORITY = ['.svg', '.avif', '.webp', '.jpg', '.jpeg', '.png'];

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await walk(full)));
    } else if (entry.isFile()) {
      files.push(full);
    }
  }

  return files;
}

async function main() {
  const slots = {};

  if (existsSync(IMAGES_DIR)) {
    const files = await walk(IMAGES_DIR);

    for (const file of files) {
      const ext = path.extname(file).toLowerCase();
      if (!EXTENSION_PRIORITY.includes(ext)) continue;

      const relative = path.relative(IMAGES_DIR, file).split(path.sep).join('/');
      const slot = relative.slice(0, -ext.length);
      const current = slots[slot];
      const priority = EXTENSION_PRIORITY.indexOf(ext);

      if (!current || priority < current.priority) {
        const info = await stat(file);
        slots[slot] = {
          src: `/images/${relative}`,
          bytes: info.size,
          priority,
        };
      }
    }
  }

  // Sem timestamp: a saída só muda quando as fotografias mudam, então o
  // arquivo versionado não gera diff a cada build.
  const manifest = {
    slots: Object.fromEntries(
      Object.entries(slots)
        .sort(([a], [b]) => a.localeCompare(b))
        .map(([slot, value]) => [slot, { src: value.src, bytes: value.bytes }]),
    ),
  };

  await writeFile(OUTPUT, `${JSON.stringify(manifest, null, 2)}\n`, 'utf8');

  const count = Object.keys(manifest.slots).length;
  console.log(
    count === 0
      ? '[imagens] Nenhuma fotografia encontrada em public/images — placeholders editoriais serão exibidos.'
      : `[imagens] ${count} fotografia(s) mapeada(s) a partir de public/images.`,
  );
}

main().catch((error) => {
  console.error('[imagens] Falha ao gerar o manifest:', error);
  process.exit(1);
});
