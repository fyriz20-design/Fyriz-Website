import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      // Vercel Blob (Medien-Manager)
      { protocol: 'https', hostname: '*.public.blob.vercel-storage.com' },
      // Platzhalter-Bilder für die Entwicklung
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'plus.unsplash.com' },
    ],
  },
}

export default nextConfig
