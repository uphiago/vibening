import { useEffect, useMemo, useRef, useState } from 'react'
import { Background, Controls, MiniMap, ReactFlow } from '@xyflow/react'
import type { Edge, Node } from '@xyflow/react'
import '@xyflow/react/dist/style.css'
import './App.css'

/* ─── Types ─────────────────────────────────────────────── */

type Layer = {
  id: string
  label: string
  summary: string
  chips: string[]
  facts: string[]
}

type FlowStep = {
  id: string
  label: string
  summary: string
  detail: string
  payload: string
}

type QualityRow = {
  gate: string
  rule: string
  verify: string
}

type Principle = {
  id: string
  title: string
  subtitle: string
  icon: string
  signal: string
}

type MethodCard = {
  id: string
  title: string
  summary: string
  bullets: string[]
}

type DeepDive = {
  id: string
  title: string
  description: string
  artifacts: string[]
  links: { label: string; href: string }[]
}

type ProgressiveLayer = {
  id: string
  name: string
  objective: string
  loadWhen: string
  includes: string[]
  tokens: string
}

type WorkflowPhase = {
  id: string
  step: string
  title: string
  objective: string
  checks: string[]
  antiPattern: string
}

type Comparison = {
  aspect: string
  vibecoding: string
  aiAssisted: string
  risk: 'high' | 'medium' | 'ok'
}

type AntiPattern = {
  id: string
  category: string
  problem: string
  consequence: string
  fix: string
  severity: 'critical' | 'high' | 'medium'
}

type ContextSignal = {
  signal: string
  meaning: string
  action: string
  type: 'error' | 'warning'
}

type Lesson = {
  id: string
  number: string
  date: string
  title: string
  objective: string
  topics: string[]
  outcomes: string[]
  tag: string
}

type StackTool = {
  name: string
  type: string
  why: string
  priority: 'A' | 'B' | 'C'
}

/* ─── Data ───────────────────────────────────────────────── */

const LESSONS: Lesson[] = [
  {
    id: 'part1',
    number: '01',
    date: '',
    tag: 'Fundamentos',
    title: 'Context Engineering e RPEV na prática',
    objective: 'Estrutura mínima de contexto, progressive disclosure e o fluxo RPEV aplicados em exemplos reais.',
    topics: [
      'Vibecoding vs desenvolvimento assistido por IA',
      'Contexto mínimo viável para iniciar uma tarefa',
      'Progressive Disclosure: carregamento em camadas',
      'RPEV (Research → Plan → Execute → Verify)',
      'Stack agêntico na prática: MCP + Skills + AGENTS.md',
      'Comparação rápida de stacks (Claude / Cursor)',
      'Sinais de contexto insuficiente e gatilhos de replanning',
    ],
    outcomes: [
      'Estruturar um prompt com objetivo, escopo e critério de aceite',
      'Entender o papel de cada camada do stack agêntico',
      'Aplicar RPEV em uma tarefa real com validação',
    ],
  },
  {
    id: 'part2',
    number: '02',
    date: '',
    tag: 'Aplicação',
    title: 'Refatoração segura e Code Review em AI Coding',
    objective: 'Checklist de revisão de código gerado por IA, SDD simplificado e ciclo contínuo de qualidade.',
    topics: [
      'Checklist de code review para saída de IA',
      'Refatoração assistida com validação incremental',
      'Quality loop: validate → fix → repeat',
      'Segurança operacional: aprovação humana para ações críticas',
      'Geração e revisão de testes com IA',
      'Documentação e registro de decisões técnicas',
    ],
    outcomes: [
      'Revisar e aprovar código gerado por IA com critério técnico',
      'Usar SDD para organizar especificações antes de executar',
      'Manter ciclo de qualidade em qualquer entrega assistida por IA',
    ],
  },
]

const COMPARISONS: Comparison[] = [
  {
    aspect: 'Velocidade inicial',
    vibecoding: 'Altíssima: gera e aceita na hora',
    aiAssisted: 'Deliberada: contexto + critério antes de executar',
    risk: 'ok',
  },
  {
    aspect: 'Controle de qualidade',
    vibecoding: 'Mínimo: confia no output direto',
    aiAssisted: 'Explícito: revisar, validar, aprovar antes de merge',
    risk: 'high',
  },
  {
    aspect: 'Contexto fornecido',
    vibecoding: 'Casual: prompt parcial, sem critério',
    aiAssisted: 'Estruturado: objetivo + escopo + validação definidos',
    risk: 'high',
  },
  {
    aspect: 'Modo de execução',
    vibecoding: 'Aceita primeiro output, sem loop de verificação',
    aiAssisted: 'Ciclo RPEV: incrementos curtos com verificação contínua',
    risk: 'high',
  },
  {
    aspect: 'Taxa de retrabalho',
    vibecoding: 'Alta: problemas aparecem tarde, custo cresce',
    aiAssisted: 'Baixa: gates precoces eliminam regressão no início',
    risk: 'high',
  },
  {
    aspect: 'Rastreabilidade',
    vibecoding: 'Baixa: decisões implícitas, diff difícil de revisar',
    aiAssisted: 'Alta: diff incremental, intenção registrada',
    risk: 'medium',
  },
  {
    aspect: 'Quando usar',
    vibecoding: 'Protótipos, exploração, prova de conceito isolada',
    aiAssisted: 'Produção, base de código compartilhada, entrega real',
    risk: 'ok',
  },
]

const CONTEXT_SIGNALS: ContextSignal[] = [
  {
    signal: 'Resposta degrada a cada follow-up',
    meaning: 'Contexto está poluído com ruído acumulado',
    action: 'Iniciar nova sessão com contexto limpo e específico',
    type: 'error',
  },
  {
    signal: 'IA implementa fora do escopo combinado',
    meaning: 'Objetivo ou limites não estavam claros no prompt',
    action: 'Reformular com escopo explícito: "apenas X, não Y"',
    type: 'error',
  },
  {
    signal: 'Resposta genérica sem ancoragem no projeto',
    meaning: 'Contexto de projeto insuficiente ou ausente',
    action: 'Incluir regras do projeto, CLAUDE.md ou snippet relevante',
    type: 'warning',
  },
  {
    signal: 'Prompt ultrapassa ~10k tokens',
    meaning: 'Volume alto; efeito "Lost in the Middle" possível',
    action: 'Reduzir escopo, aplicar Progressive Disclosure',
    type: 'warning',
  },
  {
    signal: 'IA confirma mas não executa corretamente',
    meaning: 'Instrução ambígua ou critério de aceite ausente',
    action: 'Definir critério de aceite antes de pedir execução',
    type: 'warning',
  },
  {
    signal: 'Tempo de resposta alto + domain error',
    meaning: 'Carga inicial pesada demais para o contexto',
    action: 'Aplicar camada de Discovery antes de carregar tudo',
    type: 'warning',
  },
]

const ANTI_PATTERNS: AntiPattern[] = [
  {
    id: 'ap1',
    category: 'Planejamento',
    problem: 'Começar direto no código sem contrato técnico',
    consequence: 'Implementação diverge do objetivo real; retrabalho alto no final.',
    fix: 'Declarar escopo, critérios de aceite e riscos antes de qualquer execução.',
    severity: 'critical',
  },
  {
    id: 'ap2',
    category: 'Revisão',
    problem: 'Commitar output de IA sem revisão humana',
    consequence: 'Bugs sutis, violações de segurança e regressões entram no histórico.',
    fix: 'Ler o diff completo antes de todo commit. IA gera hipóteses, não entregas.',
    severity: 'critical',
  },
  {
    id: 'ap3',
    category: 'Pull Request',
    problem: 'PR gigante sem gate incremental',
    consequence: 'Revisão superficial, conflitos de merge e bugs difíceis de isolar.',
    fix: 'PRs pequenas, com diff legível e aprovação explícita em cada entrega.',
    severity: 'high',
  },
  {
    id: 'ap4',
    category: 'Contexto',
    problem: 'Continuar sessão com contexto poluído',
    consequence: 'Qualidade degrada progressivamente: IA erra domínio e repete erros.',
    fix: 'Resetar contexto ao detectar degradação. Novo chat com contexto limpo.',
    severity: 'high',
  },
  {
    id: 'ap5',
    category: 'Validação',
    problem: 'Confiar em único reviewer automático',
    consequence: 'Falso senso de segurança; gaps ficam ocultos até produção.',
    fix: 'CI verde + revisão técnica humana = condição mínima de conclusão.',
    severity: 'high',
  },
  {
    id: 'ap6',
    category: 'Autonomia',
    problem: 'Delegar ação irreversível sem gate de confirmação',
    consequence: 'Dados apagados, deploys não planejados, dano difícil de reverter.',
    fix: 'Toda ação crítica (push, rm, migrations) exige confirmação humana explícita.',
    severity: 'critical',
  },
]

const PRINCIPLES: Principle[] = [
  {
    id: 'clarity',
    title: 'Clareza operacional',
    subtitle: 'Estado, risco e próxima ação devem ser evidentes em segundos, sem explicação externa.',
    icon: '◉',
    signal: 'Signal-first',
  },
  {
    id: 'progressive',
    title: 'Progressive Disclosure',
    subtitle: 'Carregar índice primeiro. Detalhe só quando necessário. Contexto tem custo.',
    icon: '◈',
    signal: 'Context discipline',
  },
  {
    id: 'verify',
    title: 'RPEV + Validate loop',
    subtitle: 'Output de IA sem verificação contínua é hipótese, não entrega. Gate sempre ativo.',
    icon: '◍',
    signal: 'Execution discipline',
  },
]

const PD_LAYERS: ProgressiveLayer[] = [
  {
    id: 'pd1',
    name: 'Layer 1: Discovery',
    objective: 'Decisão rápida de relevância com custo mínimo de contexto.',
    loadWhen: 'Sempre no início da tarefa.',
    includes: ['Nome da skill / recurso', 'Descrição em uma linha', 'Metadata: tipo, custo, risco'],
    tokens: '~100 tokens',
  },
  {
    id: 'pd2',
    name: 'Layer 2: Activation',
    objective: 'Instrução completa apenas para o item selecionado.',
    loadWhen: 'Somente quando o agente escolhe uma skill / recurso.',
    includes: ['Regras de execução', 'Parâmetros esperados', 'Ferramentas permitidas'],
    tokens: '~2k–5k tokens',
  },
  {
    id: 'pd3',
    name: 'Layer 3: Execution',
    objective: 'Material pesado sob demanda, sem contaminar contexto principal.',
    loadWhen: 'Somente quando execução exigir.',
    includes: ['Scripts', 'Exemplos', 'Docs longas', 'Casos de borda'],
    tokens: 'Zero até ativado',
  },
]

