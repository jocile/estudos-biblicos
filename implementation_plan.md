# 📋 Plano de Implementação - Estudos Bíblicos em Markdown (Atualizado)

## 🎯 Visão Geral

Web app com **Next.js 16+** para renderizar e exibir arquivos markdown do repositório. Interface moderna, UX focada, sem TailwindCSS (Vanilla CSS).

---

## 📁 Arquitetura do Sistema

```
src/
├── app/
│   ├── layout.tsx          # Root layout com Metadata
│   ├── page.tsx            # Página inicial (biblioteca)
│   ├── page.css            # Estilos da home (Grid e layouts)
│   ├── globals.css         # Estilos globais, typography e Markdown render styles
│   ├── estudo/
│   │   └── [slug]/
│   │       ├── page.tsx    # Página de estudo individual
│   │       ├── page.css    # Estilização própria da view de estudo
│   │       ├── not-found.tsx
│   │       └── not-found.css
│   └── components/
│       ├── StudyCard.tsx   # Card responsivo com tags
│       ├── MarkdownRenderer.tsx
│       ├── CategoryFilter.tsx (Pendente)
│       └── TagFilter.tsx (Pendente)
├── lib/
│   ├── markdown.ts         # Controller de leitura de .md
│   └── types.ts            # Tipos TypeScript exportados
└── content/                # Pasta com arquivos .md
```

---

## 🚀 Status das Etapas de Implementação

### **Fase 1: Controller de Leitura** ✅ (CONCLUÍDO)
- `src/lib/types.ts` criado com as interfaces principais (`MarkdownMetadata`, `MarkdownContent`).
- `src/lib/markdown.ts` funcional.
- Leitura e parsing de frontmatter com `gray-matter`.
- Renderização de Markdown avançado (`remark-gfm`).
- Tratamento automático de tags (garantindo que se tornem um Array) e Slugs limpos (ex: `amor-em-palavras`).

### **Fase 2: Páginas e Roteamento** ✅ (CONCLUÍDO)
- `src/app/page.tsx` refatorada para exibir grid de estudos separados por categorias.
- Rota dinâmica criada em `src/app/estudo/[slug]/page.tsx`.
- `generateStaticParams()` implementado para build SSG (Static Site Generation).
- `Metadata` dinâmica integrada nas páginas de estudo.

### **Fase 3: Estilização Premium** ✅ (CONCLUÍDO)
- Design System em `globals.css` com Dark Mode base, paleta neon-roxo (`--accent-primary`), propriedades customizadas e designação explícita para o markdown renderizado.
- Efeito Glassmorphism implementado nos cards e container de estudos.
- `src/app/page.css` refatorado com grid responsivo de 1 a N colunas.
- Estilização exclusiva (`page.css`) para a exibição de estudo com leitura focada.

### **Fase 4: Layout e Tratamento** ✅ (CONCLUÍDO)
- `layout.tsx` traduzido para `pt-BR` e `Metadata` global setado.
- Página `not-found.tsx` desenhada e estilizada com tratamento amigável de erro (404) quando um slug não existe.

### **Fase 5: Componentes Reutilizáveis** 🔄 (EM ANDAMENTO)
- ✅ `StudyCard.tsx` construído e implementado na rota principal.
- ✅ `MarkdownRenderer.tsx` modularizado.
- ⏳ `CategoryFilter.tsx` para filtros de categorias.
- ⏳ `TagFilter.tsx` para busca cruzada em tags.

### **Fase 6: SEO e Performance** 🔄 (EM ANDAMENTO)
- ✅ Build Estática garantida (páginas prerenderizadas).
- ✅ Metadatas por slug.
- ⏳ Inclusão de atributos visuais como OpenGraph.
- ⏳ Implementação de Schema.org para Artigos.

---

## ✅ Checklist de Verificação (Build Atual)

### Build e Compilação
- [x] `npm run build` - SSG operante com sucesso. Sem erros de renderização ou array maps em `tags`.
- [x] `npm run lint` - Sem warnings críticos bloqueantes.

### Funcionalidades Implementadas
- [x] Navegar em `http://localhost:3000/` - Cards sendo montados com os arquivos disponíveis em `/content/`.
- [x] Navegar em rotas de estudo (`/estudo/amor-em-palavras`).
- [x] Conteúdos em markdown apresentados esteticamente.
- [x] Links de Retorno operacionais na navegação e NotFound.

