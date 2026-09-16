import type { Metadata, Viewport } from 'next';
import { Cormorant_Garamond, Inter } from 'next/font/google';
import './globals.css';

import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { MobileMenu } from '@/components/layout/MobileMenu';
import { WhatsappButton } from '@/components/layout/WhatsappButton';
import { CartDrawer } from '@/components/cart/CartDrawer';
import { SearchOverlay } from '@/components/search/SearchOverlay';
import { Cursor } from '@/components/ui/Cursor';
import { ShopProvider } from '@/lib/shop/ShopContext';
import { siteConfig } from '@/data/site';
import { organizationSchema, websiteSchema } from '@/lib/seo';

/**
 * Tipografia: serifada fina para títulos editoriais, sans moderna para o
 * restante. Apenas dois famílias e apenas os pesos usados — as fontes são
 * auto-hospedadas pelo next/font (sem requisição a terceiros em runtime).
 */
const display = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400'],
  style: ['normal', 'italic'],
  display: 'swap',
  variable: '--font-display',
});

const sans = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  display: 'swap',
  variable: '--font-sans',
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: siteConfig.title,
    description: siteConfig.description,
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.title,
    description: siteConfig.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
  category: 'shopping',
};

export const viewport: Viewport = {
  themeColor: '#080808',
  colorScheme: 'dark',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${display.variable} ${sans.variable}`}>
      <body className="min-h-screen bg-ink">
        <script
          type="application/ld+json"
          // Dados estruturados da marca e do site.
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([organizationSchema(), websiteSchema()]),
          }}
        />

        <ShopProvider>
          <Header />
          <MobileMenu />
          <SearchOverlay />
          <CartDrawer />

          <main id="conteudo">{children}</main>

          <Footer />
          <WhatsappButton />
          <Cursor />
        </ShopProvider>
      </body>
    </html>
  );
}