const LAYERS: Layer[] = [
  {
    id: 'user',
    label: 'User Intent',
    summary: 'Objetivo, restrições e critério de aceite.',
    chips: ['escopo', 'aceite'],
    facts: [
      'Sem objetivo explícito, o agente otimiza para velocidade, não para qualidade.',
      'Critério de aceite antes de codar reduz retrabalho em cascata.',
      'Contexto mínimo viável é a baseline de confiabilidade da resposta.',
    ],
  },
  {
    id: 'project-context',
    label: 'Project Rules',
    summary: 'Contrato local em AGENTS.md / CLAUDE.md + rules.',
    chips: ['governança', 'padrões'],
    facts: [
      'Contrato de projeto evita divergência de arquitetura e estilo entre sessões.',
      'Regras curtas e objetivas têm maior aderência do agente que docs longas.',
      'Sem contrato, cada sessão reinventa decisões críticas de forma inconsistente.',
    ],
  },
  {
    id: 'skills',
    label: 'Skills',
    summary: 'Know-how reutilizável e auditável: SKILL.md + scripts/ + references/.',
    chips: ['workflow', 'reuso'],
    facts: [
      'Skill robusta define entrada, limites operacionais e saída esperada com clareza.',
      'scripts/ concentra execução determinística; references/ carrega contexto sob demanda.',
      '$ARGUMENTS e $ARGUMENTS[N] permitem parametrização dinâmica da skill.',
    ],
  },
  {
    id: 'mcp',
    label: 'MCP',
    summary: 'Acesso a dados e ferramentas externas com rastreabilidade.',
    chips: ['integração', 'acesso'],
    facts: [
      'MCP separa "como fazer" (skill) de "onde agir" (acesso a dado ou tool).',
      'Conexões externas exigem autenticação explícita e permission gate definido.',
      'Sem MCP, o agente é um gerador local; com MCP, é um operador com acesso real.',
    ],
  },
  {
    id: 'verification',
    label: 'Verification',
    summary: 'Gate de validação antes de considerar qualquer entrega como pronta.',
    chips: ['check', 'review'],
    facts: [
      'Loop mínimo: validate → fix → repeat. Nunca skip em código crítico.',
      'Ações destrutivas (push, delete, migration) exigem confirmação humana explícita.',
      'CI verde + revisão técnica humana = condição necessária de conclusão.',
    ],
  },
]

const FLOW: FlowStep[] = [
  {
    id: 'research',
    label: 'Research',
    summary: 'Mapeia estado, arquivos críticos e risco.',
    detail:
      'Identificar contexto útil, restrições reais e dependências antes de qualquer alteração. Registrar o que está faltando para execução segura.',
    payload: 'input: objetivo + limites + estado atual do projeto',
  },
  {
    id: 'plan',
    label: 'Plan',
    summary: 'Quebra em passos verificáveis com critério de aceite.',
    detail:
      'Definir etapas pequenas, cada uma com critério de aceite claro e fallback definido. Plano é contrato técnico, não lista de desejos.',
    payload: 'output: plano técnico + critérios por etapa',
  },
  {
    id: 'execute',
    label: 'Execute',
    summary: 'Implementa em incrementos curtos e rastreáveis.',
    detail:
      'Alterações rastreáveis para minimizar custo de correção. Revisar cada bloco antes de avançar. Sem commits em massa sem revisão.',
    payload: 'output: diff incremental + rastreabilidade',
  },
  {
    id: 'verify',
    label: 'Verify',
    summary: 'Valida comportamento, qualidade e critérios.',
    detail:
      'Executar lint, typecheck, build, testes e revisão orientada a risco. Sem evidência de aprovação, ciclo reinicia.',
    payload: 'gate: evidence-based approval | CI + human review',
  },
]

const METHODS: MethodCard[] = [
  {
    id: 'context-minimo',
    title: 'Contexto mínimo viável',
    summary: 'Definir problema, escopo e validação antes da execução.',
    bullets: [
      'Objetivo explícito em uma frase, não uma conversa.',
      'Critério de aceite: o que define "pronto" antes de começar.',
      'Escopo delimitado: o que está dentro e o que está fora.',
    ],
  },
  {
    id: 'progressive-disclosure',
    title: 'Progressive Disclosure',
    summary: 'Carregamento por camadas sem poluir janela de contexto.',
    bullets: [
      'Discovery: índice leve com metadata (~100 tokens).',
      'Activation: instrução completa apenas para o item escolhido.',
      'Execution: deep dive apenas quando a tarefa exigir.',
    ],
  },
  {
    id: 'sdd-rpev',
    title: 'SDD + RPEV',
    summary: 'Spec curta e execução disciplinada em ciclo fechado.',
    bullets: [
      'Plan como contrato técnico, não guia vago.',
      'Execução em passos pequenos com diff revisável.',
      'Verify contínuo: validate → fix → repeat.',
    ],
  },
  {
    id: 'review-loop',
    title: 'CI + AI Review Loop',
    summary: 'Pipeline de qualidade: CI, revisão e correção iterativa.',
    bullets: [
      'PR pequena e auditável: facilita revisão real.',
      'Feedback conflitante exige validação multi-fonte.',
      'Merge só após gate de aprovação explicitamente atendido.',
    ],
  },
]

const QUALITY_ROWS: QualityRow[] = [
  {
    gate: 'Primary intent',
    rule: 'Objetivo principal deve ser identificado em segundos.',
    verify: 'Usuário identifica estado e próxima ação sem explicação externa.',
  },
  {
    gate: 'Progressive context',
    rule: 'Detalhes avançados só aparecem quando necessários.',
    verify: 'Contexto inicial curto, com expansão controlada sob demanda.',
  },
  {
    gate: 'Execution safety',
    rule: 'Ações críticas exigem confirmação humana explícita.',
    verify: 'Fluxo com gate antes de qualquer ação irreversível.',
  },
  {
    gate: 'Validation loop',
    rule: 'Nenhuma entrega sem evidence-based verify.',
    verify: 'CI verde + revisão técnica humana registrada.',
  },
]

const REVIEW_CHECKLIST = [
  { item: 'Código atende o objetivo funcional definido?', category: 'Funcional' },
  { item: 'Escopo combinado foi respeitado sem desvio?', category: 'Escopo' },
  { item: 'Há risco de regressão comportamental?', category: 'Risco' },
  { item: 'Nomes, estruturas e padrões são consistentes com o projeto?', category: 'Qualidade' },
  { item: 'Há código morto, duplicação ou geração desnecessária?', category: 'Qualidade' },
  { item: 'Segurança e privacidade foram preservadas?', category: 'Segurança' },
  { item: 'Testes mínimos foram adicionados ou atualizados?', category: 'Testes' },
  { item: 'A decisão técnica foi documentada?', category: 'Documentação' },
  { item: 'O diff é claro para outro revisor entender sem contexto externo?', category: 'Revisão' },
  { item: 'Existe plano de rollback se algo falhar?', category: 'Segurança' },
]

const DEEP_DIVES: DeepDive[] = [
  {
    id: 'dd1',
    title: 'Skill Architecture',
    description:
      'SKILL.md define comportamento e frontmatter de controle; scripts/ garante determinismo para lógica pesada; references/ amplia contexto sem inflar o prompt principal.',
    artifacts: ['SKILL.md', 'scripts/', 'references/', '$ARGUMENTS', '$ARGUMENTS[N]'],
    links: [
      { label: 'Agent Skills Standard', href: 'https://agentskills.io' },
      { label: 'anthropics/skills', href: 'https://github.com/anthropics/skills' },
    ],
  },
  {
    id: 'dd2',
    title: 'MCP Integration',
    description:
      'MCP conecta o agente ao mundo externo com controle de acesso, autenticação e rastreabilidade. Transforma o agente de gerador local em operador com acesso real a dados e ferramentas.',
    artifacts: ['MCP servers', 'auth layer', 'permission gates', 'tool logs'],
    links: [
      { label: 'MCP Intro', href: 'https://modelcontextprotocol.io/docs/getting-started/intro' },
      { label: 'Cursor MCP Docs', href: 'https://cursor.com/docs/mcp' },
    ],
  },
  {
    id: 'dd3',
    title: 'Validation Pipeline',
    description:
      'Pipeline robusto de qualidade: tests + lint + typecheck + CI + review + fix loop. Nenhuma entrega é final sem evidência explícita de aprovação em todos os gates.',
    artifacts: ['CI green', 'AI review', 'human approval', 'merge gate'],
    links: [
      { label: 'Building Effective Agents', href: 'https://www.anthropic.com/engineering/building-effective-agents' },
      { label: 'Prompt Engineering', href: 'https://platform.openai.com/docs/guides/prompt-engineering' },
    ],
  },
  {
    id: 'dd4',
    title: '.claude/ Directory Anatomy',
    description:
      'A pasta .claude/ é o contrato operacional entre agente e projeto. Clareza e modularidade são inversamente proporcionais a retrabalho e risco.',
    artifacts: ['CLAUDE.md', 'settings.json', 'rules/', 'skills/', 'agents/', 'hooks/'],
    links: [
      { label: 'Claude Code Docs', href: 'https://docs.anthropic.com/claude-code' },
      { label: 'Context7 MCP', href: 'https://context7.com' },
    ],
  },
]

const WORKFLOW_PHASES: WorkflowPhase[] = [
  {
    id: 'wf-plan',
    step: '0',
    title: 'Planning First',
    objective: 'Declarar escopo, critérios de aceite e riscos antes de codar.',
    checks: ['Plano explícito com etapas', 'Critérios de aceite definidos', 'Escopo delimitado (in/out)'],
    antiPattern: 'Começar direto no código sem contrato técnico.',
  },
  {
    id: 'wf-setup',
    step: '1',
    title: 'Isolamento de trabalho',
    objective: 'Criar branch/worktree para evitar impacto em baseline.',
    checks: ['1 feature = 1 branch', 'Nomenclatura descritiva', 'Ambiente limpo'],
    antiPattern: 'Implementar em contexto compartilhado sem isolamento.',
  },
  {
    id: 'wf-exec',
    step: '2',
    title: 'Implementação assistida',
    objective: 'Codar com IA em blocos pequenos, revisando antes de commit.',
    checks: ['Diff incremental', 'Leitura crítica do output', 'Rastreabilidade mantida'],
    antiPattern: 'Commitar saída de IA sem revisão humana.',
  },
  {
    id: 'wf-validate',
    step: '3-4',
    title: 'Validação local + pre-flight',
    objective: 'Executar testes, lint e revisão inicial antes de abrir PR.',
    checks: ['Testes locais passando', 'Lint/format sem erro', 'Pre-flight review feito'],
    antiPattern: 'Empurrar PR com falhas básicas não verificadas.',
  },
  {
    id: 'wf-loop',
    step: '5-7',
    title: 'CI + review loop',
    objective: 'Iterar CI/review/fix até aprovação real com evidência.',
    checks: ['CI verde', 'Feedback incorporado', 'Aprovação explícita registrada'],
    antiPattern: 'Ignorar feedback ou encerrar loop sem evidência de aprovação.',
  },
  {
    id: 'wf-release',
    step: '8-10',
    title: 'Verification gate + release',
    objective: 'Separar "concluído" de "publicado" com gate final explícito.',
    checks: ['Gate de verificação atendido', 'Rollback definido', 'Release controlado'],
    antiPattern: 'Merge/release automático sem checagem final.',
  },
]

