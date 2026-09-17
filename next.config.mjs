/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    // AVIF/WebP são servidos automaticamente pelo next/image.
    formats: ['image/avif', 'image/webp'],
    // Larguras alinhadas aos breakpoints do design system.
    deviceSizes: [375, 390, 430, 768, 1024, 1280, 1440, 1920, 2560],
    imageSizes: [96, 160, 240, 320, 480, 640],
    /**
     * Cache do otimizador: 24h.
     * O cache é indexado pela URL de origem, então trocar o arquivo de uma
     * fotografia mantendo o mesmo nome pode levar até um dia para propagar.
     * Durante a fase de curadoria das imagens, publique a nova versão com
     * outro nome de arquivo (ou reduza este valor) para ver a troca na hora.
     */
    minimumCacheTTL: 60 * 60 * 24,
  },
  experimental: {
    optimizePackageImports: ['framer-motion'],
  },
  /**
   * Cabeçalhos de segurança aplicados a todas as rotas.
   * Não inclui Content-Security-Policy: uma CSP correta aqui exige nonce por
   * requisição (o Next injeta scripts inline) — deve ser adicionada junto com
   * o middleware, em uma etapa própria, para não quebrar a renderização.
   */
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(), payment=()',
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
