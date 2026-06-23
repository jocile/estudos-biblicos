# 📋 TAREFAS DE IMPLEMENTAÇÃO - *Especificação para Subagentes (SDD)*

## 📦 FASE 1: Controller de Leitura (P0)

**Contexto de Execução:** Desenvolvimento de lógicas de leitura de sistema de arquivos e parsing estruturado para geração estática (SSG).

---

### 🛠️ TASK-001 | Estabelecer Contratos de Tipagem (Frontmatter)

**Meta:** Definir as interfaces base em TypeScript para garantir a segurança de tipos entre o Controller de I/O e a camada de UI.
**Target File:** `src/lib/types.ts`
**Status de Execução:** Paralelizável (Independente)
**Dependências Blockers:** Nenhuma

#### 📄 Especificação Técnica (Spec) T1

O subagente deve exportar as seguintes interfaces garantindo a integridade dos dados transitados:

1. **`MarkdownMetadata`**: Deve refletir a estrutura exata do YAML frontmatter. Atente-se à propriedade `tags`, que deverá sempre ser resolvida como `Array<string>`.

2. **`StudyCardProps`**: Deve estender `MarkdownMetadata` e incorporar propriedades de roteamento (ex: `LinkInterface`), garantindo que o card seja renderizado com um link de estudo funcional.

#### ✅ Definition of Done (DoD) T1

* **Validação Estática:** A execução de `npm run lint` não deve retornar nenhum *warning* nos arquivos modificados.

* **Validação de I/O:** Na rota manual `/estudo/amor-em-palavras/`, o frontmatter deve estar carregado e a propriedade `tags` deve ser verificavelmente instanciada como um `Array`.

---

### 🛠️ TASK-002 | Implementar Motor de Parsing de Markdown

**Meta:** Construir o controlador responsável pela extração do conteúdo físico e separação do frontmatter e corpo do texto.
**Target File:** `src/lib/markdown.ts`
**Target Data:** Arquivos `.md` alocados no diretório estático `/content/`.
**Dependências Blockers:** TASK-001 (Tipagens precisam estar disponíveis no escopo).

#### 📄 Especificação Técnica (Spec) T2

O subagente deve criar funções de leitura que sigam estritamente o seguinte fluxo:

1. **I/O de Arquivo:** Utilizar o módulo nativo `fs` (ex: `readFileSync`) acoplado com a lib `path` para resolver e ler a string UTF-8 dos arquivos `.md`.

2. **Parsing de Metadados:** Invocar a biblioteca `gray-matter` (`matter.parse`) sobre o conteúdo lido.

3. **Tratamento de Anomalias:** Garantir que o retorno passe pelo contrato `MarkdownMetadata` da TASK-001, realizando o *type casting* ou higienização de strings para arrays caso necessário.

#### ✅ Definition of Done (DoD) T2

* **Validação de Build:** A execução de `npm run build` deve compilar com sucesso absoluto, sem emitir erros de leitura de matrizes (*array maps*) ou exceções de parsing inválido nas tags.

* **Validação de SSG:** A rotina de compilação estática (`generateStaticParams`) deve capturar e gerar corretamente todos os *slugs* correspondentes aos arquivos existentes no diretório `/content/`.
