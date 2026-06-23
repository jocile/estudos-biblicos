# PLAN.md - Software Design Document (SDD)

> **Projeto:** Web App de Estudos Bíblicos
> **Data de Atualização:** 12 de abril de 2026
> **Estágio:** Implementação (Fase 5 em andamento)

## 1. Introdução

### 1.1 Propósito

Este documento define a arquitetura, as estruturas de dados e o plano de implementação do Web App de Estudos Bíblicos. O objetivo primário do sistema é ler, processar e exibir conteúdos escritos em formato Markdown estático, oferecendo uma experiência de leitura premium, rápida e focada no usuário.

### 1.2 Escopo

A aplicação é construída utilizando **Next.js 16+** sob o paradigma de *Static Site Generation (SSG)*. O sistema dispensa bancos de dados tradicionais, operando inteiramente via leitura de arquivos locais (`.md`). A camada visual utiliza **Vanilla CSS**, garantindo customização extrema sem a dependência de frameworks utilitários como TailwindCSS.

---

## 2. Arquitetura do Sistema

### 2.1 Visão Geral de Diretórios e Fluxo

A arquitetura baseia-se no *App Router* do Next.js, separando estritamente lógicas de roteamento, componentes de UI e processamento de conteúdo.

```bash
src/
├── app/                    # Camada de Roteamento (App Router)
│   ├── layout.tsx          # Configurações globais (Metadata, Lang)
│   ├── page.tsx            # Ponto de entrada (Grid de Biblioteca)
│   ├── globals.css         # Design System base e tokens de estilo
│   ├── page.css            # Estilos específicos da home
│   ├── estudo/
│   │   └── [slug]/         # Roteamento dinâmico (SSG via generateStaticParams)
│   └── components/         # Camada de Apresentação (UI)
├── lib/                    # Camada de Domínio / Regras de Negócio
│   ├── markdown.ts         # Controller do sistema de arquivos
│   └── types.ts            # Contratos de tipagem estática
└── content/                # Persistência de Dados (Arquivos Markdown)

```

### 2.2 Decisões Arquiteturais

| Decisão Técnica                  | Racional Arquitetural                                                                                                                                          |
| -------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **SSG (Static Site Generation)** | Maximiza o desempenho e SEO. Como os estudos bíblicos não mudam em tempo real, as páginas são construídas em tempo de build.                                   |
| **Vanilla CSS Global**           | Arquivos como `page.css` substituem `.module.css` para permitir a injeção fácil de estilos em classes aninhadas geradas dinamicamente pelo parser do Markdown. |
| **gray-matter**                  | Biblioteca robusta escolhida para separar de forma segura e consistente o frontmatter (metadados) do corpo do texto (conteúdo).                                |
| **remark-gfm**                   | Plugin utilizado para suportar sintaxe estendida de Markdown (tabelas, listas de tarefas, auto-links).                                                         |

---

## 3. Design de Dados

### 3.1 Estrutura de Metadados (Frontmatter)

Os arquivos Markdown atuam como o banco de dados da aplicação. Cada arquivo em `/content/` deve seguir o contrato estrutural YAML abaixo:

```yaml
---
title: "Título do Estudo"
date: "YYYY-MM-DD"
description: "Resumo em uma frase para SEO e visualização prévia"
category: "Nome da Categoria (Ex: Teologia)"
tags: ["tag1", "tag2"]
image: "/caminho/para/imagem.jpg"
author: "Nome do Autor"
---

```

### 3.2 Modelagem de Tipos (TypeScript)

Os contratos de dados asseguram que a aplicação preveja e trate a ausência de propriedades opcionais.

```typescript
// src/lib/types.ts
export interface MarkdownMetadata {
  title: string;
  date: string;
  description: string;
  category?: string;
  tags?: string[];
  image?: string;
  author?: string;
}

export interface MarkdownContent {
  metadata: MarkdownMetadata;
  content: string;
}

```

---

## 4. Design de Componentes e Lógica

### 4.1 Camada de Controle (`markdown.ts`)

Responsável pelo I/O de arquivos. O fluxo consiste em:

1. Ler o diretório `/content/`.
2. Extrair e processar os metadados brutos através do `gray-matter`.
3. **Tratamento de Dados:** Interceptar o campo `tags` e convertê-lo explicitamente para `Array<string>` caso seja fornecido como string simples separada por vírgulas.
4. Retornar os objetos para o SSG gerar os paths.

### 4.2 Camada de Apresentação

* **`MarkdownRenderer.tsx`:** Encapsula o componente `react-markdown`. Responsável por aplicar classes globais de tipografia ao texto puro e garantir renderização segura.
* **`StudyCard.tsx`:** Componente modular de cartão. Recebe um objeto `MarkdownMetadata` e exibe título, tags, categoria e a capa com efeito *glassmorphism*.
* **`CategoryFilter.tsx` e `TagFilter.tsx` (Em desenvolvimento):** Componentes de interface interativos para indexação visual do conteúdo.

---

## 5. Design de Interface (UI/UX)

A identidade visual fundamenta-se no modo escuro (*Dark Mode*), utilizando propriedades customizadas de CSS (Variáveis) em `globals.css` para centralizar a paleta de cores.

* **Paleta Base:** Tons escuros de fundo (`#0f0f13`, `#1a1a24`).
* **Acentos:** Neon-roxo (`#7c3aed`) e rosa-magenta (`#ec4899`) para botões e links de navegação.
* **Glassmorphism:** Os containers principais adotam fundo translúcido (`rgba(255, 255, 255, 0.05)`), bordas suaves (`rgba(255, 255, 255, 0.1)`) e `backdrop-filter: blur(10px)`.

---

## 6. Marcos do Projeto (Milestones)

### 6.1 Concluído (Fases 1 a 4)

* **Lógica Principal:** Sistema de parsing, renderização avançada (`remark-gfm`), roteamento SSG e higienização de dados funcionais.
* **Interface Base:** Layout consolidado, responsividade com CSS Grid implementada e tratamento 404 (Not Found) finalizado. Metadados dinâmicos garantindo SEO base.

### 6.2 Em Andamento e Backlog (Fases 5 e 6)

* **Interatividade (Fase 5):**
* *Status:* `StudyCard` e `MarkdownRenderer` concluídos.
* *Foco Atual:* Finalizar a lógica e interface de agrupamento nos componentes `CategoryFilter` e `TagFilter`.

* **SEO Avançado e Performance (Fase 6):**
* *Pendente:* Atributos OpenGraph para compartilhamento social.
* *Pendente:* Estruturação de `Schema.org` para artigos.
* *Pendente:* Geração automatizada de `sitemap.xml`.
* *Pendente:* Garantir *Lazy Loading* seguro na renderização de imagens do Markdown.