const STACK_TOOLS: StackTool[] = [
  { name: 'anthropics/skills', type: 'Skills', why: 'Repositório oficial de skills prontas para Claude Code', priority: 'A' },
  { name: 'Context7', type: 'MCP', why: 'Docs de libs em tempo real no contexto do agente', priority: 'A' },
  { name: 'Tavily', type: 'MCP', why: 'Search contextual para research em tempo de execução', priority: 'A' },
  { name: 'vercel-labs/skills', type: 'Skills', why: 'Skills complementares mantidas por time de produto', priority: 'A' },
  { name: 'github/spec-kit', type: 'Spec', why: 'Spec-driven development com integração direta ao agente', priority: 'B' },
  { name: 'promptfoo/promptfoo', type: 'Eval', why: 'Avaliação e segurança em fluxos de IA: testes de saída', priority: 'B' },
  { name: 'pydantic/pydantic-ai', type: 'Framework', why: 'Tipagem e confiabilidade em agentes Python', priority: 'B' },
  { name: 'n8n-io/n8n', type: 'Integração', why: 'Automação e integração de workflows com suporte a agentes', priority: 'B' },
  { name: 'Stacks massivas sem critério', type: 'Risco', why: 'Volume sem validação aumenta risco e manutenção', priority: 'C' },
  { name: 'Infra avançada sem necessidade', type: 'Risco', why: 'RAG/agent mesh exige pré-requisito avançado', priority: 'C' },
  { name: 'Automação stealth (evasão)', type: 'Risco', why: 'Fora do escopo: sem auditabilidade ou segurança', priority: 'C' },
]

const XY_NODES: Node[] = [
  { id: 'rules', position: { x: 40, y: 40 }, data: { label: 'Rules\n(AGENTS/CLAUDE)' }, type: 'input' },
  { id: 'skills', position: { x: 300, y: 40 }, data: { label: 'Skills\n(SKILL.md + scripts)' } },
  { id: 'mcp', position: { x: 560, y: 40 }, data: { label: 'MCP\n(tool access)' } },
  { id: 'planner', position: { x: 180, y: 210 }, data: { label: 'Planner\n(Research/Plan)' } },
  { id: 'executor', position: { x: 430, y: 210 }, data: { label: 'Executor\n(Implement)' } },
  { id: 'verify', position: { x: 300, y: 380 }, data: { label: 'Verify\n(test/lint/review)' } },
  { id: 'release', position: { x: 300, y: 540 }, data: { label: 'Release Gate' }, type: 'output' },
]

const XY_EDGES: Edge[] = [
  { id: 'e1', source: 'rules', target: 'planner', animated: true },
  { id: 'e2', source: 'skills', target: 'planner', animated: true },
  { id: 'e3', source: 'mcp', target: 'executor', animated: true },
  { id: 'e4', source: 'planner', target: 'executor' },
  { id: 'e5', source: 'executor', target: 'verify', animated: true },
  { id: 'e6', source: 'verify', target: 'planner', label: 'fix loop' },
  { id: 'e7', source: 'verify', target: 'release', animated: true },
]

type SddField = {
  id: string
  number: string
  name: string
  description: string
  detail: string
  example: string
  antiPattern: string
}

type SddSpecRow = {
  field: string
  weak: string
  strong: string
}

type MultiAgentArch = {
  id: string
  letter: string
  name: string
  tagline: string
  description: string
  when: string
  components: string[]
  tradeoff: string
  reliability: 'high' | 'medium' | 'low'
}

type MultiAgentPattern = {
  id: string
  letter: string
  name: string
  tagline: string
  description: string
  when: string
  components: string[]
  tradeoff: string
}

const SDD_FIELDS: SddField[] = [
  {
    id: 'context',
    number: '1',
    name: 'Contexto',
    description: 'Qual problema precisa ser resolvido, quem é afetado e quais são as restrições técnicas reais.',
    detail: 'Contexto fraco gera objetivo vago. Sem saber quem é afetado, o critério de sucesso fica em aberto. Restrições técnicas definem o que é viável antes de qualquer plano.',
    example: 'A função parseDate() lança exceção para entradas vazias. Afeta todos os forms do app. Restrição: manter a assinatura atual.',
    antiPattern: '"O sistema tem problemas de performance." — Quem é afetado? Qual parte? Qual restrição?',
  },
  {
    id: 'objective',
    number: '2',
    name: 'Objetivo',
    description: 'O resultado esperado em uma frase. O que "pronto" significa, antes de escrever uma linha.',
    detail: 'Um objetivo mensurável é o que separa entrega de opinião. Se nao der para verificar se o objetivo foi atingido, ele é fraco.',
    example: 'parseDate() retorna null para entradas invalidas sem lancar excecao.',
    antiPattern: '"Melhorar a experiência do usuário." — Nao é verificável. Nao tem critério.',
  },
  {
    id: 'scope',
    number: '3',
    name: 'Escopo',
    description: 'O que entra e o que explicitamente nao entra. Ambos os lados sao obrigatórios.',
    detail: 'Escopo sem o "nao entra" é incompleto. É o "nao entra" que previne scope creep e garante que a IA nao expanda o trabalho sem pedido.',
    example: 'Entra: parseDate() em utils/date.ts. Nao entra: outras funcoes do arquivo, validacoes de formato.',
    antiPattern: '"Escopo: tudo que for lento." — Sem limite, a IA vai otimizar tudo e sair do objetivo.',
  },
  {
    id: 'criteria',
    number: '4',
    name: 'Critérios de validacao',
    description: 'Critérios verificáveis definidos ANTES da execucao. Sao o contrato de aprovacao da entrega.',
    detail: 'Critérios definidos depois da execucao sao post-hoc rationalization. Eles precisam existir antes para que o agente (e o revisor) saibam o que aprovar.',
    example: "parseDate('') = null. parseDate('invalid') = null. parseDate('2024-01-15') = Date valido. Testes existentes passam sem modificacao.",
    antiPattern: '"Deve funcionar corretamente." — Correto segundo quem? Com qual input? Verificado como?',
  },
  {
    id: 'plan',
    number: '5',
    name: 'Plano RPEV',
    description: 'Research, Plan, Execute e Verify definidos antes de iniciar qualquer codigo.',
    detail: 'O plano nao é o código: é o mapa de como chegar lá. Research evita implementar em cima de mal-entendidos. Verify define o gate de conclusao.',
    example: 'Research: ler parseDate() e testes atuais. Plan: guard clause para empty/null. Execute: implementar em utils/date.ts. Verify: rodar testes + lint + revisar diff.',
    antiPattern: 'Pular Research e ir direto ao Execute. O agente assume estado que nao entende.',
  },
  {
    id: 'evidence',
    number: '6',
    name: 'Evidencias',
    description: 'Registro dos critérios atendidos, exemplos e links. Fechamento do ciclo com prova.',
    detail: 'Sem evidencias, "pronto" é uma afirmacao. Com evidencias, é um fato verificável. Esse campo fecha o loop e permite auditoria futura.',
    example: 'Criterios 1-4 atendidos. Testes: 42/42 passando. PR aprovado por revisor humano. Link: github.com/repo/pull/42.',
    antiPattern: 'Marcar como pronto sem registrar o que foi verificado. Nao tem rollback se precisar reverter.',
  },
]

const SDD_SPEC_ROWS: SddSpecRow[] = [
  {
    field: 'Objetivo',
    weak: '"Melhorar a performance do sistema"',
    strong: '"Reduzir p95 de /api/search de 1800ms para <400ms"',
  },
  {
    field: 'Escopo',
    weak: '"Tudo que estiver lento"',
    strong: '"Apenas query builder + indice. Nao entra: cache layer, auth"',
  },
  {
    field: 'Critério',
    weak: '"Deve ficar mais rapido"',
    strong: '"p95 < 400ms em load test com 100 req/s por 60s"',
  },
  {
    field: 'Research',
    weak: 'Ausente — vai direto ao código',
    strong: '"Profiling da query atual + explain plan do indice composto"',
  },
  {
    field: 'Evidencia',
    weak: 'Nenhuma — "ta funcionando"',
    strong: '"p95 = 187ms. 100% dos testes passando. PR #42 aprovado."',
  },
]

