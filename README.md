# 📚 Estudos Bíblicos — Web App de Leitura Premium

Uma aplicação web construída com **Next.js 16+** e **React 19**, projetada para leitura focada, rápida e otimizada. O sistema processa arquivos Markdown estáticos do diretório `/content/`, extraindo metadados estruturados (título, tags, categoria, imagem) que permitem uma experiência de navegação sem tempo real — tudo construído em **Static Site Generation (SSG)** para máximo desempenho e SEO.

> ✅ Sem banco de dados tradicional
> ✅ 100% Markdown nativo via `gray-matter` + `remark-gfm`
> ✅ Renderização segura com rejeição adequada a tags como string simples
> ✅ Design customizado Vanilla CSS global (sem frameworks utilitários)
> ✅ MenuBar global com busca client-side via `Ctrl+K` / `⌘K`

## 🚀 Começando

Execute o servidor de desenvolvimento:

```bash
pnpm dev
# ou
npm run dev
```

Acesse `http://localhost:3000` no seu navegador para ver a página inicial da biblioteca.

## 📂 Estrutura do Projeto

Diretório **src/** contém as camadas arquiteturais principais:

### Camada de Roteamento

- **app/** → App Router Next.js (configurações globais, home e estudos únicos)
- `components/` → UI Components (`StudyCard`, `MarkdownRenderer`, `MenuBar`, `SearchButton`)
- `globals.css` / `page.css` → Design System base + Tokens escuros com Glassmorphism

### Camada de Domínio / Regras (Lib)

- **lib/markdown.ts** → Controller do sistema: lê `/content/`, extrai metadados e conteúdo, garante integridade dos dados (`tags: string[]`)
- **lib/types.ts** → Contratos estáticos para tipagem total

### Persistência de Dados

```markdown
/content/<nome>.md    # Arquivos MD com Frontmatter YAML + corpo em Markdown

Formato YAML Frontmatter obrigatório:
---
title: "Título"
date: "2026-04-15"        # Ordenação automática (mais recente primeiro)
description: "Resumo para SEO e preview"
category?: 'Teologia'
tags?: ['teologia', 'criptismo']
image?: '/caminho/para/imagem.jpg'
author?: "Nome do Autor"
---

Conteúdo Markdown rico (tables, lists) renderizado via react-markdown.
```

## 🌟 Funcionalidades Principais

| Feature | Status | Detalhe |
| --- | --- | --- |
| Biblioteca de Estudos | ✅ Completo | Agrupado por categoria |
| Estudo Único (Slug Dinâmico) | ✅ Completo | `estudo/[slug]` via SSG + `generateStaticParams` |
| MenuBar global | ✅ Completo | Sticky, glassmorphism, responsiva |
| Busca `Ctrl+K` / `⌘K` | ✅ Completo | Modal client-side, filtro por título/categoria/tag, navegação por teclado |
| Renderização Rica Markdown (GFM) | ✅ Completo | `remark-gfm` + `react-markdown` |
| Filtro por Categoria | ⚠️ Em Dev | Lógica completa, UI em andamento |
| Filtro por Tag | 🏗 Backlog | API pronta |
| Lazy Loading de Imagens | 🏗 Backlog | Não bloqueado |

## 🔍 Busca com `Ctrl+K` / `⌘K`

A barra de busca está integrada na `MenuBar` e funciona como um command palette:

- **Trigger visual** — botão no estilo de input com ícone de lupa e badge de atalho de teclado
- **Atalho global** — `Ctrl+K` (Windows/Linux) ou `⌘K` (Mac) em qualquer página
- **Modal animado** — overlay com blur, slide-down suave
- **Busca em tempo real** — filtra por título, descrição, categoria e tags simultaneamente
- **Navegação por teclado** — `↑↓` para navegar, `↵` para abrir, `Esc` para fechar
- **Sem requisições em runtime** — índice gerado no servidor em build-time e embutido no HTML

### Arquitetura de dados da busca

```bash
getStudies()  (Node.js, build-time)
  └─→ MenuBar  (async Server Component)
        └─→ studyIndex prop
              └─→ SearchButton  (Client Component, zero fetch em runtime)
```

Essa arquitetura é totalmente compatível com `output: 'export'` (GitHub Pages).

## 🎨 Design System & UI/UX

- **Modo Escuro** (Dark Mode): Tons `#0f0f13`, `#1a1a24`
- **Glassmorphism**: containers `rgba(255, 255, 255, 0.05)` + bordas suaves
- **Paleta de acentos**: Roxo (`#7c3aed`) e Rosa-magenta (`#ec4899`)
- **Animações**: shimmer de skeleton, slide-down no modal de busca, hover micro-interactions

## 🔧 Tech Stack

| Categoria | Technology | Propósito |
| --- | --- | --- |
| Framework | Next.js 16+ (App Router) | Roteamento SSG + Server Components |
| UI | React 19 + react-dom 19.2.7 | Componentes Funcionais |
| CSS | Vanilla CSS Modules + globals.css | Design System sem Tailwind |
| Data Parsing | `gray-matter` | Extrair Frontmatter de arquivos MD |
| Markdown | `remark-gfm` + `react-markdown` | Tabelas, listas, auto-link |
| Typescript | TS5 strict mode | Tipagem total |

## 🧪 Teste Manual

1. Suba o servidor de desenvolvimento:

   ```bash
   pnpm dev
   ```

2. Acesse `http://localhost:3000` — você verá a **grid de cards** agrupados por categoria.
3. Clique em um card para acessar o estudo detalhado (`/estudo/[slug]`).
4. Pressione `Ctrl+K` (ou `⌘K` no Mac) para abrir a busca e teste a navegação por teclado.

## 📈 Performance

- ✅ SSG gerado via Next.js na hora do build — zero runtime overhead
- ✅ Busca client-side com índice embutido no HTML — sem requisição extra
- ✅ Parsing robusto com fallbacks de dados e sanitização automática de tags
- ⚠️ Lazy loading de imagens ainda não implementado (Fase futura)

## 📖 Sobre o Projeto

Esta aplicação foi desenvolvida com foco em **performance + SEO**, sem banco de dados (apenas arquivos locais Markdown), e design **clean/dark**. Ideal para conteúdo estático que não muda frequentemente — como estudos bíblicos, artigos científicos ou documentação técnica.

---

**License**: MIT License
© 2026 Estudos Bíblicos Web App
