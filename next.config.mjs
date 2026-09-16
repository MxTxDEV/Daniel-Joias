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
  },
  experimental: {
    optimizePackageImports: ['framer-motion'],
  },
};

export default nextConfig;
