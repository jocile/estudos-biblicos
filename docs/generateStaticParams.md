# 📖 `generateStaticParams()`

## Definição

A função **`generateStaticParams()`** é um hook especial do Next.js 13+ usado para gerar parâmetros estáticos dinamicamente durante o build SSG (Statically Generated Site). Ela permite criar rotas baseadas em dados externos, como arquivos `.md`.

---

## 🎯 Propósito no Projeto

No contexto deste projeto de estudos bíblicos:

- **Objetivo**: Gerar automaticamente todas as páginas `/estudo/[slug]` durante o build SSG
- **Dado Dinâmico**: Ler todos os slugs dos arquivos `.md` em content e criar rotas correspondentes

---

## 🔧 Implementação no markdown.ts

```typescript
// Função para obter todos os slugs dos estudos (para generateStaticParams)
export async function getSlugPaths(): Promise<string[]> {
  const studies = await getStudies()
  return studies.map(s => s.slug)
}

// Hook para gerar parâmetros estáticos dinamicamente a partir dos slugs dos estudos
export async function generateStaticParams() {
  const slugs = await getSlugPaths()
  return slugs.map((slug: string) => ({ slug }))
}
```

### Como Funciona Passo a Passo

1. **`getStudies()`** → Lê todos os arquivos `.md` do content, extrai metadados e retorna array de objetos `MarkdownContent[]`
2. **`.map(s => s.slug)`** → Extrai apenas o slug de cada estudo (ex: `"amor-em-palavras"`)
3. **`generateStaticParams()`** → Retorna objeto com estrutura esperada pelo Next.js: `{ slug }`

---

## 📋 Estrutura Retornada para Next.js

```typescript
// Exemplo do que será retornado pela função generateStaticParams()
;[
  { slug: 'amor-em-palavras' },
  { slug: 'a-existencia-de-deus' },
  { slug: 'a-trindade' }
]
```

---

## 🔄 Fluxo Completo (SSG)

### Durante o Build (`npm run build`)

1. **Next.js detecta** a função `generateStaticParams()` em next.config.ts
2. **Chama automaticamente** após compilar as páginas estáticas
3. **Executa `getSlugPaths()`** → Retorna array de slugs dos estudos
4. **Cria rotas dinâmicas**: `/estudo/[slug]` para cada slug retornado

### No Runtime (após build)

```typescript
// Exemplo: src/app/estudo/[slug]/page.tsx
import { getStudyBySlug } from '@/lib/markdown';

export async function generateStaticParams() {
  return [
    { slug: "amor-em-palavras" },
    // ... todos os outros slugs gerados dinamicamente
  ];
}

// Componente da página que usa o slug do arquivo
import params from 'next/searchparams';

export default async function EstudoPage({ params }) {
  const study = await getStudyBySlug(params.slug);

  return (
    <article>
      <h1>{study.metadata.title}</h1>
      {/* Renderizar conteúdo */}
    </article>
  );
}
```

---

## ✅ Vantagens da Implementação

| Benefício            | Descrição                                                                 |
| -------------------- | ------------------------------------------------------------------------- |
| **Dinamismo**        | Novos estudos no content são automaticamente incluídos sem rebuild manual |
| **SSG Completo**     | Todas as páginas dos estudos geradas durante o build (rápido, cacheável)  |
| **Manutenção Fácil** | Adicionar novo `.md` = página automática disponível em minutos            |

---

## 📝 Resumo Técnico

```mermaid
graph LR
    A[Build SSG] --> B[next.config.ts detecta generateStaticParams()]
    B --> C{Chama hook}
    C --> D[markdown.ts: getSlugPaths()]
    D --> E[Lê /content/*.md via fs.readFileSync]
    E --> F[matter.parse() extrai metadados]
    F --> G[Retorna array de slugs]
    G --> H[Cria rotas dinâmicas /estudo/[slug]]
```

---

## 🎯 Conclusão

A implementação de `generateStaticParams()` completa o **DoD T2** do TASKS.md, permitindo que:

1. ✅ Todas as páginas dos estudos sejam geradas automaticamente durante o build SSG
2. ✅ Novos arquivos `.md` no content resultem em novas páginas sem intervenção manual
3. ✅ O sistema seja escalável para centenas de estudos bíblicos
