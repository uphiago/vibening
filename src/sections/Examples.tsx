import { useLang } from '../LanguageContext'
import { CopyButton } from '../components/CopyButton'

const SKILL_EXAMPLE = `---
name: git-safe
description: Utility for safe git operations
allowed-tools: Bash(git *)
argument-hint: [action]
---

## Behavior
Run git operations safely with human confirmation
for destructive commands (push --force, reset --hard).

## Steps
1. Validate action is allowed
2. Show diff or summary before executing
3. Require explicit confirmation for irreversible ops`

const CONTEXT_EXAMPLE_PT = `## Objetivo
Refatorar a função parseDate() em utils/date.ts
para tratar entradas vazias sem lançar exceção.

## Escopo
- Apenas parseDate(), sem mexer em outras funções
- Manter assinatura atual: parseDate(input: string): Date | null

## Critério de aceite
- parseDate('') retorna null
- parseDate('invalid') retorna null
- parseDate('2024-01-15') continua funcionando
- Testes existentes passam`

const CONTEXT_EXAMPLE_EN = `## Objective
Refactor parseDate() in utils/date.ts
to handle empty inputs without throwing an exception.

## Scope
- Only parseDate(), do not touch other functions
- Keep current signature: parseDate(input: string): Date | null

## Acceptance criteria
- parseDate('') returns null
- parseDate('invalid') returns null
- parseDate('2024-01-15') keeps working
- Existing tests pass`

const DYNAMIC_CTX_EXAMPLE_PT = `# Passando estado real para o agente em tempo de execução

# Git status atual como contexto
!git status --short

# Branch e último commit
!git log --oneline -5

# Arquivos com conflito
!git diff --name-only --diff-filter=U

# Usar na sessão com:
# "dado o estado atual !{comando}, faça X"`

const DYNAMIC_CTX_EXAMPLE_EN = `# Passing live state to the agent at runtime

# Current git status as context
!git status --short

# Branch and last commit
!git log --oneline -5

# Files with conflicts
!git diff --name-only --diff-filter=U

# Use in session with:
# "given the current state !{command}, do X"`

const AGENTS_MD_EXAMPLE_PT = `# CLAUDE.md — Contrato do projeto

## Identidade e escopo
Você é um assistente de engenharia para este repositório.
Foco: TypeScript/React. Nao toque em outros arquivos sem pedido explícito.

## Regras obrigatórias
- Nao commite sem confirmacao explícita
- Nao use --no-verify
- Leia o arquivo antes de editar
- Diff incremental: 1 mudanca lógica por commit

## Stack
- Node 20+, TypeScript strict, React 19, Vite
- Testes: Vitest + Testing Library
- Lint: ESLint + Prettier (run npm run check)

## Gates de qualidade
1. npm run check deve passar sem erros
2. Testes existentes devem continuar passando
3. Toda PR precisa de diff legível e aprovacao humana`

const AGENTS_MD_EXAMPLE_EN = `# CLAUDE.md — Project contract

## Identity and scope
You are an engineering assistant for this repository.
Focus: TypeScript/React. Do not touch other files without explicit request.

## Mandatory rules
- Do not commit without explicit confirmation
- Do not use --no-verify
- Read the file before editing
- Incremental diff: 1 logical change per commit

## Stack
- Node 20+, TypeScript strict, React 19, Vite
- Tests: Vitest + Testing Library
- Lint: ESLint + Prettier (run npm run check)

## Quality gates
1. npm run check must pass without errors
2. Existing tests must continue passing
3. Every PR needs a readable diff and human approval`

const PRECOMMIT_EXAMPLE_PT = `#!/bin/sh
# .claude/hooks/pre-commit — gate antes de todo commit

# 1. Lint e typecheck
npm run check
if [ $? -ne 0 ]; then
  echo "❌ Lint/typecheck falhou. Corrija antes de commitar."
  exit 1
fi

# 2. Testes unitários
npm run test -- --run
if [ $? -ne 0 ]; then
  echo "❌ Testes falharam. Corrija antes de commitar."
  exit 1
fi

echo "✓ Todos os gates passaram."`

const PRECOMMIT_EXAMPLE_EN = `#!/bin/sh
# .claude/hooks/pre-commit — gate before every commit

# 1. Lint and typecheck
npm run check
if [ $? -ne 0 ]; then
  echo "❌ Lint/typecheck failed. Fix before committing."
  exit 1
fi

# 2. Unit tests
npm run test -- --run
if [ $? -ne 0 ]; then
  echo "❌ Tests failed. Fix before committing."
  exit 1
fi

echo "✓ All gates passed."`

