
# 🎯 ESPECIFICAÇÃO DO PROBLEMA (Spec-Driven Development) - *Obrigatório*

## Problema a ser Resolvido

> Web app atual não oferece interface moderna para consumo de estudos bíblicos em markdown. O usuário precisa de uma biblioteca visual e busca eficiente por conteúdos teológicos sem perder o contexto bibliográfico original.

## Objetivos (KPIs)

- [ ] 100% dos .md files renderizados corretamente com frontmatter parsing automático

- [ ] Tempo de carregamento < 2 segundos (Core Web Vitals otimizado)

- [ ] Meta tags OpenGraph para SEO em todas as páginas individuais

## Critérios de Aceitação

| ID  | Cenário                                     | Expectativa                                                          |
| --- | ------------------------------------------- | -------------------------------------------------------------------- |
| AC1 | Usuário acessa `/`                          | Grid responsivo com cards glassmorphism e hover effects              |
| AC2 | Clique no card `amor-em-palavras/estudo.md` | Roteamento correto para `/estudo/amor-em-palavras/page.tsx` sem 404s |

## Fora de Escopo (O que NÃO será feito)

- Backend API ou autenticação do usuário
- Modo claro/dark mode alternável via toggle UI

---

## 📐 PLANO TÉCNICO - *Como Realizar o Projeto*

### Escolhas Arquiteturais (Justificadas pela Spec)

| Decisão                        | Racional Técnico                                                                      | Impacto na Especificação AC1-AC2                                                         |
| ------------------------------ | ------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- |
| **App Router vs Pages Router** | Next.js 16+ favorece App Router para performance e SEO dinâmico (SSG prerenderização) | Garante que cada `/estudo/[slug]/` seja renderizado no client sem reflows desnecessários |

### Estrutura de Pastas Proposta (*Verificar contra seu arquivo src/)

```bash

src/
├── app/                    # Next.js App Router (não mais `pages`)
│   ├── layout.tsx          # Root + Metadata global (`en` ou `pt-BR`?)
│   └── estudo/[slug]/      # Desejo de routing dinâmico com generateStaticParams
├── lib/                    # Lógica de domínio (não UI)
│   ├── markdown.ts         # Leitura e parsing (.md files) - Controllador
│   └── types.ts            # Interfaces TypeScript - Contratos entre módulos

# ... não adicione componentes diretamente no app/, mas sim na pasta components separada se for projeto grande!
```