---

## 📊 Decisões de Arquitetura Tomadas

| Decisão | Racional |
|---------|----------|
| **gray-matter** | Implementado para unificar leitura de frontmatter nos MDs originais. |
| **Categorias** | Foi criada lógica no reducer em `page.tsx` para agrupar dinamicamente qualquer categoria fornecida. |
| **Vanilla CSS** | Optou-se por arquivos globais e standard (sem CSS modules) devido à facilidade de referenciar classes globais aninhadas geradas pelo `react-markdown`. |
| **Páginas SSG** | Melhor performance e SEO. Os markdowns só requerem uma nova build no momento da atualização do repositório. |
| **Parsing de Tags** | Devido aos formatos variados no content, foi adicionado tratamento para strings separadas por vírgula no gray-matter se converterem consistentemente em array. |

---

## 🗺️ Próximos Passos (Backlog)

1. **Filtros e Busca**: Construir a interatividade do usuário na home permitindo buscar pelo título e filtrar por *Tags*.
2. **Design de Imagens**: Garantir o Lazy Loading nos metadados dentro das chamadas de imagens do `react-markdown`.
3. **Sitemap**: Gerador de sitemap para rastreabilidade de novos estudos (`sitemap.xml`).

---
**Status Atualizado:** 12 de abril de 2026 - **Fases 1 a 4 CONCLUÍDAS**.
# 📋 Plano de Implementação - Estudos Bíblicos em Markdown

## 🎯 Visão Geral

Web app com **Next.js 16+** para renderizar e exibir arquivos markdown do repositório. Interface moderna, UX focada, sem TailwindCSS (Vanilla CSS).

---

## 📁 Arquitetura do Sistema

```
src/
├── app/
│   ├── layout.tsx          # Root layout com Metadata
│   ├── page.tsx            # Página inicial (biblioteca)
│   ├── globals.css         # Estilos globais (dark mode)
│   ├── page.module.css     # Estilos da home
│   ├── estudo/
│   │   └── [slug]/
│   │       ├── page.tsx    # Página de estudo individual
│   │       └── not-found.tsx
│   └── components/
│       ├── StudyCard.tsx   # Card responsivo
│       ├── MarkdownRenderer.tsx
│       ├── CategoryFilter.tsx
│       └── TagFilter.tsx
├── lib/
│   ├── markdown.ts         # Controller de leitura
│   └── types.ts            # Tipos TypeScript
└── content/                # Pasta com arquivos .md
```

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
- Glassmorphism effect
- Imagem de capa (opcional)
- Tags e categoria
- Link para estudo

### 2. `MarkdownRenderer` - Renderização Segura
- Usa `react-markdown`
- Suporte a imagens
- Fallback para links quebrados
- Schema.org para SEO

### 3. `CategoryFilter` - Filtro por Categoria
- Dropdown ou tags clicáveis
- Agrupamento automático

### 4. `TagFilter` - Filtro por Tags
- Cloud de tags
- Contador de estudos por tag

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

## 🚀 Etapas de Implementação

### **Fase 1: Controller de Leitura** ⏰ 30 min

**Objetivo:** Criar controller para ler markdowns

**Passos:**
1. Criar `src/lib/markdown.ts`
2. Implementar varredura de content
3. Extrair metadados com `gray-matter`
4. Suportar imagens com `remark-gfm`
5. Agrupar por categoria
6. Ordenar por data (mais recente)

**Saída:** Função `getStudies()` que retorna array de `MarkdownContent`

---

### **Fase 2: Páginas** ⏰ 45 min

**Objetivo:** Criar páginas da aplicação

**Passos:**
1. Modificar page.tsx - Grid de cards
2. Criar `src/app/estudo/[slug]/page.tsx`
3. Criar `src/app/estudo/[slug]/not-found.tsx`
4. Implementar geração dinâmica de Metadata

**Dependência:** Fase 1 concluída

---

### **Fase 3: Estilização** ⏰ 30 min

**Objetivo:** Aplicar design system

