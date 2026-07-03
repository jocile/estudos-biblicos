import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  output: 'export',
  basePath: process.env.PAGES_BASE_PATH || '', // fallback para dev local
  trailingSlash: true, // evita 404 no GitHub Pages
  images: {
    unoptimized: true // obrigatório sem servidor de imagem
  },
  turbopack: {
    root: __dirname // mantido para o dev server
  }
}

export default nextConfig
