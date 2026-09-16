import type { NavGroup, NavLink } from '@/types';

/** Mega-menu do header (desktop) e menu fullscreen (mobile). */
export const navigation: NavGroup[] = [
  {
    label: 'Masculino',
    href: '/colecoes/masculino',
    columns: [
      {
        title: 'Peças',
        links: [
          { label: 'Anéis', href: '/colecoes/masculino?categoria=aneis' },
          { label: 'Correntes', href: '/colecoes/masculino?categoria=correntes' },
          { label: 'Cordões', href: '/colecoes/masculino?categoria=cordoes' },
          { label: 'Pulseiras', href: '/colecoes/masculino?categoria=pulseiras' },
        ],
      },
      {
        title: 'Seleção',
        links: [
          { label: 'Destaques', href: '/colecoes/masculino?destaque=true' },
          { label: 'Ouro 18K', href: '/colecoes/ouro' },
          { label: 'Prata 925', href: '/colecoes/prata' },
        ],
      },
    ],
    feature: {
      image: {
        slot: 'menu/masculino',
        alt: 'Anel masculino em ouro 18K fotografado em macro sobre fundo preto',
        brief: 'Macro de anel masculino em ouro 18K, luz de estúdio lateral, fundo preto',
        aspect: 'editorial',
      },
      label: 'Em destaque',
      title: 'Anéis de presença discreta',
      href: '/colecoes/masculino?categoria=aneis',
    },
  },
  {
    label: 'Feminino',
    href: '/colecoes/feminino',
    columns: [
      {
        title: 'Peças',
        links: [
          { label: 'Anéis', href: '/colecoes/feminino?categoria=aneis' },
          { label: 'Correntes', href: '/colecoes/feminino?categoria=correntes' },
          { label: 'Colares', href: '/colecoes/feminino?categoria=colares' },
          { label: 'Pulseiras', href: '/colecoes/feminino?categoria=pulseiras' },
        ],
      },
      {
        title: 'Seleção',
        links: [
          { label: 'Destaques', href: '/colecoes/feminino?destaque=true' },
          { label: 'Ouro 18K', href: '/colecoes/ouro' },
          { label: 'Prata 925', href: '/colecoes/prata' },
        ],
      },
    ],
    feature: {
      image: {
        slot: 'menu/feminino',
        alt: 'Colar feminino em ouro 18K com reflexo natural do metal',
        brief: 'Colar delicado em ouro 18K sobre superfície acetinada, luz suave',
        aspect: 'editorial',
      },
      label: 'Em destaque',
      title: 'Correntes que acompanham o dia',
      href: '/colecoes/feminino?categoria=correntes',
    },
  },
  {
    label: 'Casamento',
    href: '/colecoes/casamento',
    columns: [
      {
        title: 'Para dizer sim',
        links: [
          { label: 'Alianças', href: '/colecoes/casamento?categoria=aliancas' },
          { label: 'Anéis de noivado', href: '/colecoes/casamento?categoria=noivado' },
          { label: 'Par de alianças', href: '/colecoes/casamento?categoria=par-de-aliancas' },
          { label: 'Solitários', href: '/colecoes/casamento?categoria=solitarios' },
        ],
      },
    ],
    feature: {
      image: {
        slot: 'menu/casamento',
        alt: 'Par de alianças em ouro 18K apoiado em tecido claro',
        brief: 'Par de alianças em ouro 18K, macro, tecido off-white, luz de janela',
        aspect: 'editorial',
      },
      label: 'Casamento',
      title: 'Alianças feitas para permanecer',
      href: '/colecoes/casamento?categoria=aliancas',
    },
  },
  {
    label: 'Presentes',
    href: '/colecoes/presentes',
    columns: [
      {
        title: 'Por quem recebe',
        links: [
          { label: 'Para ele', href: '/colecoes/presentes?para=ele' },
          { label: 'Para ela', href: '/colecoes/presentes?para=ela' },
        ],
      },
      {
        title: 'Por ocasião',
        links: [
          { label: 'Datas especiais', href: '/colecoes/presentes?ocasiao=datas-especiais' },
          { label: 'Presentes premium', href: '/colecoes/presentes?ocasiao=premium' },
        ],
      },
    ],
  },
  {
    label: 'Coleções',
    href: '/colecoes',
    columns: [
      {
        title: 'Matéria-prima',
        links: [
          { label: 'Ouro', href: '/colecoes/ouro' },
          { label: 'Prata', href: '/colecoes/prata' },
        ],
      },
      {
        title: 'Seleção',
        links: [
          { label: 'Novidades', href: '/colecoes/novidades' },
          { label: 'Mais vendidos', href: '/colecoes/mais-vendidos' },
        ],
      },
    ],
  },
];

export const footerNavigation: { title: string; links: NavLink[] }[] = [
  {
    title: 'Shop',
    links: [
      { label: 'Masculino', href: '/colecoes/masculino' },
      { label: 'Feminino', href: '/colecoes/feminino' },
      { label: 'Casamento', href: '/colecoes/casamento' },
      { label: 'Presentes', href: '/colecoes/presentes' },
      { label: 'Coleções', href: '/colecoes' },
    ],
  },
  {
    title: 'Atendimento',
    links: [
      { label: 'WhatsApp', href: 'whatsapp' },
      { label: 'Instagram', href: 'instagram' },
      { label: 'Contato', href: '/contato' },
      { label: 'FAQ', href: '/faq' },
    ],
  },
  {
    title: 'Institucional',
    links: [
      { label: 'Sobre', href: '/sobre' },
      { label: 'Política de Privacidade', href: '/politica-de-privacidade' },
      { label: 'Termos', href: '/termos' },
      { label: 'Trocas e Devoluções', href: '/trocas-e-devolucoes' },
    ],
  },
];
