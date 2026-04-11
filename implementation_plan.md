# Criação de Aplicação Next.js para Estudos Bíblicos em Markdown

Este plano descreve como criaremos o web app com Next.js 15+ para renderizar e exibir arquivos markdown que estão no repositório. O objetivo é entregar uma interface de ponta, esteticamente moderna, focada em UX e sem depender de TailwindCSS, utilizando Vanilla CSS.

## User Review Required

> [!IMPORTANT]
> **Confirmação do Plano:** Por favor, revise a documentação técnica abaixo e aprove caso o fluxo e tecnologias propostas (Next.js, TypeScript, TSX, react-markdown, gray-matter) estejam alinhados ao que você busca. Se desejar, adicionaremos uma página inicial dinâmica que lista todos os arquivos `.md` presentes no projeto para navegação.

## Proposed Changes

---

### Setup e Configuração do Projeto Next.js

Vamos inicializar o Next.js no atual repositório sem destruir o controle Git, utilizando TypeScript e o App Router.

#### [NEW] .eslintrc.json, next.config.mjs, tsconfig.json, package.json
Arquivos essenciais de infraestrutura configurados com Next.js, com dependências adicionais a serem incluídas: `react-markdown`, `gray-matter`, e `remark-gfm`.

---

### Processamento e Leitura de Content/Markdown

Criaremos uma lógica em backend (executada no servidor Next.js) que lida com a busca dos markdowns.

#### [NEW] src/lib/markdown.ts
Um controlador que varre a pasta `content/` ou raiz atrás de arquivos `.md`, faz o seu *parsing* com a biblioteca `gray-matter` para extrair os metadados (como `title`, `date`, `description`) e entrega o conteúdo completo que o componente de React utilizará.

---

### Páginas e Navegação (App Router)

Configuraremos a navegação para uma página inicial bonita e suporte a visualização dinâmica de cada estudo.

#### [NEW] src/app/page.tsx
Página inicial (`/`) que atuará como uma biblioteca de conteúdo, exibindo lindos cards responsivos com efeitos *glassmorphism* contendo o resumo e links para todos os arquivos markdown disponíveis.

#### [NEW] src/app/estudo/[slug]/page.tsx
Rota dinâmica (`/estudo/nome-do-arquivo`) especializada em ler, estruturar de forma semântica e apresentar com tipografia premium o documento markdown traduzido em HTML limpo através do `react-markdown`.
Garantirá práticas de SEO (`Metadata`), gerando proper `<title>` e meta descriptions baseados no `<frontmatter>` do documento.

---

### Estilização Estética e Design System (Vanilla CSS Premium)

Conforme a diretriz de não utilizar Tailwind, focaremos em escrever CSS robusto e estonteante.

#### [MODIFY] src/app/globals.css
Desenvolveremos paletas de cores escuras (Dark Mode com sotaque minimalista), micro as micro-animações, layout e tipografia que dão o fator *WOW* para o leitor. Aplicaremos design system escalável aliendo beleza a facilidade de leitura aos artigos longos.

#### [NEW] content/exemplo-de-estudo.md
Adicionaremos um artigo inicial de exemplo (se necessário) cobrindo frontmatter e demonstrações de renderização de listas, tabelas e cabeçalhos para testar a renderização da aplicação.

## Etapas de Verificação

### Verificação Automática & Manual
- Compilaremos e testaremos a aplicação localmente pelo comando `npm run dev` para garantir que o CSS e o SSR (Server-Side Rendering) funcionem propriamente e as rotas correspondam aos markdowns instalados.
- Testarmos SEO, uso de responsividade via emulação visual.