const MULTI_AGENT_ARCHS: MultiAgentArch[] = [
  {
    id: 'network',
    letter: 'A',
    name: 'Network',
    tagline: 'Agentes comunicam livremente entre si',
    description: 'Cada agente decide quem é o próximo a executar. Sem coordenador central. Usado em frameworks como Swarm e CrewAI.',
    when: 'Exploração inicial, protótipos. Nao recomendado para produção.',
    components: ['Agent A', 'Agent B', 'Agent C', 'Peer routing'],
    tradeoff: 'Pouco confiável e caro: roteamento sem controle gera loops, tokens extras e falhas silenciosas.',
    reliability: 'low',
  },
  {
    id: 'supervisor',
    letter: 'B',
    name: 'Supervisor',
    tagline: 'Agente central delega para especialistas',
    description: 'Um agente supervisor tem como única função coordenar: ele delega tarefas para subagentes especialistas e agrega os resultados.',
    when: 'Tarefas compostas com subtarefas bem definidas e especialização por domínio.',
    components: ['Supervisor Agent', 'Worker: Code', 'Worker: Test', 'Worker: Docs'],
    tradeoff: 'Controle claro e rastreável. Supervisor vira gargalo se sobrecarregado.',
    reliability: 'high',
  },
  {
    id: 'supervisor-tools',
    letter: 'C',
    name: 'Supervisor-as-Tools',
    tagline: 'Subagentes passados como ferramentas ao LLM central',
    description: 'Versão simplificada do padrão Supervisor. Os subagentes sao registrados como tools, o LLM central os invoca diretamente via tool call.',
    when: 'Quando o supervisor precisa de baixa latência e o número de workers é fixo e pequeno.',
    components: ['Orchestrator LLM', 'Worker as Tool A', 'Worker as Tool B', 'Tool registry'],
    tradeoff: 'Mais simples de implementar; menos flexível para workers dinâmicos.',
    reliability: 'high',
  },
  {
    id: 'hierarchical',
    letter: 'D',
    name: 'Hierárquica',
    tagline: 'Supervisores coordenam outros supervisores',
    description: 'Camadas de supervisores: um supervisor mestre coordena sub-supervisores, cada um com seu próprio grupo de workers especializados.',
    when: 'Sistemas grandes com domínios ortogonais: frontend, backend, infra, testes como clusters separados.',
    components: ['Master Supervisor', 'Sub-supervisor A', 'Sub-supervisor B', 'Workers por cluster'],
    tradeoff: 'Alta escalabilidade e isolamento de domínio. Complexidade de setup e depuração significativa.',
    reliability: 'medium',
  },
  {
    id: 'custom-cognitive',
    letter: 'E',
    name: 'Custom Cognitive',
    tagline: 'Fluxo personalizado para o domínio específico',
    description: 'Em vez de usar arquitetura genérica, você constrói o fluxo de controle exato para o seu caso. Maior controle sobre roteamento, estado e ferramentas.',
    when: 'Produção real com requisitos específicos. Recomendação do LangGraph para casos críticos.',
    components: ['Domain-specific graph', 'Custom routing', 'State management', 'Typed checkpoints'],
    tradeoff: 'Mais esforço inicial; menor custo operacional e mais previsibilidade em produção.',
    reliability: 'high',
  },
]

const MULTI_AGENT_PATTERNS: MultiAgentPattern[] = [
  {
    id: 'evaluator-optimizer',
    letter: 'F',
    name: 'Evaluator-Optimizer',
    tagline: 'Loop interno de feedback entre gerador e crítico',
    description: 'Agente gerador produz solução. Agente crítico avalia com critério explícito. Se rejeitado, gerador retrabalha a partir do feedback até aprovação.',
    when: 'Tarefas criativas ou abertas onde a primeira saída raramente é ideal: código, reviews, docs.',
    components: ['Generator Agent', 'Critic Agent', 'Feedback loop', 'Acceptance criteria'],
    tradeoff: 'Mais tokens e latência por ciclo. Saída significativamente melhor para tarefas sem resposta única.',
  },
  {
    id: 'quality-loop',
    letter: 'G',
    name: 'Quality Loop',
    tagline: 'Executar, validar, corrigir até aprovação',
    description: 'Executar a tarefa, validar imediatamente contra critério verificável, corrigir se falhar, repetir. Base do RPEV aplicado em loop automatizado.',
    when: 'Qualquer tarefa com critério verificável: testes passando, lint limpo, build verde.',
    components: ['Execute', 'Validate', 'Fix', 'Max retries gate'],
    tradeoff: 'Simples de implementar. Risco de loop infinito sem limite de retries explícito.',
  },
  {
    id: 'dynamic-context',
    letter: 'H',
    name: 'Dynamic Context Injection',
    tagline: 'Shell executa antes do prompt e injeta estado real',
    description: 'O padrão `!{comando}` executa shell antes da montagem do prompt e injeta saída real no contexto. O agente recebe estado atual, nao snapshot estático.',
    when: 'Quando o agente precisa de estado atual: git status, CI logs, env vars, ficheiros de config.',
    components: ['Shell command', 'Live output capture', 'Prompt assembly', 'Context injection'],
    tradeoff: 'Risco de prompt injection se a fonte nao for confiável. Validar origem antes de injetar.',
  },
  {
    id: 'llm-judge',
    letter: 'I',
    name: 'LLM-as-a-Judge',
    tagline: 'Modelo avalia comportamento de outro modelo',
    description: 'Um LLM separado (ou eval framework como promptfoo) valida a saída do agente principal. Detecta regressão de comportamento sem testes manuais exaustivos.',
    when: 'Validar respostas abertas, fluxos longos ou comportamento de skills em pipeline de CI.',
    components: ['Primary agent', 'Judge LLM', 'Eval criteria', 'Pass/fail signal'],
    tradeoff: 'Custo duplo de tokens. Alto retorno para fluxos críticos onde teste manual nao é viável.',
  },
]

const COMM_PATTERNS = [
  {
    id: 'shared-state',
    name: 'Shared State',
    description: 'Agentes leem e escrevem em um objeto de estado comum. Mensagens, artefatos e contexto ficam acessíveis para todos os participantes do sistema.',
    pros: ['Visibilidade total do estado', 'Fácil debug e rastreamento', 'Natural para fluxos sequenciais'],
    cons: ['Estado cresce rapidamente', 'Risco de conflito em escrita paralela', 'Contexto pesado para todos os agentes'],
  },
  {
    id: 'tool-calling',
    name: 'Tool Calling',
    description: 'Um agente invoca outro como se fosse uma ferramenta: passa parâmetros específicos e recebe apenas o resultado final daquela tarefa.',
    pros: ['Contexto isolado por tarefa', 'Workers nao veem histórico completo', 'Melhor para paralelização'],
    cons: ['Menos visibilidade do processo interno', 'Difícil propagar contexto parcial', 'Perde histórico intermediário'],
  },
]

/* ─── App ────────────────────────────────────────────────── */

