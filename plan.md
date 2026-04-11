# Criação de Aplicação Next.js para Estudos Bíblicos em Markdown

Este plano descreve como criaremos o web app com Next.js 16+ para renderizar e exibir arquivos markdown que estão no repositório. O objetivo é entregar uma interface de ponta, esteticamente moderna, focada em UX e sem depender de TailwindCSS, utilizando Vanilla CSS.

## User Review Required

> [!SUCCESS]
> **Plano Aprovado:** O plano abaixo foi revisado e aprovado para implementação.

## Proposed Changes

---

### Setup e Configuração do Projeto Next.js

O projeto já está configurado com Next.js 16.2.3, TypeScript e todas as dependências necessárias.

#### package.json
Dependências já instaladas: `gray-matter`, `react-markdown`, `remark-gfm`, `next`, `react`, `react-dom`.

---

### Processamento e Leitura de Content/Markdown

Criaremos uma lógica em backend (executada no servidor Next.js) que lida com a busca dos markdowns.

#### [NEW] src/lib/markdown.ts
Um controlador que varre a pasta `content/` atrás de arquivos `.md`, faz o seu *parsing* com a biblioteca `gray-matter` para extrair os metadados (como `title`, `date`, `description`) e entrega o conteúdo completo que o componente de React utilizará.

**Funcionalidades:**
- Varre `content/` para encontrar arquivos `.md`
- Extrai metadados do frontmatter
- Suporta renderização de imagens
- Agrupamento por categorias (se houver campo `category` no frontmatter)

---

### Páginas e Navegação (App Router)

Configuraremos a navegação para uma página inicial bonita e suporte a visualização dinâmica de cada estudo.

#### [MODIFY] src/app/page.tsx
Página inicial (`/`) que atuará como uma biblioteca de conteúdo, exibindo lindos cards responsivos com efeitos *glassmorphism* contendo o resumo e links para todos os arquivos markdown disponíveis.

**Funcionalidades:**
- Lista todos os estudos agrupados por categoria
- Cards responsivos com glassmorphism
- Links para cada estudo individual

#### [NEW] src/app/estudo/[slug]/page.tsx
Rota dinâmica (`/estudo/nome-do-arquivo`) especializada em ler, estruturar de forma semântica e apresentar com tipografia premium o documento markdown traduzido em HTML limpo através do `react-markdown`.

**Funcionalidades:**
- Recebe `params.slug` da rota dinâmica
- Chama o controlador para buscar o conteúdo
- Renderiza com `react-markdown`
- Suporta renderização de imagens
- Gera `Metadata` dinâmico baseado no frontmatter

---

### Estilização Estética e Design System (Vanilla CSS Premium)

Conforme a diretriz de não utilizar Tailwind, focaremos em escrever CSS robusto e estonteante.

#### [MODIFY] src/app/globals.css
Desenvolveremos paletas de cores escuras (Dark Mode com sotaque minimalista), micro-animações, layout e tipografia que dão o fator *WOW* para o leitor. Aplicaremos design system escalável aliendo beleza a facilidade de leitura aos artigos longos.

#### [MODIFY] src/app/page.module.css
Estilização específica para a página inicial com grid responsivo de cards.

---

### Estrutura de Categorias

#### Frontmatter Padrão
```yaml
---
title: "Título do Estudo"
date: "2026-04-11"
description: "Descrição curta do estudo"
category: "Categoria"  # Opcional, para agrupamento
---
```

**Categorias suportadas:**
- Qualquer string válida no campo `category`
- Agrupamento automático na página inicial
- Filtro por categoria (opcional no futuro)

---

## Etapas de Implementação

### Fase 1: Controlador de Leitura
1. Criar `src/lib/markdown.ts`
2. Implementar varredura de `content/`
3. Extrair metadados com `gray-matter`
4. Suportar imagens com `remark-gfm`
5. Agrupar por categoria

### Fase 2: Páginas
1. Modificar `src/app/page.tsx` - Grid de cards agrupados
2. Criar `src/app/estudo/[slug]/page.tsx` - Página de estudo individual

### Fase 3: Estilização
1. Modificar `src/app/globals.css` - Dark mode, tipografia
2. Modificar `src/app/page.module.css` - Grid de cards

### Fase 4: Layout
1. Modificar `src/app/layout.tsx` - Configurar `lang` e `Metadata`

---

## Verification

1. `npm run dev` - Compilação sem erros
2. Navegar em `http://localhost:3000/` - Cards agrupados por categoria
3. Navegar em `http://localhost:3000/estudo/o-papel-da-fe` - Artigo com imagens
4. Verificar SEO e responsividade

---

## Relevant Files
- `src/lib/markdown.ts` (NEW)
- `src/app/page.tsx` (MODIFY)
- `src/app/estudo/[slug]/page.tsx` (NEW)
- `src/app/globals.css` (MODIFY)
- `src/app/page.module.css` (MODIFY)
- `src/app/layout.tsx` (MODIFY)

---

## Decisions
- **Localização dos arquivos .md:** Pasta `content/`
- **Renderização de imagens:** Suportada nos markdowns
- **Agrupamento:** Por campo `category` no frontmatter (opcional)
- **Rota de estudos:** `/estudo/{slug}` onde slug é o nome do arquivo sem extensão
- **Design:** Dark mode minimalista com Vanilla CSS, sem Tailwind
- **Parsing:** `remark-gfm` para suporte a tabelas, citações, links

---

## Further Considerations
1. **Imagens:** Usar URLs absolutas para imagens
2. **Categorias:** Deixar aberto para qualquer string
3. **Ordenação:** Ordenar por data (mais recente primeiro)

---

**Status:** ✅ APROVADO - Pronto para implementação