# 🏛️ CONSTITUIÇÃO DO PROJETO - *System Guardrails (SDD)*

Este documento estabelece as leis fundamentais e inegociáveis de arquitetura e código. Nenhuma spec, subagente ou rotina de geração de código está autorizada a violar estas diretrizes sob nenhuma circunstância.

## 1. Stack Tecnológica Absoluta (Fixo)

A infraestrutura base é imutável para o escopo atual.

* **Core Framework:** Next.js 16+ utilizando exclusivamente a topologia de App Router e Server Components preferencialmente.

* **Controle de Tipagem:** TypeScript em Strict Mode absoluto (flags `noImplicitAny` e `strictNullChecks` ativadas).

* **Processamento de Dados:** A biblioteca `gray-matter` (v5 ou superior) é obrigatória para executar o parsing de frontmatter em todo e qualquer arquivo `.md` ingerido pelo sistema.

## 2. Princípios de Execução e Renderização (Guardrails)

Regras para o comportamento autônomo durante a geração e estilização de interfaces.

* **Padrão Estético Exclusivo:** Siga o padrão de renderização Vanilla CSS, limitando-se aos arquivos globais e de página (ex: `globals.css`, `page.css`). O uso de CSS Modules (`.module.css`) está vetado para garantir suporte transparente ao parser do Markdown.
* **Performance Visual:** Implemente micro-animações apenas utilizando keyframes nativos do CSS. A introdução de bibliotecas de animação de terceiros ou lógicas complexas que degradem o *Main Thread* é estritamente proibida.

* **Modularidade Determinística:** Todo componente de UI criado deve possuir uma interface TypeScript estrita declarada no mesmo escopo ou importada de `lib/types.ts`, garantindo que a renderização obedeça a contratos de I/O exatos, não a heurísticas genéricas.

## 3. Limites de Escopo (Contra-Sinais de Segurança)

Gatilhos de bloqueio para impedir expansão de escopo não autorizada (*Scope Creep* / Alucinação).

* **Restrição de Frameworks CSS:** É terminantemente proibida a implementação, importação ou menção ao TailwindCSS ou qualquer outro framework/biblioteca utilitária de CSS. O projeto é inteiramente baseado em Vanilla CSS.

* **Isolamento de Domínio (Stateless):** Não adicione, simule ou crie infraestrutura para funcionalidades autênticas de login, autenticação ou persistência de dados de sessão de usuário. A aplicação opera em modo de leitura estática (SSG) e essas features só poderão existir mediante uma nova especificação explícita.

## 4. Convenções Estruturais e de Linter

Padrões de exportação e definição de tipagens que devem ser copiados verbatim na geração de código.

```typescript
// Tipagem obrigatória para todas as interfaces que acoplam metadados em UI components:
interface StudyCardProps {
  metadata: MarkdownMetadata; // OBRIGATÓRIO: Referenciar objeto originário de src/lib/types.ts[cite: 3]
  href: string;               // OBRIGATÓRIO: Formato limpo sem extensão (Ex: /estudo/slug-do-arquivo)
}

// Arquitetura de Componentes Next.js:
// Todos os componentes devem adotar o padrão ESM exportado por padrão para compatibilidade com App Router:
export default function StudyCard({ ...props }: StudyCardProps) { /* ... */ }[cite: 3]

```
