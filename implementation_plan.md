# 📋 Plano de Implementação - Estudos Bíblicos em Markdown

## 🎯 Visão Geral

Web app com **Next.js 16+** para renderizar e exibir arquivos markdown do repositório. Interface moderna, UX focada, sem TailwindCSS (Vanilla CSS sem Modules).

---

## 📁 Arquitetura do Sistema

```bash
src/
├── app/
│   ├── layout.tsx          # Root layout com Metadata global
│   ├── page.tsx            # Página inicial (biblioteca - Grid de cards)
│   ├── page.css            # Estilos da home (Grid e layouts)
│   ├── globals.css         # Estilos globais (Dark mode, typography, markdown styles)
│   ├── estudo/
│   │   └── [slug]/
│   │       ├── page.tsx    # Página de estudo individual
│   │       ├── page.css    # Estilização própria da view de estudo
│   │       ├── not-found.tsx
│   │       └── not-found.css
│   └── components/
│       ├── StudyCard.tsx   # Card responsivo com tags
│       ├── MarkdownRenderer.tsx # Renderização segura via react-markdown
│       ├── CategoryFilter.tsx
│       └── TagFilter.tsx
├── lib/
│   ├── markdown.ts         # Controller de leitura de .md
│   └── types.ts            # Tipos TypeScript exportados
└── content/                # Pasta com arquivos .md

```

---

## 🚀 Status das Etapas de Implementação

### **Fase 1: Controller de Leitura** ✅ (CONCLUÍDO)

* `src/lib/types.ts` criado (`MarkdownMetadata`, `MarkdownContent`).
* Leitura e parsing de frontmatter com `gray-matter` implementados.
* Renderização avançada (`remark-gfm`).
* Tratamento automático de tags para array e slugs limpos.

### **Fase 2: Páginas e Roteamento** 🔄 (EM ANDAMENTO)

* Rota raiz com grid de categorias e rota dinâmica `estudo/[slug]/page.tsx` criadas.
* Geração estática via `generateStaticParams()` garantindo build SSG.
* Metadata dinâmica configurada por estudo.

### **Fase 3: Estilização Premium (Vanilla CSS)** 🔄 (EM ANDAMENTO)

* Design System consolidado em `globals.css` (Dark Mode, paleta neon-roxo, suporte nativo ao markup gerado pelo react-markdown).
* Efeitos de *Glassmorphism* implementados.
* Grids e views estilizados usando arquivos globais diretos (`page.css`), descartando a necessidade de CSS Modules.

### **Fase 4: Layout e Tratamento de Erros** 🔄 (EM ANDAMENTO)

* `layout.tsx` localizado (`pt-BR`).
* Páginas `not-found.tsx` devidamente criadas com design amigável.

### **Fase 5: Componentes Reutilizáveis** 🔄 (EM ANDAMENTO)

* ✅ `StudyCard.tsx` e `MarkdownRenderer.tsx` implementados e modulares.
* ⏳ `CategoryFilter.tsx` (Para agrupamento de estudos).
* ⏳ `TagFilter.tsx` (Cloud de tags / Busca cruzada).

### **Fase 6: SEO e Performance** 🔄 (EM ANDAMENTO)

* ✅ SSG operante e Metadatas geradas.
* ⏳ Lazy Loading de imagens no MarkdownRenderer.
* ⏳ Inclusão de OpenGraph e Schema.org para Artigos.
* ⏳ Gerador de `sitemap.xml`.

---

## 📊 Decisões de Arquitetura Tomadas

| Decisão                | Racional                                                                                                                                                       |
| ---------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **gray-matter**        | Implementado para unificar leitura de frontmatter nos MDs originais.                                                                                           |
| **Categorias**         | Foi criada lógica no reducer em `page.tsx` para agrupar dinamicamente qualquer categoria fornecida.                                                            |
| **Vanilla CSS**        | Optou-se por arquivos globais e standard (sem CSS modules) devido à facilidade de referenciar classes globais aninhadas geradas pelo `react-markdown`.         |
| **Páginas SSG**        | Melhor performance e SEO. Os markdowns só requerem uma nova build no momento da atualização do repositório.                                                    |
| **Parsing de Tags**    | Devido aos formatos variados no content, foi adicionado tratamento para strings separadas por vírgula no gray-matter se converterem consistentemente em array. |
| **Imagens absolutas**  | Evita problemas de paths relativos                                                                                                                             |
| **Categorias livres**  | Flexibilidade para qualquer string                                                                                                                             |
| **Ordenação por data** | Mais recente primeiro (padrão UX)                                                                                                                              |
| **App Router**         | Next.js 16+, melhor performance                                                                                                                                |

---

## 🚀 Etapas de Implementação

## ✅ Checklist de Verificação (Build Atual)

### Build e Compilação

* [ ] `npm run build` - SSG operante com sucesso. Sem erros de renderização ou array maps em `tags`.
* [ ] `npm run lint` - Sem warnings críticos bloqueantes.
* [ ] `npm run dev` - Servidor rodando

### Funcionalidades Implementadas