**Passos:**
1. Modificar globals.css - Dark mode, tipografia
2. Modificar page.module.css - Grid de cards
3. Criar `src/app/estudo/[slug]/page.module.css`
4. Adicionar micro-animações

**Dependência:** Fase 2 concluída

---

### **Fase 4: Layout** ⏰ 15 min

**Objetivo:** Configurar layout root

**Passos:**
1. Modificar layout.tsx
2. Configurar `lang` attribute
3. Adicionar `Metadata` base
4. Importar `globals.css`

**Dependência:** Todas as fases anteriores

---

### **Fase 5: Componentes** ⏰ 45 min

**Objetivo:** Criar componentes reutilizáveis

**Passos:**
1. Criar `src/app/components/StudyCard.tsx`
2. Criar `src/app/components/MarkdownRenderer.tsx`
3. Criar `src/app/components/CategoryFilter.tsx`
4. Criar `src/app/components/TagFilter.tsx`
5. Integrar componentes nas páginas

**Dependência:** Fases 1-3 concluídas

---

### **Fase 6: SEO e Performance** ⏰ 30 min

**Objetivo:** Otimizar para SEO

**Passos:**
1. Configurar `Metadata` dinâmico
2. Adicionar Schema.org para articles
3. Implementar lazy loading de imagens
4. Code splitting com Next.js
5. Configurar sitemap.xml

**Dependência:** Fase 5 concluída

---

### **Fase 7: Tratamento de Erros** ⏰ 20 min

**Objetivo:** Lidar com erros gracefully

**Passos:**
1. Criar página 404 customizada
2. Fallback para imagens quebradas
3. Tratamento de markdown inválido
4. Logs de erro no console

**Dependência:** Fase 2 concluída

---

## ✅ Checklist de Verificação

### Build e Compilação
- [ ] `npm run build` - Sem erros
- [ ] `npm run lint` - Sem warnings críticos
- [ ] `npm run dev` - Servidor rodando

### Funcionalidades
- [ ] Navegar em `http://localhost:3000/` - Cards agrupados
- [ ] Navegar em `http://localhost:3000/estudo/{slug}` - Artigo renderizado
- [ ] Imagens carregam corretamente
- [ ] Filtros por categoria funcionam
- [ ] Tags são clicáveis

### SEO e Performance
- [ ] Metadata aparece no inspector
- [ ] Schema.org válido
- [ ] Imagens lazy-loaded
- [ ] Core Web Vitals bons

### Responsividade
- [ ] Mobile (320px+)
- [ ] Tablet (768px+)
- [ ] Desktop (1024px+)

---

## 📊 Decisões de Arquitetura

| Decisão | Racional |
|---------|----------|
| **gray-matter** | Padrão da indústria, melhor que Obsidian |
| **Imagens absolutas** | Evita problemas de paths relativos |
| **Categorias livres** | Flexibilidade para qualquer string |
| **Ordenação por data** | Mais recente primeiro (padrão UX) |
| **Vanilla CSS** | Sem dependências, mais controle |
| **App Router** | Next.js 16+, melhor performance |

---

## 🗺️ Roadmap de Funcionalidades

### **Fase 1: Essencial** ✅
- Controller de leitura
- Páginas básicas
- Estilização dark mode
- Componentes básicos

### **Fase 2: Melhorias** 🔄
- Busca por texto
- Filtros avançados
- Exportar para PDF
- Modo claro/escuro

### **Fase 3: Avançado** 🚀
- Analytics (Google Analytics)
- PWA (installable)
- Comments system
- Newsletter integration

---

## 📝 Notas Importantes

1. **Sem TailwindCSS** - Apenas Vanilla CSS
2. **Next.js 16+** - App Router, Server Components
3. **TypeScript** - Tipagem completa
4. **SEO First** - Metadata dinâmico
5. **Performance** - Lazy loading, code splitting

---

## 🎯 Status Atual

- **Documentação:** ✅ Completa
- **Tipos TypeScript:** ✅ Definidos
- **Componentes:** ✅ Especificados
- **Roadmap:** ✅ Claro
- **Checklist:** ✅ Pronto

---

**Pronto para implementação!** 🚀

---

## ✅ Plano Aprovado

O plano está completo e aprovado para implementação. Vamos começar com a **Fase 1: Controller de Leitura**.

**Pronto para começar?** 🚀