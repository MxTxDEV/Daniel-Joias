import { siteConfig } from '@/data/site';

/** Monta um link wa.me com mensagem pré-preenchida. */
export function whatsappLink(message?: string): string {
  const text = encodeURIComponent(message ?? siteConfig.whatsapp.greeting);
  return `https://wa.me/${siteConfig.whatsapp.number}?text=${text}`;
}

/** Mensagem padrão de interesse em uma peça. */
export function productInterestMessage(productName: string): string {
  return `Olá, Daniel Joias. Tenho interesse no ${productName}. Gostaria de mais informações.`;
}

export function productWhatsappLink(productName: string): string {
  return whatsappLink(productInterestMessage(productName));
}