function App() {
  const [activeLayer, setActiveLayer] = useState(LAYERS[0])
  const [activeStep, setActiveStep] = useState(FLOW[0])
  const [activeSection, setActiveSection] = useState('hero')
  const [activeMapView, setActiveMapView] = useState<'all' | 'build' | 'ops'>('all')
  const [activeDeepDive, setActiveDeepDive] = useState(DEEP_DIVES[0])
  const [activePhase, setActivePhase] = useState(WORKFLOW_PHASES[0])
  const [activeAntiPattern, setActiveAntiPattern] = useState(ANTI_PATTERNS[0])
  const [activeSddField, setActiveSddField] = useState(SDD_FIELDS[0])
  const [activeArch, setActiveArch] = useState(MULTI_AGENT_ARCHS[0])
  const [activeAgentPattern, setActiveAgentPattern] = useState(MULTI_AGENT_PATTERNS[0])
  const [checkedItems, setCheckedItems] = useState<Set<number>>(new Set())
  const [mobileNavOpen, setMobileNavOpen] = useState(false)
  const [mermaidReady, setMermaidReady] = useState(false)

  // Refs para scroll-to-detail em mobile
  const sddDetailRef = useRef<HTMLDivElement>(null)
  const deepDiveDetailRef = useRef<HTMLDivElement>(null)
  const layerDetailRef = useRef<HTMLDivElement>(null)
  const execFlowDetailRef = useRef<HTMLDivElement>(null)
  const workflowDetailRef = useRef<HTMLDivElement>(null)
  const maArchDetailRef = useRef<HTMLDivElement>(null)
  const maPatternDetailRef = useRef<HTMLDivElement>(null)
  const antiPatternDetailRef = useRef<HTMLDivElement>(null)

  const scrollToDetail = (ref: React.RefObject<HTMLDivElement | null>) => {
    if (window.innerWidth <= 980) {
      setTimeout(() => {
        ref.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
      }, 60)
    }
  }

  const navItems = useMemo(
    () => [
      { id: 'hero', label: 'Início' },
      { id: 'lesson-roadmap', label: 'Guia' },
      { id: 'vibecoding-vs-ai', label: 'Comparativo' },
      { id: 'principles', label: 'Pilares' },
      { id: 'sdd', label: 'SDD' },
      { id: 'context-signals', label: 'Sinais' },
      { id: 'progressive-disclosure', label: 'Progressive' },
      { id: 'layer-model', label: 'Camadas' },
      { id: 'execution-flow', label: 'RPEV' },
      { id: 'workflow-gate', label: 'Workflow' },
      { id: 'multi-agent', label: 'Multi-Agent' },
      { id: 'anti-patterns', label: 'Anti-patterns' },
      { id: 'deep-dive', label: 'Deep Dive' },
      { id: 'mermaid-diagrams', label: 'Diagramas' },
      { id: 'ecosystem-map', label: 'Mapa' },
      { id: 'xyflow-map', label: 'Graph' },
      { id: 'stack-curation', label: 'Stack' },
      { id: 'methods-core', label: 'Métodos' },
      { id: 'examples', label: 'Exemplos' },
      { id: 'review-checklist', label: 'Checklist' },
      { id: 'quality-matrix', label: 'Matriz' },
      { id: 'refs', label: 'Referências' },
    ],
    [],
  )

  useEffect(() => {
    const sections = document.querySelectorAll('.reveal')
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
            revealObserver.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.08 },
    )
    sections.forEach((section) => revealObserver.observe(section))
    return () => revealObserver.disconnect()
  }, [])

  useEffect(() => {
    const watched = navItems
      .map((item) => document.getElementById(item.id))
      .filter(Boolean) as HTMLElement[]
    const spyObserver = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)
        if (visible[0]?.target?.id) setActiveSection(visible[0].target.id)
      },
      { rootMargin: '-20% 0px -60% 0px', threshold: [0.3, 0.6, 1] },
    )
    watched.forEach((section) => spyObserver.observe(section))
    return () => spyObserver.disconnect()
  }, [navItems])

  useEffect(() => {
    let active = true
    const renderDiagrams = async () => {
      try {
        const mermaid = (await import('mermaid')).default
        if (!active) return
        mermaid.initialize({
          startOnLoad: false,
          securityLevel: 'loose',
          theme: 'base',
          themeVariables: {
            background: '#070b10',
            primaryColor: '#0f1a29',
            primaryTextColor: '#e4f2fb',
            primaryBorderColor: '#3e6c93',
            secondaryColor: '#0a121d',
            tertiaryColor: '#081018',
            lineColor: '#6fc2ee',
            clusterBkg: '#0c1522',
            clusterBorder: '#325a7c',
            mainBkg: '#0f1a29',
            nodeBorder: '#3e6c93',
            fontFamily: 'JetBrains Mono, ui-monospace, SFMono-Regular, Menlo, monospace',
            edgeLabelBackground: '#0c1726',
          },
        })
        const nodes = Array.from(document.querySelectorAll<HTMLElement>('.mermaid'))
        nodes.forEach((node) => node.removeAttribute('data-processed'))
        await mermaid.run({ nodes })
        if (active) setMermaidReady(true)
      } catch {
        if (active) setMermaidReady(true) // show content even on error
      }
    }
    void renderDiagrams()
    return () => { active = false }
  }, [])

  const toggleCheck = (i: number) => {
    setCheckedItems((prev) => {
      const next = new Set(prev)
      if (next.has(i)) next.delete(i)
      else next.add(i)
      return next
    })
  }

  const severityLabel = (s: AntiPattern['severity']) =>
    s === 'critical' ? 'Crítico' : s === 'high' ? 'Alto' : 'Médio'

  const riskLabel = (r: Comparison['risk']) =>
    r === 'high' ? 'Risco alto sem processo' : r === 'medium' ? 'Atenção' : ''

  return (
    <div className="app">
      <a className="skip-link" href="#main-content">Skip to content</a>

      <nav className="top-nav" aria-label="Navegação principal">
        <a href="#hero" className="brand">vibening</a>
        <button
          type="button"
          className="mobile-nav-btn"
          aria-label="Abrir navegação"
          aria-expanded={mobileNavOpen}
          onClick={() => setMobileNavOpen(true)}
        >
          <span /><span /><span />
        </button>
      </nav>

      {mobileNavOpen && (
        <div className="mobile-nav-overlay" role="dialog" aria-label="Navegação por seção">
          <div className="mobile-nav-backdrop" onClick={() => setMobileNavOpen(false)} />
          <nav className="mobile-nav-sheet">
            <div className="mobile-nav-header">
              <span className="brand">vibening</span>
              <button type="button" className="mobile-nav-close" aria-label="Fechar" onClick={() => setMobileNavOpen(false)}>✕</button>
            </div>
            <ul className="mobile-nav-list">
              {navItems.map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    className={`mobile-nav-link${activeSection === item.id ? ' active' : ''}`}
                    onClick={() => setMobileNavOpen(false)}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      )}

      <aside className="side-nav" aria-label="Navegação por seção">
        {navItems.map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            className={`side-link${activeSection === item.id ? ' active' : ''}`}
            aria-label={item.label}
            aria-current={activeSection === item.id ? 'true' : undefined}
          >
            <span className="side-link-bar" aria-hidden="true" />
            <span className="side-link-label">{item.label}</span>
          </a>
        ))}
      </aside>

      {/* ── Hero ─────────────────────────────────────────── */}
      <header id="hero" className="hero">
        <div className="hero-grid" />
        <div className="hero-glow hero-glow-primary" />
        <div className="hero-glow hero-glow-secondary" />
        <div className="hero-content reveal visible">
          <p className="eyebrow">Agentic Engineering</p>
          <h1>
            Engenharia agêntica
            <span>do conceito à produção</span>
          </h1>
          <p className="hero-subtitle">
            Fundamentos técnicos de AI Coding: contexto, execução controlada e arquitetura multi-agente.
          </p>
          <div className="hero-metrics" aria-label="Destaques do guia">
            <div className="metric"><span>SDD</span><small>spec antes do código</small></div>
            <div className="metric"><span>RPEV</span><small>loop de execução</small></div>
            <div className="metric"><span>Multi-Agent</span><small>além do agente único</small></div>
          </div>
        </div>
      </header>

      <main id="main-content" className="content">

        {/* ── Lesson Roadmap ───────────────────────────── */}
        <section id="lesson-roadmap" className="reveal">
          <p className="section-label">Guia de Estudo</p>
          <h2 className="section-title">Trilha de aprendizado</h2>
          <div className="lessons-grid">
            {LESSONS.map((lesson) => (
              <article key={lesson.id} className="glass-card lesson-card">
                <div className="lesson-header">
                  <span className="lesson-number">{lesson.number}</span>
                  <span className="lesson-tag">{lesson.tag}</span>
                  {lesson.date ? <span className="lesson-date">{lesson.date}</span> : null}
                </div>
                <h3>{lesson.title}</h3>
                <p className="lesson-objective">{lesson.objective}</p>
                <div className="lesson-columns">
                  <div>
                    <span className="lesson-col-label">Tópicos cobertos</span>
                    <ul>
                      {lesson.topics.map((t) => <li key={t}>{t}</li>)}
                    </ul>
                  </div>
                  <div>
                    <span className="lesson-col-label">Resultados esperados</span>
                    <ul className="outcome-list">
                      {lesson.outcomes.map((o) => <li key={o}>{o}</li>)}
                    </ul>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* ── Vibecoding vs AI-Assisted ─────────────────── */}
        <section id="vibecoding-vs-ai" className="reveal">
          <p className="section-label">Comparativo Central</p>
          <h2 className="section-title">Vibecoding vs AI-Assisted Engineering</h2>
          <p className="section-description">
            Vibecoding é exploração. AI-Assisted Engineering é entrega. Saber distinguir os dois é o primeiro passo.
          </p>
          <div className="comparison-table glass-card">
            <div className="comparison-head">
              <span>Aspecto</span>
              <span>Vibecoding</span>
              <span>AI-Assisted Engineering</span>
            </div>
            {COMPARISONS.map((row) => (
              <div key={row.aspect} className={`comparison-row risk-${row.risk}`}>
                <span className="comparison-aspect">{row.aspect}</span>
                <span className="comparison-vibe">{row.vibecoding}</span>
                <span className="comparison-ai">
                  {row.aiAssisted}
                  {row.risk !== 'ok' && (
                    <span className={`risk-badge risk-${row.risk}`}>{riskLabel(row.risk)}</span>
                  )}
                </span>
              </div>
            ))}
          </div>
          <div className="comparison-note glass-card">
            <span className="deck-block">
              <strong>Regra prática</strong>
              <p>
                Vibecoding para protótipos e exploração isolada. AI-Assisted Engineering para
                qualquer entrega que entra no histórico da equipe, toca produção ou é revisada por outra pessoa.
              </p>
            </span>
          </div>
        </section>

        {/* ── Principles ───────────────────────────────── */}
        <section id="principles" className="reveal">
          <p className="section-label">Core Principles</p>
          <h2 className="section-title">Três princípios que sustentam IA Coding em produção</h2>
          <div className="principles-grid">
            {PRINCIPLES.map((item) => (
              <article key={item.id} className="glass-card principle-card">
                <span className="principle-icon">{item.icon}</span>
                <h3>{item.title}</h3>
                <p>{item.subtitle}</p>
                <small>{item.signal}</small>
              </article>
            ))}
          </div>
        </section>

        {/* ── SDD ──────────────────────────────────────── */}
        <section id="sdd" className="reveal">
          <p className="section-label">Spec-Driven Development</p>
          <h2 className="section-title">Especificar antes de executar</h2>
          <p className="section-description">
            Definir contexto, escopo e critérios antes de executar separa entrega controlada de retrabalho em cascata.
          </p>

          <div className="sdd-why-grid">
            <div className="glass-card sdd-why-card">
              <span className="sdd-why-icon">01</span>
              <h3>Critério antes do código</h3>
              <p>Sem critério de aceite definido antes da execucao, "pronto" é uma opiniao, nao um fato verificável.</p>
            </div>
            <div className="glass-card sdd-why-card">
              <span className="sdd-why-icon">02</span>
              <h3>Escopo que previne creep</h3>
              <p>O campo "nao entra" é obrigatório. É ele que impede a IA de expandir o trabalho sem pedido explícito.</p>
            </div>
            <div className="glass-card sdd-why-card">
              <span className="sdd-why-icon">03</span>
              <h3>Evidencias fecham o loop</h3>
              <p>Sem evidencias registradas, nao há como auditar o que foi aprovado ou reverter com seguranca.</p>
            </div>
          </div>

          <div className="sdd-layout">
            <div className="sdd-fields-list">
              {SDD_FIELDS.map((field) => (
                <button
                  key={field.id}
                  type="button"
                  className={`sdd-field-btn glass-card ${activeSddField.id === field.id ? 'active' : ''}`}
                  onClick={() => { setActiveSddField(field); scrollToDetail(sddDetailRef) }}
                >
                  <span className="sdd-field-number">{field.number}</span>
                  <span className="sdd-field-name">{field.name}</span>
                </button>
              ))}
            </div>
            <div ref={sddDetailRef}>
            <article key={activeSddField.id} className="sdd-detail glass-card">
              <div className="sdd-detail-header">
                <span className="detail-kicker">Campo {activeSddField.number} de {SDD_FIELDS.length}</span>
                <span className="sdd-progress-dots">
                  {SDD_FIELDS.map((f) => (
                    <span key={f.id} className={`sdd-dot ${f.id === activeSddField.id ? 'active' : ''}`} />
                  ))}
                </span>
              </div>
              <h3>{activeSddField.name}</h3>
              <p className="sdd-description">{activeSddField.description}</p>
              <p className="sdd-detail-text">{activeSddField.detail}</p>
              <div className="deck-block sdd-example-block">
                <strong>Exemplo</strong>
                <p>{activeSddField.example}</p>
              </div>
              <div className="flow-warning sdd-antipattern-block">
                <strong>Anti-pattern</strong>
                <p>{activeSddField.antiPattern}</p>
              </div>
            </article>
            </div>
          </div>

          <div className="sdd-quality glass-card">
            <div className="sdd-quality-header">
              <span className="section-label" style={{ margin: 0 }}>Spec fraca vs spec forte</span>
            </div>
            <div className="sdd-quality-head">
              <span>Campo</span>
              <span className="sdd-weak-label">Spec fraca</span>
              <span className="sdd-strong-label">Spec forte</span>
            </div>
            {SDD_SPEC_ROWS.map((row) => (
              <div key={row.field} className="sdd-quality-row">
                <span className="sdd-quality-field">{row.field}</span>
                <span className="sdd-quality-weak">{row.weak}</span>
                <span className="sdd-quality-strong">{row.strong}</span>
              </div>
            ))}
          </div>

          <div className="sdd-example-full glass-card">
            <div className="sdd-template-header">
              <strong>Exemplo completo preenchido</strong>
              <span className="detail-kicker">API /search performance</span>
            </div>
            <pre><code>{`## 1. Contexto
- problema: API /users/search retorna timeout para queries acima de 3 chars
- publico afetado: clientes Enterprise (plano Pro+)
- restricoes: sem schema changes em producao

## 2. Objetivo
Reduzir p95 de /users/search de 2400ms para menos de 300ms sem alteracao de schema.

## 3. Escopo
- entra: UserSearchRepository, query builder, indice existente
- nao entra: camada de autenticacao, paginacao, outros endpoints

## 4. Criterios de validacao
- p95 < 300ms em load test com 50 req/s por 60s
- zero timeouts em queries de ate 50 caracteres
- testes unitarios existentes continuam passando sem modificacao

## 5. Plano (RPEV)
- research: profiling da query atual + explain plan do indice composto
- plan: reescrever query com indice composto + limit antecipado
- execute: implementar em UserSearchRepository.ts
- verify: rodar k6 load test + suite de testes + revisar diff

## 6. Evidencias
- p95 = 187ms (meta: < 300ms) — criterio 1 atendido
- zero timeouts registrados nos 60s de carga — criterio 2 atendido
- 42/42 testes passando — criterio 3 atendido
- PR #42 aprovado por revisor humano`}</code></pre>
          </div>

          <div className="sdd-template glass-card">
            <div className="sdd-template-header">
              <strong>Template em branco</strong>
              <span className="detail-kicker">copie e adapte</span>
            </div>
            <pre><code>{`## 1. Contexto
- problema: ...
- publico afetado: ...
- restricoes tecnicas: ...

## 2. Objetivo
- resultado esperado em uma frase: ...

## 3. Escopo
- entra: ...
- nao entra: ...

## 4. Criterios de validacao
- criterio 1: ...
- criterio 2: ...
- criterio 3: ...

## 5. Plano (RPEV)
- research: ...
- plan: ...
- execute: ...
- verify: ...

## 6. Evidencias
- criterios atendidos: ...
- exemplo demonstrado: ...
- links de apoio: ...`}</code></pre>
          </div>
        </section>

        {/* ── Context Signals ───────────────────────────── */}
        <section id="context-signals" className="reveal">
          <p className="section-label">Context Engineering</p>
          <h2 className="section-title">Sinais de contexto insuficiente ou poluído</h2>
          <p className="section-description">
            Reconhecer esses sinais antes de continuar economiza tempo, reduz retrabalho e evita que bugs de contexto virem bugs de produto.
          </p>
          <div className="signals-grid">
            {CONTEXT_SIGNALS.map((signal) => (
              <article key={signal.signal} className={`glass-card signal-card signal-${signal.type}`}>
                <div className="signal-header">
                  <span className={`signal-badge signal-${signal.type}`}>
                    {signal.type === 'error' ? 'Reset' : 'Atenção'}
                  </span>
                </div>
                <h3>{signal.signal}</h3>
                <p className="signal-meaning">{signal.meaning}</p>
                <div className="signal-action">
                  <span>Ação:</span> {signal.action}
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* ── Progressive Disclosure ───────────────────── */}
        <section id="progressive-disclosure" className="reveal">
          <p className="section-label">Progressive Disclosure</p>
          <h2 className="section-title">Índice primeiro, detalhe sob demanda</h2>
          <p className="section-description">
            Reduz ruído de contexto e mitiga o efeito Lost in the Middle.
          </p>
          <div className="pd-grid">
            {PD_LAYERS.map((layer, i) => (
              <article key={layer.id} className="glass-card pd-card">
                <div className="pd-header">
                  <span className="pd-number">L{i + 1}</span>
                  <span className="pd-tokens">{layer.tokens}</span>
                </div>
                <h3>{layer.name}</h3>
                <p>{layer.objective}</p>
                <div className="deck-block">
                  <strong>Carregar quando</strong>
                  <p>{layer.loadWhen}</p>
                </div>
                <ul>
                  {layer.includes.map((item) => <li key={item}>{item}</li>)}
                </ul>
              </article>
            ))}
          </div>
          <article className="glass-card checklist-card">
            <h3>Workflow padrão</h3>
            <pre><code>{`task → scan index (L1) → select relevant → load instructions (L2) → execute → deep dive on demand (L3)`}</code></pre>
            <p>Cada camada só é carregada quando a anterior confirma relevância. Custo de contexto é proporcional à necessidade real.</p>
          </article>
        </section>

        {/* ── Layer Model ──────────────────────────────── */}
        <section id="layer-model" className="reveal">
          <p className="section-label">Layer Model</p>
          <h2 className="section-title">Camadas operacionais do stack agêntico</h2>
          <div className="layer-layout">
            <div className="layer-stack">
              {LAYERS.map((layer) => (
                <button
                  key={layer.id}
                  type="button"
                  className={`layer-row glass-card ${activeLayer.id === layer.id ? 'active' : ''}`}
                  onClick={() => { setActiveLayer(layer); scrollToDetail(layerDetailRef) }}
                >
                  <div className="layer-row-main">
                    <span className="layer-title">{layer.label}</span>
                    <span className="layer-summary">{layer.summary}</span>
                  </div>
                  <div className="layer-chips">
                    {layer.chips.map((chip) => <span key={chip}>{chip}</span>)}
                  </div>
                </button>
              ))}
            </div>
            <div ref={layerDetailRef}>
              <article key={activeLayer.id} className="layer-detail glass-card">
                <span className="detail-kicker">Camada selecionada</span>
                <h3>{activeLayer.label}</h3>
                <ul>
                  {activeLayer.facts.map((fact) => <li key={fact}>{fact}</li>)}
                </ul>
              </article>
            </div>
          </div>
        </section>

        {/* ── RPEV Flow ────────────────────────────────── */}
        <section id="execution-flow" className="reveal">
          <p className="section-label">Execution Flow · RPEV</p>
          <h2 className="section-title">Research → Plan → Execute → Verify</h2>
          <p className="section-description">
            Cada fase tem entrada, saída e critério de conclusão. Sem gate de verify, o ciclo não fecha.
          </p>
          <div className="flow-layout">
            <div className="flow-left">
              {FLOW.map((step) => (
                <button
                  key={step.id}
                  type="button"
                  className={`flow-step glass-card ${activeStep.id === step.id ? 'active' : ''}`}
                  onClick={() => { setActiveStep(step); scrollToDetail(execFlowDetailRef) }}
                >
                  <span className="flow-step-label">{step.label}</span>
                  <span className="flow-step-summary">{step.summary}</span>
                </button>
              ))}
            </div>
            <div ref={execFlowDetailRef}>
              <article key={activeStep.id} className="flow-right glass-card">
                <span className="detail-kicker">Fase atual</span>
                <h3>{activeStep.label}</h3>
                <p>{activeStep.detail}</p>
                <div className="flow-payload">{activeStep.payload}</div>
              </article>
            </div>
          </div>
        </section>

        {/* ── Workflow Gate ────────────────────────────── */}
        <section id="workflow-gate" className="reveal">
          <p className="section-label">AI-driven Workflow</p>
          <h2 className="section-title">Gate de qualidade: plan → code → release</h2>
          <p className="section-description">
            Cada etapa tem um gate antes de avançar: planejar, validar, confirmar.
          </p>
          <div className="flow-layout">
            <div className="flow-left">
              {WORKFLOW_PHASES.map((phase) => (
                <button
                  key={phase.id}
                  type="button"
                  className={`flow-step glass-card ${activePhase.id === phase.id ? 'active' : ''}`}
                  onClick={() => { setActivePhase(phase); scrollToDetail(workflowDetailRef) }}
                >
                  <span className="flow-step-label">{phase.step} · {phase.title}</span>
                  <span className="flow-step-summary">{phase.objective}</span>
                </button>
              ))}
            </div>
            <div ref={workflowDetailRef}>
            <article key={activePhase.id} className="flow-right glass-card">
              <span className="detail-kicker">Fase selecionada</span>
              <h3>{activePhase.step} · {activePhase.title}</h3>
              <p>{activePhase.objective}</p>
              <div className="deck-block">
                <strong>Checks obrigatórios</strong>
                <ul>
                  {activePhase.checks.map((check) => <li key={check}>{check}</li>)}
                </ul>
              </div>
              <div className="flow-warning">
                <strong>Anti-pattern</strong>
                <p>{activePhase.antiPattern}</p>
              </div>
            </article>
            </div>
          </div>
        </section>

        {/* ── Multi-Agent ──────────────────────────────── */}
        <section id="multi-agent" className="reveal">
          <p className="section-label">Multi-Agent Architectures</p>
          <h2 className="section-title">Quando um agente nao é suficiente</h2>
          <p className="section-description">
            Acima de 10 ferramentas por agente a qualidade cai. Especialização e paralelismo resolvem os limites do agente único.
          </p>

          <div className="ma-limits glass-card">
            <div className="ma-limits-header">
              <span className="section-label" style={{ margin: 0 }}>Limites do agente único</span>
            </div>
            <div className="ma-limits-grid">
              <div className="ma-limit-item">
                <span className="ma-limit-number">5-10</span>
                <span className="ma-limit-label">ferramentas por agente</span>
                <span className="ma-limit-desc">Acima disso, a qualidade de roteamento de ferramentas cai significativamente.</span>
              </div>
              <div className="ma-limit-item">
                <span className="ma-limit-number">contexto</span>
                <span className="ma-limit-label">acumula e degrada</span>
                <span className="ma-limit-desc">Muitas interações enchem o contexto e comprometem respostas seguintes.</span>
              </div>
              <div className="ma-limit-item">
                <span className="ma-limit-number">1 prompt</span>
                <span className="ma-limit-label">nao resolve tudo</span>
                <span className="ma-limit-desc">Especialização por domínio (coder, tester, researcher) supera um único agente generalista.</span>
              </div>
            </div>
          </div>

          <div className="ma-section-title">
            <p className="section-label" style={{ marginTop: '32px' }}>Arquiteturas de sistema</p>
          </div>
          <div className="deck-layout">
            <div className="deck-list">
              {MULTI_AGENT_ARCHS.map((arch) => (
                <button
                  key={arch.id}
                  type="button"
                  className={`deck-item glass-card ma-arch-item ${activeArch.id === arch.id ? 'active' : ''}`}
                  onClick={() => { setActiveArch(arch); scrollToDetail(maArchDetailRef) }}
                >
                  <div className="ma-arch-item-header">
                    <span className="ma-arch-letter">{arch.letter}</span>
                    <span className={`ma-reliability ma-reliability-${arch.reliability}`}>
                      {arch.reliability === 'high' ? 'Prod-ready' : arch.reliability === 'medium' ? 'Com cuidado' : 'Evitar prod'}
                    </span>
                  </div>
                  <span className="deck-title">{arch.name}</span>
                  <span className="layer-summary">{arch.tagline}</span>
                </button>
              ))}
            </div>
            <div ref={maArchDetailRef}>
            <article key={activeArch.id} className="deck-detail glass-card">
              <div className="ma-detail-top">
                <span className="ma-arch-letter large">{activeArch.letter}</span>
                <span className={`ma-reliability ma-reliability-${activeArch.reliability}`}>
                  {activeArch.reliability === 'high' ? 'Prod-ready' : activeArch.reliability === 'medium' ? 'Com cuidado' : 'Evitar prod'}
                </span>
              </div>
              <h3>{activeArch.name}</h3>
              <p className="deck-objective">{activeArch.description}</p>
              <div className="deck-block">
                <strong>Quando usar</strong>
                <p>{activeArch.when}</p>
              </div>
              <div className="deck-tags">
                {activeArch.components.map((c) => <span key={c}>{c}</span>)}
              </div>
              <div className={`flow-warning ${activeArch.reliability === 'high' ? 'ma-tradeoff-ok' : ''}`}>
                <strong>Trade-off</strong>
                <p>{activeArch.tradeoff}</p>
              </div>
            </article>
            </div>
          </div>

          <div className="ma-section-title">
            <p className="section-label" style={{ marginTop: '32px' }}>Padrões de execução</p>
            <p className="section-description" style={{ marginTop: '8px' }}>
              Como agentes executam e validam dentro de qualquer arquitetura.
            </p>
          </div>
          <div className="deck-layout">
            <div className="deck-list">
              {MULTI_AGENT_PATTERNS.map((pattern) => (
                <button
                  key={pattern.id}
                  type="button"
                  className={`deck-item glass-card ${activeAgentPattern.id === pattern.id ? 'active' : ''}`}
                  onClick={() => { setActiveAgentPattern(pattern); scrollToDetail(maPatternDetailRef) }}
                >
                  <div className="ap-item-header">
                    <span className="ma-arch-letter">{pattern.letter}</span>
                  </div>
                  <span className="deck-title">{pattern.name}</span>
                  <span className="layer-summary">{pattern.tagline}</span>
                </button>
              ))}
            </div>
            <div ref={maPatternDetailRef}>
            <article key={activeAgentPattern.id} className="deck-detail glass-card">
              <span className="detail-kicker">Padrão {activeAgentPattern.letter}</span>
              <h3>{activeAgentPattern.name}</h3>
              <p className="deck-objective">{activeAgentPattern.description}</p>
              <div className="deck-block">
                <strong>Quando usar</strong>
                <p>{activeAgentPattern.when}</p>
              </div>
              <div className="deck-tags">
                {activeAgentPattern.components.map((c) => <span key={c}>{c}</span>)}
              </div>
              <div className="flow-warning">
                <strong>Trade-off</strong>
                <p>{activeAgentPattern.tradeoff}</p>
              </div>
            </article>
            </div>
          </div>

          <div className="ma-section-title">
            <p className="section-label" style={{ marginTop: '32px' }}>Padrões de comunicação</p>
          </div>
          <div className="comm-grid">
            {COMM_PATTERNS.map((cp) => (
              <article key={cp.id} className="glass-card comm-card">
                <h3>{cp.name}</h3>
                <p>{cp.description}</p>
                <div className="comm-columns">
                  <div>
                    <span className="comm-col-label pros">Vantagens</span>
                    <ul>
                      {cp.pros.map((p) => <li key={p}>{p}</li>)}
                    </ul>
                  </div>
                  <div>
                    <span className="comm-col-label cons">Desvantagens</span>
                    <ul>
                      {cp.cons.map((c) => <li key={c}>{c}</li>)}
                    </ul>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* ── Anti-patterns ────────────────────────────── */}
        <section id="anti-patterns" className="reveal">
          <p className="section-label">Anti-patterns</p>
          <h2 className="section-title">O que nao fazer e por que</h2>
          <p className="section-description">
            A IA acelera erros tanto quanto acelera acertos. Reconhecer esses padrões cedo reduz o custo de correção.
          </p>
          <div className="deck-layout">
            <div className="deck-list">
              {ANTI_PATTERNS.map((ap) => (
                <button
                  key={ap.id}
                  type="button"
                  className={`deck-item glass-card ap-item-${ap.severity} ${activeAntiPattern.id === ap.id ? 'active' : ''}`}
                  onClick={() => { setActiveAntiPattern(ap); scrollToDetail(antiPatternDetailRef) }}
                >
                  <div className="ap-item-header">
                    <span className={`ap-severity ap-severity-${ap.severity}`}>{severityLabel(ap.severity)}</span>
                    <span className="ap-category">{ap.category}</span>
                  </div>
                  <span className="deck-title">{ap.problem}</span>
                </button>
              ))}
            </div>
            <div ref={antiPatternDetailRef}>
            <article key={activeAntiPattern.id} className="deck-detail glass-card">
              <div className="ap-detail-header">
                <span className={`ap-severity ap-severity-${activeAntiPattern.severity}`}>
                  {severityLabel(activeAntiPattern.severity)}
                </span>
                <span className="ap-category">{activeAntiPattern.category}</span>
              </div>
              <h3>{activeAntiPattern.problem}</h3>
              <div className="deck-block">
                <strong>Consequência</strong>
                <p>{activeAntiPattern.consequence}</p>
              </div>
              <div className="deck-block ap-fix-block">
                <strong>Correção</strong>
                <p>{activeAntiPattern.fix}</p>
              </div>
            </article>
            </div>
          </div>
        </section>

        {/* ── Deep Dive ────────────────────────────────── */}
        <section id="deep-dive" className="reveal">
          <p className="section-label">Technical Deep Dive</p>
          <h2 className="section-title">Arquitetura prática do stack agêntico</h2>
          <div className="deck-layout">
            <div className="deck-list">
              {DEEP_DIVES.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  className={`deck-item glass-card ${activeDeepDive.id === item.id ? 'active' : ''}`}
                  onClick={() => { setActiveDeepDive(item); scrollToDetail(deepDiveDetailRef) }}
                >
                  <span className="deck-title">{item.title}</span>
                </button>
              ))}
            </div>
            <div ref={deepDiveDetailRef}>
            <article key={activeDeepDive.id} className="deck-detail glass-card">
              <h3>{activeDeepDive.title}</h3>
              <p className="deck-objective">{activeDeepDive.description}</p>
              <div className="deck-tags">
                {activeDeepDive.artifacts.map((artifact) => (
                  <span key={artifact}>{artifact}</span>
                ))}
              </div>
              <div className="deep-links">
                {activeDeepDive.links.map((link) => (
                  <a key={link.href} className="ref-link glass-card" href={link.href} target="_blank" rel="noreferrer">
                    {link.label}
                  </a>
                ))}
              </div>
            </article>
            </div>
          </div>
        </section>

        {/* ── Mermaid Diagrams ─────────────────────────── */}
        <section id="mermaid-diagrams" className="reveal">
          <p className="section-label">Diagramas</p>
          <h2 className="section-title">Fluxos editáveis de governança e execução</h2>
          {!mermaidReady && (
            <div className="diagram-grid diagram-grid-skeleton">
              <div className="glass-card diagram-card"><div className="skeleton diagram-skeleton" /></div>
              <div className="glass-card diagram-card"><div className="skeleton diagram-skeleton" /></div>
              <div className="glass-card diagram-card"><div className="skeleton diagram-skeleton" /></div>
            </div>
          )}
          <div className={`diagram-grid${mermaidReady ? '' : ' diagram-grid-hidden'}`}>
            <article className="glass-card diagram-card">
              <span className="detail-kicker">AI-driven Dev Workflow</span>
              <div className="diagram-wrap">
                <pre className="mermaid">{`flowchart LR
  A[Plan] --> B[Branch/Worktree]
  B --> C[Implement with AI]
  C --> D[Test + Lint]
  D --> E[Pre-flight Review]
  E --> F[PR + CI]
  F --> G{Approved?}
  G -- no --> H[Apply Fix]
  H --> F
  G -- yes --> I[Verification Gate]
  I --> J[Release]
`}</pre>
              </div>
            </article>
            <article className="glass-card diagram-card">
              <span className="detail-kicker">Rules + Skills + MCP</span>
              <div className="diagram-wrap">
                <pre className="mermaid">{`graph TD
  A[Project Rules] --> D[Agent Runtime]
  B[Skills] --> D
  C[MCP] --> D
  D --> E[Execute]
  E --> F[Validate]
  F --> G[Review]
  G --> H[Approval Gate]
`}</pre>
              </div>
            </article>
            <article className="glass-card diagram-card">
              <span className="detail-kicker">Progressive Disclosure</span>
              <div className="diagram-wrap">
                <pre className="mermaid">{`flowchart TD
  T[Task] --> L1[Layer 1: Discovery ~100 tokens]
  L1 --> D{Relevant?}
  D -- no --> Skip[Skip]
  D -- yes --> L2[Layer 2: Activation ~2k-5k tokens]
  L2 --> E[Execute]
  E --> ND{Deep dive needed?}
  ND -- yes --> L3[Layer 3: Execution on demand]
  ND -- no --> Done[Done]
  L3 --> Done
`}</pre>
              </div>
            </article>
            <article className="glass-card diagram-card">
              <span className="detail-kicker">Evaluator-Optimizer Pattern</span>
              <div className="diagram-wrap">
                <pre className="mermaid">{`flowchart LR
  G[Generator] --> S[Solution]
  S --> C[Critic/Evaluator]
  C --> AP{Approved?}
  AP -- no --> R[Rework signal]
  R --> G
  AP -- yes --> F[Finalize]
`}</pre>
              </div>
            </article>
          </div>
        </section>

        {/* ── Ecosystem Map ────────────────────────────── */}
        <section id="ecosystem-map" className="reveal">
          <p className="section-label">Ecosystem</p>
          <h2 className="section-title">Mapa operacional de uma stack agêntica</h2>
          <p className="section-description">
            Build define o que o agente sabe e pode. Ops é o ciclo de execução e validação.
          </p>
          <div className="map-controls" role="tablist" aria-label="Filtro do mapa">
            <button type="button" className={activeMapView === 'all' ? 'active' : ''} onClick={() => setActiveMapView('all')}>All</button>
            <button type="button" className={activeMapView === 'build' ? 'active' : ''} onClick={() => setActiveMapView('build')}>Build</button>
            <button type="button" className={activeMapView === 'ops' ? 'active' : ''} onClick={() => setActiveMapView('ops')}>Ops</button>
          </div>
          <div className="map-card glass-card">
            <div className="map-legend">
              <span className="legend-item legend-top">Build layer</span>
              <span className="legend-item legend-mid">Execution layer</span>
              <span className="legend-item legend-bot">Ops layer</span>
            </div>
            <div className={`map-grid view-${activeMapView}`}>
              <div className="node top"><span>rules</span><small>CLAUDE.md</small></div>
              <div className="node top"><span>skills</span><small>SKILL.md</small></div>
              <div className="node top"><span>mcp</span><small>tool access</small></div>
              <div className="node top"><span>hooks</span><small>loop control</small></div>
              <div className="node mid"><span>research</span><small>map state</small></div>
              <div className="node mid"><span>plan</span><small>define steps</small></div>
              <div className="node mid"><span>execute</span><small>apply changes</small></div>
              <div className="node mid"><span>verify</span><small>validate</small></div>
              <div className="node bot"><span>review</span><small>human eye</small></div>
              <div className="node bot"><span>approval</span><small>gate</small></div>
              <div className="node bot"><span>release</span><small>controlled</small></div>
            </div>
            <p className="map-caption">
              {activeMapView === 'all' && 'Stack completa: desde regras de projeto até release controlado.'}
              {activeMapView === 'build' && 'Build layer: configura o que o agente sabe, pode fazer e como se comporta.'}
              {activeMapView === 'ops' && 'Ops layer: ciclo de execução com gate de aprovação antes de todo release.'}
            </p>
          </div>
        </section>

        <section id="xyflow-map" className="reveal">
          <p className="section-label">Interactive Graph</p>
          <h2 className="section-title">Arquitetura agêntica navegável com XYFlow</h2>
          <p className="section-description">
            Visual interativo para explorar dependências entre regras, skills, MCP e gates de validação.
          </p>
          <article className="glass-card xyflow-card">
            <div className="xyflow-wrap">
              <ReactFlow
                nodes={XY_NODES}
                edges={XY_EDGES}
                fitView
                fitViewOptions={{ padding: 0.16 }}
                minZoom={0.5}
                maxZoom={1.8}
                defaultEdgeOptions={{ style: { stroke: '#66b8e6', strokeWidth: 1.6 } }}
              >
                <MiniMap pannable zoomable />
                <Controls />
                <Background gap={22} size={1} color="rgba(130,180,210,0.22)" />
              </ReactFlow>
            </div>
          </article>
        </section>

        {/* ── Stack Curation ───────────────────────────── */}
        <section id="stack-curation" className="reveal">
          <p className="section-label">Stack Curation</p>
          <h2 className="section-title">Curadoria técnica de ferramentas para IA Coding</h2>
          <p className="section-description">
            Critério de seleção: utilidade prática imediata, baixo risco operacional, documentação pública e curva de adoção compatível com times pequenos.
          </p>
          <div className="stack-grid">
            {(['A', 'B', 'C'] as const).map((priority) => {
              const tools = STACK_TOOLS.filter((t) => t.priority === priority)
              const labels = { A: 'Adotar agora', B: 'Referência complementar', C: 'Fora do escopo' }
              return (
                <div key={priority} className={`stack-group glass-card priority-${priority}`}>
                  <div className="stack-group-header">
                    <span className={`priority-badge priority-${priority}`}>Prioridade {priority}</span>
                    <span className="priority-label">{labels[priority]}</span>
                  </div>
                  <div className="stack-list">
                    {tools.map((tool) => (
                      <div key={tool.name} className="stack-item">
                        <div className="stack-item-main">
                          <span className="stack-name">{tool.name}</span>
                          <span className="stack-type">{tool.type}</span>
                        </div>
                        <span className="stack-why">{tool.why}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        </section>

        {/* ── Methods ──────────────────────────────────── */}
        <section id="methods-core" className="reveal">
          <p className="section-label">Methods</p>
          <h2 className="section-title">Métodos técnicos aplicáveis no dia a dia</h2>
          <div className="methods-grid">
            {METHODS.map((method) => (
              <article key={method.id} className="glass-card method-card">
                <h3>{method.title}</h3>
                <p>{method.summary}</p>
                <ul>
                  {method.bullets.map((item) => <li key={item}>{item}</li>)}
                </ul>
              </article>
            ))}
          </div>
        </section>

        {/* ── Examples ─────────────────────────────────── */}
        <section id="examples" className="reveal">
          <p className="section-label">Examples</p>
          <h2 className="section-title">Exemplos diretos e reutilizáveis</h2>
          <div className="examples-grid">
            <article className="glass-card example-card">
              <h3>SKILL.md mínimo</h3>
              <pre><code>{`---
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
3. Require explicit confirmation for irreversible ops`}</code></pre>
            </article>
            <article className="glass-card example-card">
              <h3>Contexto mínimo viável</h3>
              <pre><code>{`## Objetivo
Refatorar a função parseDate() em utils/date.ts
para tratar entradas vazias sem lançar exceção.

## Escopo
- Apenas parseDate(), sem mexer em outras funções
- Manter assinatura atual: parseDate(input: string): Date

## Critério de aceite
- parseDate('') retorna null
- parseDate('invalid') retorna null
- parseDate('2024-01-15') continua funcionando
- Testes existentes passam`}</code></pre>
            </article>
            <article className="glass-card example-card">
              <h3>Dynamic context injection</h3>
              <pre><code>{`# Passando estado real para o agente em tempo de execução

# Git status atual como contexto
!git status --short

# Branch e último commit
!git log --oneline -5

# Arquivos com conflito
!git diff --name-only --diff-filter=U

# Usar na sessão com:
# "dado o estado atual !{comando}, faça X"`}</code></pre>
            </article>
            <article className="glass-card example-card">
              <h3>Heurísticas de contexto</h3>
              <ul>
                <li>Prompt &gt; ~10k tokens → revisar escopo e aplicar PD.</li>
                <li>Follow-up piora qualidade → contexto poluído, resetar.</li>
                <li>Resposta genérica → adicionar projeto específico ou snippet.</li>
                <li>IA sai do escopo → reformular com in/out explícitos.</li>
                <li>Index primeiro, deep dive só sob demanda.</li>
              </ul>
            </article>
          </div>
        </section>

        {/* ── Review Checklist ─────────────────────────── */}
        <section id="review-checklist" className="reveal">
          <p className="section-label">Code Review Checklist</p>
          <h2 className="section-title">10 gates antes de considerar pronto</h2>
          <p className="section-description">
            Itens abertos viram ações antes do merge, nao comentários para "resolver depois".
          </p>
          <div className="checklist-container glass-card">
            <div className="checklist-progress">
              <span>{checkedItems.size} / {REVIEW_CHECKLIST.length} verificados</span>
              <div className="progress-bar">
                <div
                  className="progress-fill"
                  style={{ width: `${(checkedItems.size / REVIEW_CHECKLIST.length) * 100}%` }}
                />
              </div>
            </div>
            {REVIEW_CHECKLIST.map((item, i) => (
              <button
                key={i}
                type="button"
                className={`checklist-item ${checkedItems.has(i) ? 'checked' : ''}`}
                onClick={() => toggleCheck(i)}
              >
                <span className="checklist-check" aria-hidden="true">
                  {checkedItems.has(i) ? '✓' : '○'}
                </span>
                <span className="checklist-text">{item.item}</span>
                <span className="checklist-cat">{item.category}</span>
              </button>
            ))}
            {checkedItems.size === REVIEW_CHECKLIST.length && (
              <div className="checklist-done">
                <span>Todos os gates atendidos. Pronto para merge.</span>
              </div>
            )}
          </div>
        </section>

        {/* ── Quality Matrix ───────────────────────────── */}
        <section id="quality-matrix" className="reveal">
          <p className="section-label">Quality Matrix</p>
          <h2 className="section-title">Gates para avaliação de interface e execução</h2>
          <div className="matrix-card glass-card">
            <div className="matrix-head">
              <span>Gate</span>
              <span>Regra</span>
              <span>Como verificar</span>
            </div>
            {QUALITY_ROWS.map((row) => (
              <div key={row.gate} className="matrix-row">
                <span>{row.gate}</span>
                <span>{row.rule}</span>
                <span>{row.verify}</span>
              </div>
            ))}
          </div>
        </section>

        {/* ── References ───────────────────────────────── */}
        <section id="refs" className="reveal">
          <p className="section-label">References</p>
          <h2 className="section-title">Fontes técnicas para aprofundamento</h2>
          <p className="section-description">
            Leituras recomendadas, priorizadas para aplicação prática, nao para virar track acadêmico.
          </p>
          <div className="refs-categories">
            <div>
              <h3 className="refs-group-label">Skills &amp; Agents</h3>
              <div className="references-grid">
                <a className="glass-card ref-link" href="https://agentskills.io" target="_blank" rel="noreferrer">Agent Skills Standard</a>
                <a className="glass-card ref-link" href="https://github.com/anthropics/skills" target="_blank" rel="noreferrer">anthropics/skills</a>
                <a className="glass-card ref-link" href="https://github.com/vercel-labs/skills" target="_blank" rel="noreferrer">vercel-labs/skills</a>
                <a className="glass-card ref-link" href="https://www.anthropic.com/engineering/building-effective-agents" target="_blank" rel="noreferrer">Building Effective Agents</a>
              </div>
            </div>
            <div>
              <h3 className="refs-group-label">MCP &amp; Integração</h3>
              <div className="references-grid">
                <a className="glass-card ref-link" href="https://modelcontextprotocol.io/docs/getting-started/intro" target="_blank" rel="noreferrer">MCP Docs</a>
                <a className="glass-card ref-link" href="https://cursor.com/docs/mcp" target="_blank" rel="noreferrer">Cursor MCP Docs</a>
                <a className="glass-card ref-link" href="https://context7.com" target="_blank" rel="noreferrer">Context7</a>
              </div>
            </div>
            <div>
              <h3 className="refs-group-label">Prompt &amp; Contexto</h3>
              <div className="references-grid">
                <a className="glass-card ref-link" href="https://platform.openai.com/docs/guides/prompt-engineering" target="_blank" rel="noreferrer">Prompt Engineering</a>
                <a className="glass-card ref-link" href="https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/long-context-tips" target="_blank" rel="noreferrer">Long Context Tips</a>
                <a className="glass-card ref-link" href="https://arxiv.org/abs/2307.03172" target="_blank" rel="noreferrer">Lost in the Middle (arXiv)</a>
                <a className="glass-card ref-link" href="https://arxiv.org/abs/2210.03629" target="_blank" rel="noreferrer">ReAct (arXiv)</a>
              </div>
            </div>
          </div>
        </section>

      </main>
    </div>
  )
}

export default App