const SUBAGENT_EXAMPLE_PT = `# Padrão: handoff entre subagentes via arquivo
# Cada agente lê entrada e escreve saída em /tmp/

## Orquestrador
prompt: |
  Leia /tmp/task.md.
  Execute os agentes em sequência: researcher → implementer → reviewer.
  Se reviewer retornar exit 1, reenvie para implementer com /tmp/review.md.

## Agente: researcher
prompt: |
  Leia /tmp/task.md. Mapeie arquivos relevantes, APIs e restrições.
  Escreva descobertas em /tmp/research.md.
  Documente apenas o que for confirmado, não assuma.

## Agente: implementer
depends_on: researcher
prompt: |
  Leia /tmp/research.md e /tmp/task.md.
  Implemente as mudanças. Não exceda o escopo em task.md.
  Após cada arquivo alterado, adicione uma linha em /tmp/changes.md.

## Agente: reviewer
depends_on: implementer
prompt: |
  Leia /tmp/changes.md.
  Execute: npm run lint && npm run test
  Se falhar: escreva detalhes em /tmp/review.md e exit 1.
  Se passar: escreva "approved" em /tmp/review.md e exit 0.`

const SUBAGENT_EXAMPLE_EN = `# Pattern: subagent handoff via file
# Each agent reads input and writes output to /tmp/

## Orchestrator
prompt: |
  Read /tmp/task.md.
  Run agents in sequence: researcher → implementer → reviewer.
  If reviewer returns exit 1, re-send to implementer with /tmp/review.md.

## Agent: researcher
prompt: |
  Read /tmp/task.md. Map relevant files, APIs, and constraints.
  Write findings to /tmp/research.md.
  Document only what is confirmed, do not assume.

## Agent: implementer
depends_on: researcher
prompt: |
  Read /tmp/research.md and /tmp/task.md.
  Implement the changes. Do not exceed the scope in task.md.
  After each file change, append a one-line summary to /tmp/changes.md.

## Agent: reviewer
depends_on: implementer
prompt: |
  Read /tmp/changes.md.
  Run: npm run lint && npm run test
  If any check fails: write details to /tmp/review.md and exit 1.
  If all pass: write "approved" to /tmp/review.md and exit 0.`

export function Examples() {
  const { lang, t } = useLang()
  const CONTEXT_EXAMPLE = lang === 'pt-BR' ? CONTEXT_EXAMPLE_PT : CONTEXT_EXAMPLE_EN
  const DYNAMIC_CTX_EXAMPLE = lang === 'pt-BR' ? DYNAMIC_CTX_EXAMPLE_PT : DYNAMIC_CTX_EXAMPLE_EN
  const AGENTS_MD_EXAMPLE = lang === 'pt-BR' ? AGENTS_MD_EXAMPLE_PT : AGENTS_MD_EXAMPLE_EN
  const PRECOMMIT_EXAMPLE = lang === 'pt-BR' ? PRECOMMIT_EXAMPLE_PT : PRECOMMIT_EXAMPLE_EN
  const SUBAGENT_EXAMPLE = lang === 'pt-BR' ? SUBAGENT_EXAMPLE_PT : SUBAGENT_EXAMPLE_EN

  return (
    <section id="examples" className="reveal">
      <p className="section-label">{t.examples.sectionLabel}</p>
      <h2 className="section-title">{t.examples.title}</h2>
      <p className="section-description">{t.examples.description}</p>
      <div className="examples-grid">
        <article className="glass-card example-card">
          <h3>{t.examples.ex1Title}</h3>
          <div className="code-block-wrap">
            <CopyButton text={SKILL_EXAMPLE} />
            <pre><code>{SKILL_EXAMPLE}</code></pre>
          </div>
        </article>
        <article className="glass-card example-card">
          <h3>{t.examples.ex2Title}</h3>
          <div className="code-block-wrap">
            <CopyButton text={CONTEXT_EXAMPLE} />
            <pre><code>{CONTEXT_EXAMPLE}</code></pre>
          </div>
        </article>
        <article className="glass-card example-card">
          <h3>{t.examples.ex3Title}</h3>
          <div className="code-block-wrap">
            <CopyButton text={DYNAMIC_CTX_EXAMPLE} />
            <pre><code>{DYNAMIC_CTX_EXAMPLE}</code></pre>
          </div>
        </article>
        <article className="glass-card example-card">
          <h3>{t.examples.ex4Title}</h3>
          <ul>
            {t.examples.ex4Items.map((item) => <li key={item}>{item}</li>)}
          </ul>
        </article>
        <article className="glass-card example-card">
          <h3>{t.examples.ex5Title}</h3>
          <div className="code-block-wrap">
            <CopyButton text={AGENTS_MD_EXAMPLE} />
            <pre><code>{AGENTS_MD_EXAMPLE}</code></pre>
          </div>
        </article>
        <article className="glass-card example-card">
          <h3>{t.examples.ex6Title}</h3>
          <div className="code-block-wrap">
            <CopyButton text={PRECOMMIT_EXAMPLE} />
            <pre><code>{PRECOMMIT_EXAMPLE}</code></pre>
          </div>
        </article>
        <article className="glass-card example-card">
          <h3>{t.examples.ex7Title}</h3>
          <div className="code-block-wrap">
            <CopyButton text={SUBAGENT_EXAMPLE} />
            <pre><code>{SUBAGENT_EXAMPLE}</code></pre>
          </div>
        </article>
      </div>
    </section>
  )
}