* [x] Navegar em `http://localhost:3000/` - Cards sendo montados com os arquivos disponíveis em `/content/`.
* [x] Navegar em rotas de estudo (`/estudo/amor-em-palavras`).
* [x] Conteúdos em markdown apresentados esteticamente.
* [x] Links de Retorno operacionais na navegação e NotFound.
* [ ] Navegar em `http://localhost:3000/` - Cards agrupados
* [ ] Navegar em `http://localhost:3000/estudo/{slug}` - Artigo renderizado
* [ ] Imagens carregam corretamente
* [ ] Filtros por categoria funcionam
* [ ] Tags são clicáveis

### SEO e Performance

* [ ] Metadata aparece no inspector
* [ ] Schema.org válido
* [ ] Imagens lazy-loaded
* [ ] Core Web Vitals bons

### Responsividade

* [ ] Mobile (320px+)
* [ ] Tablet (768px+)
* [ ] Desktop (1024px+)

---

## 🗺️ Roadmap de Funcionalidades

### **Fase 1: Essencial** ✅

* Controller de leitura
* Páginas básicas
* Estilização dark mode
* Componentes básicos

### **Fase 2: Melhorias** 🔄

* Busca por texto
* Filtros avançados
* Exportar para PDF
* Modo claro/escuro

### **Fase 3: Avançado** 🚀

* Analytics (Google Analytics)
* PWA (installable)
* Comments system
* Newsletter integration

---

## 🗺️ Próximos Passos (Backlog)

1. **Filtros e Busca**: Construir a interatividade do usuário na home permitindo buscar pelo título e filtrar por *Tags*.
2. **Design de Imagens**: Garantir o Lazy Loading nos metadados dentro das chamadas de imagens do `react-markdown`.
3. **Sitemap**: Gerador de sitemap para rastreabilidade de novos estudos (`sitemap.xml`).

---

## 📦 Dependências

```json
{
  "dependencies": {
    "next": "16.2.3",
    "react": "^19",
    "react-dom": "^19",
    "gray-matter": "^5",
    "react-markdown": "^9",
    "remark-gfm": "^4"
  }
}
```

---

## 🗂️ Schema de Frontmatter

```yaml
---
title: "Título do Estudo"
date: "2026-04-11"
description: "Descrição curta"
category: "Teologia"
tags: ["amor", "grego"]
image: "/imagens/estudo.jpg"
author: "Autor"
---
```

**Campos obrigatórios:** `title`, `date`, `description`  
**Campos opcionais:** `category`, `tags`, `image`, `author`

---

## 🔧 Tipos TypeScript

### `src/lib/types.ts`

```typescript
export interface MarkdownMetadata {
  title: string
  date: string
  description: string
  category?: string
  tags?: string[]
  image?: string
  author?: string
}

export interface MarkdownContent {
  metadata: MarkdownMetadata
  content: string
}

export interface StudyCardProps {
  metadata: MarkdownMetadata
  href: string
}
```

---

## 📝 Componentes Reutilizáveis

### 1. `StudyCard` - Card Responsivo

* Glassmorphism effect
* Imagem de capa (opcional)
* Tags e categoria
* Link para estudo

### 2. `MarkdownRenderer` - Renderização Segura

* Usa `react-markdown`
* Suporte a imagens
* Fallback para links quebrados
* Schema.org para SEO

### 3. `CategoryFilter` - Filtro por Categoria

* Dropdown ou tags clicáveis
* Agrupamento automático

### 4. `TagFilter` - Filtro por Tags

* Cloud de tags
* Contador de estudos por tag

---

## 🎨 Estilização Vanilla CSS

### Paleta de Cores (Dark Mode)

```css
:root {
  --bg-primary: #0f0f13;
  --bg-secondary: #1a1a24;
  --bg-card: rgba(255, 255, 255, 0.05);
  --text-primary: #e0e0e0;
  --text-secondary: #a0a0a0;
  --accent-primary: #7c3aed;
  --accent-secondary: #ec4899;
  --border-color: rgba(255, 255, 255, 0.1);
}
```

### Glassmorphism

```css
.glass-card {
  background: var(--bg-card);
  backdrop-filter: blur(10px);
  border: 1px solid var(--border-color);
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
}
```

### Micro-animações

```css
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

.card {
  animation: fadeIn 0.5s ease-out;
}
```

---

## 📝 Notas Importantes

1. **Sem TailwindCSS** - Apenas Vanilla CSS
2. **Next.js 16+** - App Router, Server Components
3. **TypeScript** - Tipagem completa
4. **SEO First** - Metadata dinâmico
5. **Performance** - Lazy loading, code splitting

---

## 🎯 Status Atual

* **Documentação:** ✅ Completa
* **Tipos TypeScript:** ✅ Definidos
* **Componentes:** ✅ Especificados
* **Roadmap:** ✅ Claro
* **Checklist:** ✅ Pronto

---

**Pronto para implementação!** 🚀

---

## ✅ Plano Aprovado

O plano está completo e aprovado para implementação. Vamos começar com a **Fase 1: Controller de Leitura**.

**Pronto para começar?** 🚀
