import type { NextConfig } from "next"

// Evita repetição: basePath e assetPrefix devem ser sempre iguais
const basePath = process.env.PAGES_BASE_PATH || ''

const nextConfig: NextConfig = {
  output: 'export',           // gera ./out com HTML/CSS/JS estáticos
  basePath,                   // prefixo das rotas (ex: /estudos-biblicos)
  assetPrefix: basePath,      // ← NOVO: prefixo dos chunks JS/CSS no HTML gerado
  trailingSlash: true,        // evita 404 no GitHub Pages
  images: {
    unoptimized: true         // obrigatório: sem servidor de imagem no export estático
  }
  // turbopack removido: root não é opção válida; Turbopack ativa-se via CLI
}

export default nextConfig