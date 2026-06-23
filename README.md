# 📚 Estudos Bíblicos — Web App de Leitura Premium

Uma aplicação web construída com **Next.js 16+** e **React 19**, projetada para leitura focada, rápida e otimizada. O sistema processa arquivos Markdown estáticos do diretório `/content/`, extraíndo metadados estruturados (título, tags, categoria, imagem) que permitem uma experiência de navegação sem tempo real — tudo construído em **Static Site Generation (SSG)** para máximo desempenho e SEO.

> ✅ Sem banco de dados tradicional  
> ✅ 100% Markdown nativo via `gray-matter` + `remark-gfm`  
> ✅ Renderização segura com rejeição adequada a tags como string simples  
> ✅ Design customizado Vanilla CSS global (sem frameworks utilitários)  

## 🚀 Começando

Execute o servidor de desenvolvimento:

```bash
npm run dev
# ou
pnpm dev
#ou
yarn dev
```

Acesse `http://localhost:3000` no seu navegador para ver a página inicial da biblioteca.

## 📂 Estrutura do Projeto

Diretório **src/** contém as camadas arquiteturais principais:

### Camada de Roteamento

- **app/** → App Router Next.js (configurações globais, home e estudos únicos)
- `components/` → UI Components (`StudyCard`, `MarkdownRenderer`, filtros em desenvolvimento)
- `globals.css/page.css` → Design System base + Tokens escuros com Glassmorphism

### Camada de Domínio / Regras (Lib)

- **lib/markdown.ts** -> Controller do sistema: lê `/content/`, extrai metadados e conteúdo, garante integridade dos dados (`tags: string[]`)
- **lib/types.ts** → Contratos estáticos para tipagem total

### Persistência de Dados

```text
/content/<nome>.md    # Folders MD (Frontmatter) + body texto renderizado por parser do Markdown

Formato YAML Frontmatter obrigatório:
---
title: "Título"
date: "2026-04-15"  ## Ordenação automática
description: "Resumo para SEO e preview"
category?: 'Teologia'
tags?: ['teologia', 'criptismo']
image?: '/caminho/para/imagem.jpg'
author: ? "Nome do Autor"
---

Conteúdo Markdown rico (tables, lists) renderizado via react-markdown.
```

## 🌟 Funcionalidades Principais

| Feature                                  | Status     | Detalle                                        |
| ---------------------------------------- | ---------- | ---------------------------------------------- |
| Biblioteca de Estudos                    | ✅ Completo| Agrupado por Categoria e Tag única             |
| Estudo Único (Slug Dinâmico)             | ✅ Completo| `estudo/[slug]` via SSG + generateStaticParams |
| Filtro por Categoria                     | ⚠️ Em Dev  | Lógico completo, UI em andamento               |
| Filtro por Tag                           | 🏗 Backlog  | API pronta                                     |
| Renderização Rica markdown (tables, GFM) | ✅ Completo| `remark-gfm` + react-markdrop                  |
| Lazy Loading de Imagens                  | ⚠️ Backlog | Não bloqueado ainda                            |

## 🎨 Design System & UI/UX

- **Modo Escuro** (Dark Mode): Tons `#0f0f13`, `#1a1a24`
- Core Visuals: Glassmorphism containers (`rgba(255, 255, 255, 0.05)`) + Borders suaves
- **Paleta Neon**: Acentos em Roxo (`#7c3aed`) e Rosa-magenta (`#ec4899`)

## 🔧 Tech Stack

| Categoria       | Technology                                | Propósito                                   |
| --------------- | ----------------------------------------- | ------------------------------------------- |
| Framework Front | ✅ Next.js 16+ (App Router)               | Roteamento SSG + Server Functions           |
| UI              | ✅ React 19                               | Componentes Funcionais                      |
| CSS             | Vanilla Global Customized (`globals.css`) | Design System Sem Tailwind                  |
| Data Parsing    | ✅ `gray-matter`                          | Extrair Frontmatter/Markdown de arquivos MD |
| Markdown GFM    | ✅ `remark-gfm`                           | Tabelas + List Tasks + Auto-Link            |
| Typescript      | ✅ TS5 with strict mode                   | Typing safety                               |

## 🧪 Teste Manual (Manual Testing)

1. Verifique o servidor rodando:

   ```bash
   npm run dev # ou pnpm/dev, etc
   ```

2. Navegue até a página inicial `http://localhost:3000` — você verá uma **Grid de Cards** agrupados por categorias.
3. Clique em um card para acessar o estudo detalhado (`/estudo/[slug]`)

## 📈 Performance e Produtividade (Milestones Atual)

- ✅ SSG gerado via Next.js na hora do build — zero runtime overhead
✅ Parsing robusto com fallbacks de dados e sanitização automática
- ⚠️ Lazy loading não implementado ainda (Fase 6 - SEO/Performance em andamento)  
🏗 API aberta para OpenGraph, Schema.org + sitemap automático

## 👥 Contribuidores & Créditos

Arquivos `.md`:

```markdown
---
date: "2026-04-15"           # Ordenação automática (Novo primeiro)
description: ? texto SEO...   # preview do card
tags?: string[]                 # Se vazio ou inválido, converte para Array<string>
category?: 'Teologia'          # Agrupamento automático no Frontmatter
```

## 📖 Sobre o Projeto

Esta aplicação foi desenvolvida com foco em: **performance + SEO nítido**, sem bancos de dados (apenas arquivos locais), e design **clean/zen**. Ideal para conteúdo estático que não muda frequentemente — como estudos bíblicos, artigos científicos ou documentação técnica.

---
**License**: MIT License  
© 2026 Estudos Bíblicos Web App  
Built with ❤️ by [Nome do Autor] (substitua conforme necessário)
