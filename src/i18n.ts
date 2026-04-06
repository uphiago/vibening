import type {
  AntiPattern,
  ChecklistItem,
  CommPattern,
  Comparison,
  ContextSignal,
  DeepDive,
  FlowStep,
  Layer,
  Lesson,
  MethodCard,
  MultiAgentArch,
  MultiAgentPattern,
  Principle,
  ProgressiveLayer,
  QualityRow,
  SddField,
  SddSpecRow,
  StackTool,
  WorkflowPhase,
} from './types'

/* ─── UI strings ─────────────────────────────────────────── */

export const translations = {
  'pt-BR': {
    nav: {
      openNav: 'Abrir navegação',
      closeNav: 'Fechar',
      skipLink: 'Pular para o conteúdo',
      navLabel: 'Navegação principal',
      sectionNavLabel: 'Navegação por seção',
      langToggle: 'Mudar para inglês',
      languageLabel: 'Idioma',
    },
    navItems: [
      { id: 'hero', label: 'Início' },
      { id: 'lesson-roadmap', label: 'Guia' },
      { id: 'vibecoding-vs-ai', label: 'Comparativo' },
      { id: 'principles', label: 'Pilares' },
      { id: 'sdd', label: 'SDD' },
      { id: 'context-signals', label: 'Sinais' },
      { id: 'progressive-disclosure', label: 'Progressivo' },
      { id: 'layer-model', label: 'Camadas' },
      { id: 'execution-flow', label: 'RPEV' },
      { id: 'workflow-gate', label: 'Workflow' },
      { id: 'multi-agent', label: 'Multiagente' },
      { id: 'anti-patterns', label: 'Anti-padrões' },
      { id: 'deep-dive', label: 'Aprofundar' },
      { id: 'mermaid-diagrams', label: 'Diagramas' },
      { id: 'ecosystem-map', label: 'Mapa' },
      { id: 'stack-curation', label: 'Stack' },
      { id: 'methods-core', label: 'Métodos' },
      { id: 'examples', label: 'Exemplos' },
      { id: 'review-checklist', label: 'Checklist' },
      { id: 'refs', label: 'Referências' },
    ],
    hero: {
      eyebrow: 'Agentic Engineering',
      title: 'Engenharia agêntica',
      titleSpan: 'do conceito à produção',
      subtitle: 'Fundamentos técnicos de AI Coding: contexto, execução controlada e arquitetura multi-agente.',
      metricsLabel: 'Destaques do guia',
      metric1Label: 'spec antes do código',
      metric2Label: 'loop de execução',
      metric3Label: 'além do agente único',
    },
    lessonRoadmap: {
      sectionLabel: 'Guia de Estudo',
      title: 'Trilha de aprendizado',
      description:
        'Duas partes progressivas: da base de contexto e execução até refatoração segura e qualidade contínua em ciclos assistidos por IA.',
      topicsLabel: 'Tópicos cobertos',
      outcomesLabel: 'Resultados esperados',
    },
    vibecodeVsAI: {
      sectionLabel: 'Comparativo Central',
      title: 'Vibecoding vs AI-Assisted Engineering',
      description:
        'Vibecoding é exploração. AI-Assisted Engineering é entrega. Saber distinguir os dois é o primeiro passo.',
      definitionVibeTitle: 'Vibecoding',
      definitionVibeText:
        'Modo de exploração rápida para aprender, prototipar e testar hipóteses locais sem compromisso de produção.',
      definitionAiTitle: 'AI-Assisted Engineering',
      definitionAiText:
        'Modo de entrega com contrato técnico explícito: contexto, escopo, critérios de validação e revisão antes de merge.',
      definitionSourceLabel: 'Nota de definição',
      definitionSourceText:
        'Definições operacionais autorais para este material. Use como linguagem comum do curso e ajuste para o contexto da sua equipe.',
      headerAspect: 'Aspecto',
      headerVibe: 'Vibecoding',
      headerAI: 'AI-Assisted Engineering',
      ruleTitle: 'Regra prática',
      ruleText:
        'Vibecoding para protótipos e exploração isolada. AI-Assisted Engineering para qualquer entrega que entra no histórico da equipe, toca produção ou é revisada por outra pessoa.',
      riskHigh: 'Risco alto sem processo',
      riskMedium: 'Risco médio',
    },
    principles: {
      sectionLabel: 'Princípios-base',
      title: 'Três princípios que sustentam IA Coding em produção',
      description:
        'Antes de ferramentas e técnicas, esses três pilares determinam se o output vai para produção com controle ou vira retrabalho silencioso.',
    },
    sdd: {
      sectionLabel: 'Spec-Driven Development',
      title: 'Especificar antes de executar',
      description:
        'Definir contexto, escopo e critérios antes de executar separa entrega controlada de retrabalho em cascata.',
      why1Title: 'Critério antes do código',
      why1Text: 'Sem critério de aceite definido antes da execução, "pronto" é uma opinião, não um fato verificável.',
      why2Title: 'Escopo que previne creep',
      why2Text: 'O campo "não entra" é obrigatório. É ele que impede a IA de expandir o trabalho sem pedido explícito.',
      why3Title: 'Evidências fecham o loop',
      why3Text: 'Sem evidências registradas, não há como auditar o que foi aprovado ou reverter com segurança.',
      fieldKicker: (n: string, total: number) => `Campo ${n} de ${total}`,
      exampleLabel: 'Exemplo',
      antiPatternLabel: 'Anti-pattern',
      specWeakVsStrong: 'Spec fraca vs spec forte',
      headerField: 'Campo',
      headerWeak: 'Spec fraca',
      headerStrong: 'Spec forte',
      exampleFullTitle: 'Exemplo completo preenchido',
      exampleFullKicker: 'API /search performance',
      templateTitle: 'Template em branco',
      templateKicker: 'copie e adapte',
    },
    contextSignals: {
      sectionLabel: 'Context Engineering',
      title: 'Sinais de contexto insuficiente ou poluído',
      description:
        'Reconhecer esses sinais antes de continuar economiza tempo, reduz retrabalho e evita que bugs de contexto virem bugs de produto.',
      badgeReset: 'Reset',
      badgeWarning: 'Atenção',
      actionLabel: 'Ação:',
    },
    progressiveDisclosure: {
      sectionLabel: 'Progressive Disclosure',
      title: 'Índice primeiro, detalhe sob demanda',
      description: 'Reduz ruído de contexto e mitiga o efeito Lost in the Middle.',
      loadWhenLabel: 'Carregar quando',
      workflowTitle: 'Workflow padrão',
      workflowCode:
        'task → scan index (L1) → select relevant → load instructions (L2) → execute → deep dive on demand (L3)',
      workflowNote:
        'Cada camada só é carregada quando a anterior confirma relevância. Custo de contexto é proporcional à necessidade real.',
    },
    layerModel: {
      sectionLabel: 'Modelo de camadas',
      title: 'Camadas operacionais do stack agêntico',
      description:
        'Cada camada tem uma responsabilidade única. Confundir onde algo pertence é uma das causas mais comuns de configuração inconsistente.',
      kicker: 'Camada selecionada',
    },
    executionFlow: {
      sectionLabel: 'Fluxo de execução · RPEV',
      title: 'Pesquisar → Planejar → Executar → Verificar',
      description: 'Cada fase tem entrada, saída e critério de conclusão. Sem gate de verify, o ciclo não fecha.',
      kicker: 'Fase atual',
    },
    workflowGate: {
      sectionLabel: 'Fluxo orientado por IA',
      title: 'Gate de qualidade: plan → code → release',
      description: 'Cada etapa tem um gate antes de avançar: planejar, validar, confirmar.',
      kicker: 'Fase selecionada',
      checksLabel: 'Checks obrigatórios',
      antiPatternLabel: 'Anti-pattern',
    },
    multiAgent: {
      sectionLabel: 'Arquiteturas multiagente',
      title: 'Quando um agente não é suficiente',
      description:
        'Agente único tem limites reais de contexto e ferramentas. Especialização e paralelismo são a resposta quando a complexidade da tarefa exige.',
      limitsLabel: 'Sinais para escalar',
      limit1Number: 'escopo',
      limit1Label: 'define quando escalar',
      limit1Desc:
        'Complexidade crescente de tarefa, domínio ou ferramentas são os sinais reais. Não há threshold absoluto.',
      limit2Number: 'contexto',
      limit2Label: 'acumula e degrada',
      limit2Desc: 'Muitas interações enchem o contexto e comprometem respostas seguintes.',
      limit3Number: '1 prompt',
      limit3Label: 'não resolve tudo',
      limit3Desc: 'Especialização por domínio (coder, tester, researcher) supera um único agente generalista.',
      archsLabel: 'Arquiteturas de sistema',
      patternsLabel: 'Padrões de execução',
      patternsDesc: 'Como agentes executam e validam dentro de qualquer arquitetura.',
      commLabel: 'Padrões de comunicação',
      whenLabel: 'Quando usar',
      tradeoffLabel: 'Trade-off',
      patternKicker: (letter: string) => `Padrão ${letter}`,
      reliabilityHigh: 'Prod-ready',
      reliabilityMedium: 'Com cuidado',
      reliabilityLow: 'Evitar prod',
      prosLabel: 'Vantagens',
      consLabel: 'Desvantagens',
    },
    antiPatterns: {
      sectionLabel: 'Anti-patterns',
      title: 'O que não fazer e por que',
      description:
        'A IA acelera erros tanto quanto acelera acertos. Reconhecer esses padrões cedo reduz o custo de correção.',
      consequenceLabel: 'Consequência',
      fixLabel: 'Correção',
      severityCritical: 'Crítico',
      severityHigh: 'Alto',
      severityMedium: 'Médio',
    },
    deepDive: {
      sectionLabel: 'Aprofundamento técnico',
      title: 'Arquitetura prática do stack agêntico',
      description:
        'Exploração técnica das peças que compõem um stack agêntico real: CLAUDE.md, SKILL.md, MCP, hooks e gates de CI/CD.',
      artifactsLabel: 'artefatos',
      referencesLabel: 'referências',
    },
    mermaidDiagrams: {
      sectionLabel: 'Diagramas',
      title: 'Fluxos de governança e execução',
      description:
        'Visão unificada do fluxo de entrega: contrato técnico, execução assistida, gate de qualidade e release controlado.',
      diagramWorkflow: 'Fluxo de dev assistido por IA',
      diagramRules: 'Rules + Skills + MCP',
      diagramProgressive: 'Progressive Disclosure',
      diagramEvaluator: 'Padrão Evaluator-Optimizer',
    },
    ecosystemMap: {
      sectionLabel: 'Ecosystem',
      title: 'Mapa operacional de uma stack agêntica',
      description: 'Build define o que o agente sabe e pode. Ops é o ciclo de execução e validação.',
      filterAll: 'All',
      filterBuild: 'Build',
      filterOps: 'Ops',
      filterGroupLabel: 'Filtro do mapa',
      legendBuild: 'Build layer',
      legendExec: 'Execution layer',
      legendOps: 'Ops layer',
      captionAll: 'Stack completa: desde regras de projeto até release controlado.',
      captionBuild: 'Build layer: configura o que o agente sabe, pode fazer e como se comporta.',
      captionOps: 'Ops layer: ciclo de execução com gate de aprovação antes de todo release.',
    },
    stackCuration: {
      sectionLabel: 'Stack Curation',
      title: 'Curadoria técnica de ferramentas para IA Coding',
      description:
        'Critério de seleção: utilidade prática imediata, baixo risco operacional, documentação pública e curva de adoção compatível com times pequenos.',
      priorityLabel: 'Prioridade',
      priorityA: 'Adotar agora',
      priorityB: 'Referência complementar',
      priorityC: 'Fora do escopo',
    },
    methods: {
      sectionLabel: 'Métodos',
      title: 'Métodos técnicos aplicáveis no dia a dia',
      description:
        'Técnicas concretas para manter contexto limpo, controle de escopo e qualidade de output em ciclos de desenvolvimento assistido por IA.',
    },
    examples: {
      sectionLabel: 'Exemplos',
      title: 'Exemplos diretos e reutilizáveis',
      description:
        'Templates prontos para copiar, adaptar e usar em projetos reais. Cada exemplo resolve um problema específico de configuração ou contexto.',
      ex1Title: 'SKILL.md mínimo',
      ex2Title: 'Contexto mínimo viável',
      ex3Title: 'Injeção dinâmica de contexto',
      ex4Title: 'Heurísticas de contexto',
      ex4Items: [
        'Prompt > ~10k tokens → revisar escopo e aplicar PD.',
        'Follow-up piora qualidade → contexto poluído, resetar.',
        'Resposta genérica → adicionar projeto específico ou snippet.',
        'IA sai do escopo → reformular com in/out explícitos.',
        'Index primeiro, deep dive só sob demanda.',
      ],
      ex5Title: 'CLAUDE.md / AGENTS.md estrutura',
      ex6Title: 'Hook de pre-commit',
      ex7Title: 'Multi-agent: handoff via arquivo',
      ex8Title: 'XML tags: prompt estruturado (estilo Anthropic)',
    },
    reviewChecklist: {
      sectionLabel: 'Code Review Checklist',
      title: '10 gates antes de considerar pronto',
      description: 'Itens abertos viram ações antes do merge, não comentários para "resolver depois".',
      progress: (done: number, total: number) => `${done} / ${total} verificados`,
      allDone: 'Todos os gates atendidos. Pronto para merge.',
    },
    qualityMatrix: {
      sectionLabel: 'Matriz de qualidade',
      title: 'Gates para avaliação de interface e execução',
      description:
        'Referência objetiva: o que verificar, qual critério aplicar e como confirmar antes de considerar a entrega concluída.',
      headerGate: 'Gate',
      headerRule: 'Regra',
      headerVerify: 'Como verificar',
    },
    refs: {
      sectionLabel: 'Referências',
      title: 'Fontes técnicas para aprofundamento',
      description: 'Leituras recomendadas, priorizadas para aplicação prática, sem viés acadêmico.',
      groupSkills: 'Skills & Agents',
      groupMcp: 'MCP & Integração',
      groupPrompt: 'Prompt & Contexto',
      groupPlanExecute: 'Plan & Execute',
      groupEval: 'Eval & Qualidade',
      endTitle: 'Fim do material',
      endText:
        'A partir daqui, o próximo passo é aprofundar nas fontes originais e adaptar o stack ao seu contexto de projeto.',
    },
    footer: {
      tagline: 'guia de engenharia agêntica',
      copyCode: 'Copiar código',
      statsLabel: 'stats',
    },
  },
  en: {
    nav: {
      openNav: 'Open navigation',
      closeNav: 'Close',
      skipLink: 'Skip to content',
      navLabel: 'Main navigation',
      sectionNavLabel: 'Section navigation',
      langToggle: 'Mudar para Português',
      languageLabel: 'Language',
    },
    navItems: [
      { id: 'hero', label: 'Home' },
      { id: 'lesson-roadmap', label: 'Guide' },
      { id: 'vibecoding-vs-ai', label: 'Comparison' },
      { id: 'principles', label: 'Pillars' },
      { id: 'sdd', label: 'SDD' },
      { id: 'context-signals', label: 'Signals' },
      { id: 'progressive-disclosure', label: 'Progressive' },
      { id: 'layer-model', label: 'Layers' },
      { id: 'execution-flow', label: 'RPEV' },
      { id: 'workflow-gate', label: 'Workflow' },
      { id: 'multi-agent', label: 'Multi-Agent' },
      { id: 'anti-patterns', label: 'Anti-patterns' },
      { id: 'deep-dive', label: 'Deep Dive' },
      { id: 'mermaid-diagrams', label: 'Diagrams' },
      { id: 'ecosystem-map', label: 'Map' },
      { id: 'stack-curation', label: 'Stack' },
      { id: 'methods-core', label: 'Methods' },
      { id: 'examples', label: 'Examples' },
      { id: 'review-checklist', label: 'Checklist' },
      { id: 'refs', label: 'References' },
    ],
    hero: {
      eyebrow: 'Agentic Engineering',
      title: 'Agentic engineering',
      titleSpan: 'from concept to production',
      subtitle:
        'Technical foundations of AI Coding: context management, controlled execution, and multi-agent architecture.',
      metricsLabel: 'Guide highlights',
      metric1Label: 'spec before code',
      metric2Label: 'execution loop',
      metric3Label: 'beyond a single agent',
    },
    lessonRoadmap: {
      sectionLabel: 'Study Guide',
      title: 'Learning path',
      description:
        'Two progressive parts: from context engineering and execution fundamentals to safe refactoring and continuous quality in AI-assisted cycles.',
      topicsLabel: 'Topics covered',
      outcomesLabel: 'Expected outcomes',
    },
    vibecodeVsAI: {
      sectionLabel: 'Core Comparison',
      title: 'Vibecoding vs AI-Assisted Engineering',
      description:
        'Vibecoding is exploration. AI-Assisted Engineering is delivery. Knowing the difference is the first step.',
      definitionVibeTitle: 'Vibecoding',
      definitionVibeText:
        'Fast exploration mode for learning, prototyping, and testing local hypotheses without production commitment.',
      definitionAiTitle: 'AI-Assisted Engineering',
      definitionAiText:
        'Delivery mode with an explicit technical contract: context, scope, validation criteria, and review before merge.',
      definitionSourceLabel: 'Definition note',
      definitionSourceText:
        'These are authorial operational definitions for this material. Use them as shared language and adapt to your team context.',
      headerAspect: 'Aspect',
      headerVibe: 'Vibecoding',
      headerAI: 'AI-Assisted Engineering',
      ruleTitle: 'Practical rule',
      ruleText:
        "Vibecoding for prototypes and isolated exploration. AI-Assisted Engineering for any delivery that enters the team's history, touches production, or is reviewed by someone else.",
      riskHigh: 'High risk without process',
      riskMedium: 'Attention',
    },
    principles: {
      sectionLabel: 'Core Principles',
      title: 'Three principles that sustain AI Coding in production',
      description:
        'Before tools and techniques, these three pillars determine whether output ships with control or becomes silent rework.',
    },
    sdd: {
      sectionLabel: 'Spec-Driven Development',
      title: 'Specify before executing',
      description:
        'Defining context, scope, and criteria before executing separates controlled delivery from cascading rework.',
      why1Title: 'Criteria before code',
      why1Text: 'Without acceptance criteria defined before execution, "done" is an opinion, not a verifiable fact.',
      why2Title: 'Scope that prevents creep',
      why2Text:
        'The "out of scope" field is mandatory. It is what prevents the AI from expanding the work without an explicit request.',
      why3Title: 'Evidence closes the loop',
      why3Text: 'Without recorded evidence, there is no way to audit what was approved or safely roll back.',
      fieldKicker: (n: string, total: number) => `Field ${n} of ${total}`,
      exampleLabel: 'Example',
      antiPatternLabel: 'Anti-pattern',
      specWeakVsStrong: 'Weak spec vs strong spec',
      headerField: 'Field',
      headerWeak: 'Weak spec',
      headerStrong: 'Strong spec',
      exampleFullTitle: 'Filled-in example',
      exampleFullKicker: 'API /search performance',
      templateTitle: 'Blank template',
      templateKicker: 'copy and adapt',
    },
    contextSignals: {
      sectionLabel: 'Context Engineering',
      title: 'Signals of insufficient or polluted context',
      description:
        'Recognizing these signals before continuing saves time, reduces rework, and prevents context bugs from becoming product bugs.',
      badgeReset: 'Reset',
      badgeWarning: 'Attention',
      actionLabel: 'Action:',
    },
    progressiveDisclosure: {
      sectionLabel: 'Progressive Disclosure',
      title: 'Index first, detail on demand',
      description: 'Reduces context noise and mitigates the Lost in the Middle effect.',
      loadWhenLabel: 'Load when',
      workflowTitle: 'Standard workflow',
      workflowCode:
        'task → scan index (L1) → select relevant → load instructions (L2) → execute → deep dive on demand (L3)',
      workflowNote:
        'Each layer is only loaded when the previous one confirms relevance. Context cost is proportional to actual need.',
    },
    layerModel: {
      sectionLabel: 'Layer Model',
      title: 'Operational layers of the agentic stack',
      description:
        'Each layer has a single responsibility. Mixing concerns between layers is one of the most common causes of inconsistent agent behavior.',
      kicker: 'Selected layer',
    },
    executionFlow: {
      sectionLabel: 'Execution Flow · RPEV',
      title: 'Research → Plan → Execute → Verify',
      description:
        'Each phase has an input, output, and completion criteria. Without a verify gate, the cycle does not close.',
      kicker: 'Current phase',
    },
    workflowGate: {
      sectionLabel: 'AI-driven Workflow',
      title: 'Quality gate: plan → code → release',
      description: 'Each step has a gate before advancing: plan, validate, confirm.',
      kicker: 'Selected phase',
      checksLabel: 'Required checks',
      antiPatternLabel: 'Anti-pattern',
    },
    multiAgent: {
      sectionLabel: 'Multi-Agent Architectures',
      title: 'When one agent is not enough',
      description:
        'A single agent has real context and tool limits. Specialization and parallelism apply when the task complexity demands it.',
      limitsLabel: 'Signals to scale',
      limit1Number: 'scope',
      limit1Label: 'signals when to scale',
      limit1Desc:
        'Growing task complexity, domain breadth, or tool count are the real signals. There is no absolute threshold.',
      limit2Number: 'context',
      limit2Label: 'accumulates and degrades',
      limit2Desc: 'Too many interactions fill the context and compromise subsequent responses.',
      limit3Number: '1 prompt',
      limit3Label: 'cannot solve everything',
      limit3Desc: 'Domain specialization (coder, tester, researcher) outperforms a single generalist agent.',
      archsLabel: 'System architectures',
      patternsLabel: 'Execution patterns',
      patternsDesc: 'How agents execute and validate within any architecture.',
      commLabel: 'Communication patterns',
      whenLabel: 'When to use',
      tradeoffLabel: 'Trade-off',
      patternKicker: (letter: string) => `Pattern ${letter}`,
      reliabilityHigh: 'Prod-ready',
      reliabilityMedium: 'With care',
      reliabilityLow: 'Avoid prod',
      prosLabel: 'Advantages',
      consLabel: 'Disadvantages',
    },
    antiPatterns: {
      sectionLabel: 'Anti-patterns',
      title: 'What not to do and why',
      description:
        'AI accelerates mistakes as much as it accelerates successes. Recognizing these patterns early reduces the cost of correction.',
      consequenceLabel: 'Consequence',
      fixLabel: 'Fix',
      severityCritical: 'Critical',
      severityHigh: 'High',
      severityMedium: 'Medium',
    },
    deepDive: {
      sectionLabel: 'Technical Deep Dive',
      title: 'Practical architecture of the agentic stack',
      description:
        'Technical exploration of the components that make up a real agentic stack: CLAUDE.md, SKILL.md, MCP, hooks, and CI/CD gates.',
      artifactsLabel: 'artifacts',
      referencesLabel: 'references',
    },
    mermaidDiagrams: {
      sectionLabel: 'Diagrams',
      title: 'Governance and execution flows',
      description:
        'Unified delivery flow: technical contract, assisted execution, quality gate, and controlled release.',
      diagramWorkflow: 'AI-driven Dev Workflow',
      diagramRules: 'Rules + Skills + MCP',
      diagramProgressive: 'Progressive Disclosure',
      diagramEvaluator: 'Evaluator-Optimizer Pattern',
    },
    ecosystemMap: {
      sectionLabel: 'Ecosystem',
      title: 'Operational map of an agentic stack',
      description: 'Build defines what the agent knows and can do. Ops is the execution and validation cycle.',
      filterAll: 'All',
      filterBuild: 'Build',
      filterOps: 'Ops',
      filterGroupLabel: 'Map filter',
      legendBuild: 'Build layer',
      legendExec: 'Execution layer',
      legendOps: 'Ops layer',
      captionAll: 'Full stack: from project rules to controlled release.',
      captionBuild: 'Build layer: configures what the agent knows, can do, and how it behaves.',
      captionOps: 'Ops layer: execution cycle with approval gate before every release.',
    },
    stackCuration: {
      sectionLabel: 'Stack Curation',
      title: 'Technical curation of AI Coding tools',
      description:
        'Selection criteria: immediate practical value, low operational risk, public documentation, and adoption curve compatible with small teams.',
      priorityLabel: 'Priority',
      priorityA: 'Adopt now',
      priorityB: 'Complementary reference',
      priorityC: 'Out of scope',
    },
    methods: {
      sectionLabel: 'Methods',
      title: 'Technical methods applicable day-to-day',
      description:
        'Concrete techniques for keeping context clean, controlling scope, and maintaining output quality in AI-assisted development cycles.',
    },
    examples: {
      sectionLabel: 'Examples',
      title: 'Direct, reusable examples',
      description:
        'Ready-to-copy templates to adapt and use in real projects. Each example solves a specific configuration or context problem.',
      ex1Title: 'Minimal SKILL.md',
      ex2Title: 'Minimum viable context',
      ex3Title: 'Dynamic context injection',
      ex4Title: 'Context heuristics',
      ex4Items: [
        'Prompt > ~10k tokens → review scope and apply PD.',
        'Follow-up degrades quality → polluted context, reset.',
        'Generic response → add project-specific rules or a snippet.',
        'AI goes out of scope → reframe with explicit in/out.',
        'Index first, deep dive only on demand.',
      ],
      ex5Title: 'CLAUDE.md / AGENTS.md structure',
      ex6Title: 'Pre-commit hook',
      ex7Title: 'Multi-agent: handoff via file',
      ex8Title: 'XML tags: structured prompt (Anthropic style)',
    },
    reviewChecklist: {
      sectionLabel: 'Code Review Checklist',
      title: '10 gates before considering it done',
      description: 'Open items become actions before merge, not comments to "fix later".',
      progress: (done: number, total: number) => `${done} / ${total} verified`,
      allDone: 'All gates met. Ready to merge.',
    },
    qualityMatrix: {
      sectionLabel: 'Quality Matrix',
      title: 'Gates for interface and execution evaluation',
      description:
        'Objective reference: what to check, which criterion to apply, and how to confirm before considering the delivery complete.',
      headerGate: 'Gate',
      headerRule: 'Rule',
      headerVerify: 'How to verify',
    },
    refs: {
      sectionLabel: 'References',
      title: 'Technical sources for deeper learning',
      description: 'Recommended readings, prioritized for practical application, not for becoming an academic track.',
      groupSkills: 'Skills & Agents',
      groupMcp: 'MCP & Integration',
      groupPrompt: 'Prompt & Context',
      groupPlanExecute: 'Plan & Execute',
      groupEval: 'Eval & Quality',
      endTitle: 'End of material',
      endText:
        'From here, the next step is to go deeper into primary sources and adapt the stack to your project context.',
    },
    footer: {
      tagline: 'agentic engineering guide',
      copyCode: 'Copy code',
      statsLabel: 'stats',
    },
  },
}

/* ─── Data by language ───────────────────────────────────── */

export const LESSONS_DATA: Record<string, Lesson[]> = {
  'pt-BR': [
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
        'RPEV (Pesquisar → Planejar → Executar → Verificar)',
        'Stack agêntico na prática: MCP + Skills + AGENTS.md',
        'Comparação rápida de stacks (Claude / Cursor)',
        'Sinais de contexto insuficiente e gatilhos de replanning',
      ],
      outcomes: [
        'Estruturar um prompt com objetivo, escopo e critério de aceite',
        'Entender o papel de cada camada do stack agêntico',
        'Aplicar RPEV em uma tarefa real com verificação',
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
        'Loop de qualidade: validar → corrigir → repetir',
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
  ],
  en: [
    {
      id: 'part1',
      number: '01',
      date: '',
      tag: 'Fundamentals',
      title: 'Context Engineering and RPEV in Practice',
      objective: 'Minimal context structure, progressive disclosure, and the RPEV flow applied in real-world examples.',
      topics: [
        'Vibecoding vs AI-assisted development',
        'Minimum viable context to start a task',
        'Progressive Disclosure: layered loading',
        'RPEV (Research → Plan → Execute → Verify)',
        'Agentic stack in practice: MCP + Skills + AGENTS.md',
        'Quick stack comparison (Claude / Cursor)',
        'Insufficient context signals and replanning triggers',
      ],
      outcomes: [
        'Structure a prompt with objective, scope, and acceptance criteria',
        'Understand the role of each layer in the agentic stack',
        'Apply RPEV to a real task with validation',
      ],
    },
    {
      id: 'part2',
      number: '02',
      date: '',
      tag: 'Application',
      title: 'Safe Refactoring and Code Review in AI Coding',
      objective: 'AI-generated code review checklist, simplified SDD, and a continuous quality cycle.',
      topics: [
        'Code review checklist for AI output',
        'Assisted refactoring with incremental validation',
        'Quality loop: validate → fix → repeat',
        'Operational security: human approval for critical actions',
        'AI-assisted test generation and review',
        'Documentation and technical decision logging',
      ],
      outcomes: [
        'Review and approve AI-generated code with technical rigor',
        'Use SDD to organize specifications before executing',
        'Maintain a quality cycle in any AI-assisted delivery',
      ],
    },
  ],
}

export const COMPARISONS_DATA: Record<string, Comparison[]> = {
  'pt-BR': [
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
      risk: 'medium',
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
      risk: 'medium',
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
  ],
  en: [
    {
      aspect: 'Initial speed',
      vibecoding: 'Very high: generates and accepts immediately',
      aiAssisted: 'Deliberate: context + criteria before executing',
      risk: 'ok',
    },
    {
      aspect: 'Quality control',
      vibecoding: 'Minimal: trusts direct output',
      aiAssisted: 'Explicit: review, validate, approve before merge',
      risk: 'medium',
    },
    {
      aspect: 'Context provided',
      vibecoding: 'Casual: partial prompt, no criteria',
      aiAssisted: 'Structured: objective + scope + validation defined',
      risk: 'high',
    },
    {
      aspect: 'Execution mode',
      vibecoding: 'Accepts first output, no verification loop',
      aiAssisted: 'RPEV cycle: short increments with continuous verification',
      risk: 'medium',
    },
    {
      aspect: 'Rework rate',
      vibecoding: 'High: issues surface late, cost grows',
      aiAssisted: 'Low: early gates eliminate regression at the start',
      risk: 'high',
    },
    {
      aspect: 'Traceability',
      vibecoding: 'Low: implicit decisions, hard diff to review',
      aiAssisted: 'High: incremental diff, intent recorded',
      risk: 'medium',
    },
    {
      aspect: 'When to use',
      vibecoding: 'Prototypes, exploration, isolated proof of concept',
      aiAssisted: 'Production, shared codebase, real delivery',
      risk: 'ok',
    },
  ],
}

export const CONTEXT_SIGNALS_DATA: Record<string, ContextSignal[]> = {
  'pt-BR': [
    {
      signal: 'Resposta degrada a cada follow-up',
      meaning: 'Contexto está poluído com ruído acumulado',
      action: 'Iniciar nova sessão com contexto limpo e específico',
      type: 'error',
    },
    {
      signal: 'Equipe evita mexer em módulo recente gerado por IA',
      meaning: 'A base cresceu mais rápido que a compreensão compartilhada',
      action: 'Pausar merges em lote e revisar entendimento: objetivo, decisões e invariantes do módulo',
      type: 'error',
    },
    {
      signal: 'Review aprova sem explicar por que a mudança é segura',
      meaning: 'Validação superficial; dívida de compreensão em crescimento',
      action: 'Ativar Comprehension Gate: alguém precisa explicar impacto e rollback em até 60 segundos',
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
    {
      signal: 'IA alucina API ou método inexistente',
      meaning: 'Janela de contexto sem tipos, docs ou snippet real do projeto',
      action: 'Incluir interface TypeScript, assinatura real ou exemplo de uso como referência',
      type: 'error',
    },
    {
      signal: 'Respostas longas contradizem mensagens anteriores',
      meaning: 'Histórico extenso; início da sessão já saiu da janela ativa',
      action: 'Resetar e abrir novo chat com resumo compacto: objetivo + estado + regras',
      type: 'error',
    },
    {
      signal: 'IA ignora constraint declarado no início',
      meaning: 'Constraint perdido por volume de contexto intermediário',
      action: 'Repetir restrições críticas no prompt atual ou encurtar o histórico',
      type: 'warning',
    },
  ],
  en: [
    {
      signal: 'Response degrades with each follow-up',
      meaning: 'Context is polluted with accumulated noise',
      action: 'Start a new session with clean, specific context',
      type: 'error',
    },
    {
      signal: 'Team avoids touching a recent AI-generated module',
      meaning: 'The codebase grew faster than shared understanding',
      action: 'Pause bulk merges and review understanding: objective, decisions, and module invariants',
      type: 'error',
    },
    {
      signal: 'Review approves without explaining why the change is safe',
      meaning: 'Superficial validation; comprehension debt is growing',
      action: 'Enable a Comprehension Gate: someone must explain impact and rollback in up to 60 seconds',
      type: 'error',
    },
    {
      signal: 'AI implements outside the agreed scope',
      meaning: 'Objective or boundaries were not clear in the prompt',
      action: 'Reframe with explicit scope: "only X, not Y"',
      type: 'error',
    },
    {
      signal: 'Generic response with no project anchoring',
      meaning: 'Insufficient or missing project context',
      action: 'Include project rules, CLAUDE.md, or a relevant snippet',
      type: 'warning',
    },
    {
      signal: 'Prompt exceeds ~10k tokens',
      meaning: 'High volume; "Lost in the Middle" effect likely',
      action: 'Reduce scope, apply Progressive Disclosure',
      type: 'warning',
    },
    {
      signal: 'AI confirms but does not execute correctly',
      meaning: 'Ambiguous instruction or missing acceptance criteria',
      action: 'Define acceptance criteria before requesting execution',
      type: 'warning',
    },
    {
      signal: 'High response time + domain error',
      meaning: 'Initial load too heavy for the context window',
      action: 'Apply Discovery layer before loading everything',
      type: 'warning',
    },
    {
      signal: 'AI hallucinates non-existent API or method',
      meaning: 'Context window lacks project types, docs, or real snippets',
      action: 'Include TypeScript interface, real function signature, or usage example as reference',
      type: 'error',
    },
    {
      signal: 'Long responses contradict earlier messages',
      meaning: 'Session history too long; start of session already outside active window',
      action: 'Reset and open new chat with compact summary: objective + state + rules',
      type: 'error',
    },
    {
      signal: 'AI ignores constraint declared at session start',
      meaning: 'Constraint buried by intermediate context volume',
      action: 'Repeat critical constraints in the current prompt or shorten the history',
      type: 'warning',
    },
  ],
}

export const ANTI_PATTERNS_DATA: Record<string, AntiPattern[]> = {
  'pt-BR': [
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
    {
      id: 'ap7',
      category: 'Escopo',
      problem: 'Não declarar o campo "não entra" no prompt de implementação',
      consequence: 'IA preenche lacunas com suposições; entrega excede o escopo combinado.',
      fix: 'Todo prompt de implementação deve incluir o que está explicitamente fora do escopo.',
      severity: 'high',
    },
    {
      id: 'ap8',
      category: 'Decisão',
      problem: 'Usar saída da IA como justificativa de decisão arquitetural',
      consequence: '"A IA sugeriu" não é evidência. Decisões sem contexto real geram dívida técnica.',
      fix: 'IA dá opções; engenheiro decide com base em evidências, constraints reais e histórico do projeto.',
      severity: 'high',
    },
  ],
  en: [
    {
      id: 'ap1',
      category: 'Planning',
      problem: 'Starting directly in code without a technical contract',
      consequence: 'Implementation diverges from the real objective; high rework at the end.',
      fix: 'Declare scope, acceptance criteria, and risks before any execution.',
      severity: 'critical',
    },
    {
      id: 'ap2',
      category: 'Review',
      problem: 'Committing AI output without human review',
      consequence: 'Subtle bugs, security violations, and regressions enter the history.',
      fix: 'Read the full diff before every commit. AI generates hypotheses, not deliveries.',
      severity: 'critical',
    },
    {
      id: 'ap3',
      category: 'Pull Request',
      problem: 'Giant PR without incremental gate',
      consequence: 'Superficial review, merge conflicts, and bugs hard to isolate.',
      fix: 'Small PRs with readable diff and explicit approval at each delivery.',
      severity: 'high',
    },
    {
      id: 'ap4',
      category: 'Context',
      problem: 'Continuing a session with polluted context',
      consequence: 'Quality degrades progressively: AI misses domain and repeats errors.',
      fix: 'Reset context when degradation is detected. New chat with clean context.',
      severity: 'high',
    },
    {
      id: 'ap5',
      category: 'Validation',
      problem: 'Trusting a single automated reviewer',
      consequence: 'False sense of security; gaps stay hidden until production.',
      fix: 'CI green + human technical review = minimum completion condition.',
      severity: 'high',
    },
    {
      id: 'ap6',
      category: 'Autonomy',
      problem: 'Delegating an irreversible action without a confirmation gate',
      consequence: 'Deleted data, unplanned deploys, damage hard to reverse.',
      fix: 'Every critical action (push, rm, migrations) requires explicit human confirmation.',
      severity: 'critical',
    },
    {
      id: 'ap7',
      category: 'Scope',
      problem: 'Not declaring the "out of scope" field in the implementation prompt',
      consequence: 'AI fills gaps with assumptions; delivery exceeds the agreed scope.',
      fix: 'Every implementation prompt must include what is explicitly out of scope.',
      severity: 'high',
    },
    {
      id: 'ap8',
      category: 'Decision',
      problem: 'Using AI output as justification for architectural decisions',
      consequence: '"The AI suggested it" is not evidence. Decisions without real context create technical debt.',
      fix: 'AI provides options; engineer decides based on evidence, real constraints, and project history.',
      severity: 'high',
    },
  ],
}

export const PRINCIPLES_DATA: Record<string, Principle[]> = {
  'pt-BR': [
    {
      id: 'clarity',
      title: 'Clareza operacional',
      subtitle:
        'Encontrar informações relevantes para a próxima task e declarar explicitamente objetivo, restrições e estado final esperado.',
      icon: '◉',
      signal: 'Signal-first',
    },
    {
      id: 'progressive',
      title: 'Progressive Disclosure',
      subtitle:
        'Escolher quais arquivos e specs entram no contexto desta task. Contexto em excesso consome tokens e indica escopo mal definido.',
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
  ],
  en: [
    {
      id: 'clarity',
      title: 'Operational clarity',
      subtitle:
        'Find relevant information for the next task and state objective, constraints, and expected end state explicitly.',
      icon: '◉',
      signal: 'Signal-first',
    },
    {
      id: 'progressive',
      title: 'Progressive Disclosure',
      subtitle:
        'Choose which specs and files enter context for this task. Excess context burns tokens and usually signals poor scope definition.',
      icon: '◈',
      signal: 'Context discipline',
    },
    {
      id: 'verify',
      title: 'RPEV + Validate loop',
      subtitle: 'AI output without continuous verification is a hypothesis, not a delivery. Gate always active.',
      icon: '◍',
      signal: 'Execution discipline',
    },
  ],
}

export const PD_LAYERS_DATA: Record<string, ProgressiveLayer[]> = {
  'pt-BR': [
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
  ],
  en: [
    {
      id: 'pd1',
      name: 'Layer 1: Discovery',
      objective: 'Fast relevance decision with minimal context cost.',
      loadWhen: 'Always at the start of a task.',
      includes: ['Skill / resource name', 'One-line description', 'Metadata: type, cost, risk'],
      tokens: '~100 tokens',
    },
    {
      id: 'pd2',
      name: 'Layer 2: Activation',
      objective: 'Full instructions only for the selected item.',
      loadWhen: 'Only when the agent chooses a skill / resource.',
      includes: ['Execution rules', 'Expected parameters', 'Allowed tools'],
      tokens: '~2k–5k tokens',
    },
    {
      id: 'pd3',
      name: 'Layer 3: Execution',
      objective: 'Heavy material on demand, without polluting the main context.',
      loadWhen: 'Only when execution requires it.',
      includes: ['Scripts', 'Examples', 'Long docs', 'Edge cases'],
      tokens: 'Zero until activated',
    },
  ],
}

export const LAYERS_DATA: Record<string, Layer[]> = {
  'pt-BR': [
    {
      id: 'user',
      label: 'Intenção do usuário',
      summary: 'Objetivo, restrições e critério de aceite.',
      chips: ['escopo', 'aceite'],
      facts: [
        'Sem objetivo explícito, o agente otimiza para velocidade, não para qualidade.',
        'Critério de aceite antes de codar reduz retrabalho em cascata.',
        'Contexto mínimo viável é a base de confiabilidade da resposta.',
      ],
    },
    {
      id: 'project-context',
      label: 'Regras do projeto',
      summary: 'Contrato local em AGENTS.md / CLAUDE.md + regras.',
      chips: ['governança', 'padrões'],
      facts: [
        'Contrato de projeto evita divergência de arquitetura e estilo entre sessões.',
        'Regras curtas e objetivas têm maior aderência do agente que documentação longa.',
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
      label: 'Verificação',
      summary: 'Gate de validação antes de considerar qualquer entrega como pronta.',
      chips: ['check', 'review'],
      facts: [
        'Loop mínimo: validar → corrigir → repetir. Nunca pular em código crítico.',
        'Ações destrutivas (push, delete, migration) exigem confirmação humana explícita.',
        'CI verde + revisão técnica humana = condição necessária de conclusão.',
      ],
    },
  ],
  en: [
    {
      id: 'user',
      label: 'User Intent',
      summary: 'Objective, constraints, and acceptance criteria.',
      chips: ['scope', 'acceptance'],
      facts: [
        'Without an explicit objective, the agent optimizes for speed, not quality.',
        'Acceptance criteria before coding reduces cascading rework.',
        'Minimum viable context is the reliability baseline for any response.',
      ],
    },
    {
      id: 'project-context',
      label: 'Project Rules',
      summary: 'Local contract in AGENTS.md / CLAUDE.md + rules.',
      chips: ['governance', 'standards'],
      facts: [
        'A project contract prevents architecture and style divergence across sessions.',
        'Short, objective rules have better agent adherence than long docs.',
        'Without a contract, each session reinvents critical decisions inconsistently.',
      ],
    },
    {
      id: 'skills',
      label: 'Skills',
      summary: 'Reusable, auditable know-how: SKILL.md + scripts/ + references/.',
      chips: ['workflow', 'reuse'],
      facts: [
        'A robust skill clearly defines input, operational limits, and expected output.',
        'scripts/ concentrates deterministic execution; references/ loads context on demand.',
        '$ARGUMENTS and $ARGUMENTS[N] enable dynamic skill parameterization.',
      ],
    },
    {
      id: 'mcp',
      label: 'MCP',
      summary: 'Access to external data and tools with traceability.',
      chips: ['integration', 'access'],
      facts: [
        'MCP separates "how to do" (skill) from "where to act" (data or tool access).',
        'External connections require explicit authentication and a defined permission gate.',
        'Without MCP, the agent is a local generator; with MCP, it is an operator with real access.',
      ],
    },
    {
      id: 'verification',
      label: 'Verification',
      summary: 'Validation gate before considering any delivery complete.',
      chips: ['check', 'review'],
      facts: [
        'Minimum loop: validate → fix → repeat. Never skip on critical code.',
        'Destructive actions (push, delete, migration) require explicit human confirmation.',
        'CI green + human technical review = necessary condition for completion.',
      ],
    },
  ],
}

type EcosystemMapNode = {
  id: string
  level: 'top' | 'mid' | 'bot'
  label: string
  detail: string
}

export const ECOSYSTEM_MAP_NODES_DATA: Record<string, EcosystemMapNode[]> = {
  'pt-BR': [
    { id: 'rules', level: 'top', label: 'regras', detail: 'CLAUDE.md' },
    { id: 'skills', level: 'top', label: 'skills', detail: 'SKILL.md' },
    { id: 'mcp', level: 'top', label: 'mcp', detail: 'acesso tools' },
    { id: 'hooks', level: 'top', label: 'hooks', detail: 'controle loop' },
    { id: 'research', level: 'mid', label: 'pesquisa', detail: 'mapear estado' },
    { id: 'plan', level: 'mid', label: 'plano', detail: 'definir passos' },
    { id: 'execute', level: 'mid', label: 'execução', detail: 'aplicar mudanças' },
    { id: 'verify', level: 'mid', label: 'verificação', detail: 'validar' },
    { id: 'review', level: 'bot', label: 'revisão', detail: 'olhar humano' },
    { id: 'approval', level: 'bot', label: 'aprovação', detail: 'gate' },
    { id: 'release', level: 'bot', label: 'release', detail: 'controlado' },
  ],
  en: [
    { id: 'rules', level: 'top', label: 'rules', detail: 'CLAUDE.md' },
    { id: 'skills', level: 'top', label: 'skills', detail: 'SKILL.md' },
    { id: 'mcp', level: 'top', label: 'mcp', detail: 'tool access' },
    { id: 'hooks', level: 'top', label: 'hooks', detail: 'loop control' },
    { id: 'research', level: 'mid', label: 'research', detail: 'map state' },
    { id: 'plan', level: 'mid', label: 'plan', detail: 'define steps' },
    { id: 'execute', level: 'mid', label: 'execute', detail: 'apply changes' },
    { id: 'verify', level: 'mid', label: 'verify', detail: 'validate' },
    { id: 'review', level: 'bot', label: 'review', detail: 'human eye' },
    { id: 'approval', level: 'bot', label: 'approval', detail: 'gate' },
    { id: 'release', level: 'bot', label: 'release', detail: 'controlled' },
  ],
}

export const FLOW_DATA: Record<string, FlowStep[]> = {
  'pt-BR': [
    {
      id: 'research',
      label: 'Pesquisar',
      summary: 'Mapeia estado, arquivos críticos e risco.',
      detail:
        'Identificar contexto útil, restrições reais e dependências antes de qualquer alteração. Registrar o que está faltando para execução segura.',
      payload: 'entrada: objetivo + limites + estado atual do projeto',
    },
    {
      id: 'plan',
      label: 'Planejar',
      summary: 'Quebra em passos verificáveis com critério de aceite.',
      detail:
        'Definir etapas pequenas, cada uma com critério de aceite claro e fallback definido. Plano é contrato técnico, não lista de desejos.',
      payload: 'saída: plano técnico + critérios por etapa',
    },
    {
      id: 'execute',
      label: 'Executar',
      summary: 'Implementa em incrementos curtos e rastreáveis.',
      detail:
        'Alterações rastreáveis para minimizar custo de correção. Revisar cada bloco antes de avançar. Sem commits em massa sem revisão.',
      payload: 'saída: diff incremental + rastreabilidade',
    },
    {
      id: 'verify',
      label: 'Verificar',
      summary: 'Valida comportamento, qualidade e critérios.',
      detail:
        'Executar lint, typecheck, build, testes e revisão orientada a risco. Sem evidência de aprovação, ciclo reinicia.',
      payload: 'gate: aprovação por evidências | CI + revisão humana',
    },
  ],
  en: [
    {
      id: 'research',
      label: 'Research',
      summary: 'Maps state, critical files, and risk.',
      detail:
        'Identify useful context, real constraints, and dependencies before any change. Record what is missing for safe execution.',
      payload: 'input: objective + limits + current project state',
    },
    {
      id: 'plan',
      label: 'Plan',
      summary: 'Breaks down into verifiable steps with acceptance criteria.',
      detail:
        'Define small steps, each with a clear acceptance criterion and defined fallback. The plan is a technical contract, not a wish list.',
      payload: 'output: technical plan + criteria per step',
    },
    {
      id: 'execute',
      label: 'Execute',
      summary: 'Implements in short, traceable increments.',
      detail:
        'Traceable changes to minimize the cost of correction. Review each block before advancing. No bulk commits without review.',
      payload: 'output: incremental diff + traceability',
    },
    {
      id: 'verify',
      label: 'Verify',
      summary: 'Validates behavior, quality, and criteria.',
      detail:
        'Run lint, typecheck, build, tests, and risk-oriented review. Without approval evidence, the cycle restarts.',
      payload: 'gate: evidence-based approval | CI + human review',
    },
  ],
}

export const METHODS_DATA: Record<string, MethodCard[]> = {
  'pt-BR': [
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
        'Verificação contínua: validar → corrigir → repetir.',
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
    {
      id: 'comprehension-gate',
      title: 'Comprehension Gate',
      summary: 'Sem entendimento explícito, não há merge seguro.',
      bullets: [
        'Alguém do time explica a mudança em 60 segundos sem ler o diff.',
        'Decisões implícitas da IA (trade-offs, edge cases, defaults) viram texto explícito.',
        'Definir dono claro de manutenção antes de liberar para produção.',
      ],
    },
    {
      id: 'context-reset',
      title: 'Context Reset',
      summary: 'Saber quando e como reiniciar o contexto para manter qualidade.',
      bullets: [
        'Degradação de qualidade = sinal imediato de reset.',
        'Novo chat com contexto compacto: objetivo + regras + estado atual.',
        'Nunca arrastar histórico longo apenas para "manter continuidade".',
      ],
    },
  ],
  en: [
    {
      id: 'context-minimo',
      title: 'Minimum viable context',
      summary: 'Define problem, scope, and validation before execution.',
      bullets: [
        'Explicit objective in one sentence, not a conversation.',
        'Acceptance criteria: what defines "done" before starting.',
        'Bounded scope: what is in and what is explicitly out.',
      ],
    },
    {
      id: 'progressive-disclosure',
      title: 'Progressive Disclosure',
      summary: 'Layered loading without polluting the context window.',
      bullets: [
        'Discovery: lightweight index with metadata (~100 tokens).',
        'Activation: full instructions only for the selected item.',
        'Execution: deep dive only when the task requires it.',
      ],
    },
    {
      id: 'sdd-rpev',
      title: 'SDD + RPEV',
      summary: 'Short spec and disciplined execution in a closed cycle.',
      bullets: [
        'Plan as a technical contract, not a vague guide.',
        'Execution in small steps with a reviewable diff.',
        'Continuous verify: validate → fix → repeat.',
      ],
    },
    {
      id: 'review-loop',
      title: 'CI + AI Review Loop',
      summary: 'Quality pipeline: CI, review, and iterative correction.',
      bullets: [
        'Small, auditable PR: enables real review.',
        'Conflicting feedback requires multi-source validation.',
        'Merge only after the approval gate is explicitly met.',
      ],
    },
    {
      id: 'comprehension-gate',
      title: 'Comprehension Gate',
      summary: 'Without explicit understanding, there is no safe merge.',
      bullets: [
        'Someone on the team explains the change in 60 seconds without reading the diff.',
        'Implicit AI decisions (trade-offs, edge cases, defaults) are made explicit in text.',
        'Define a clear maintenance owner before releasing to production.',
      ],
    },
    {
      id: 'context-reset',
      title: 'Context Reset',
      summary: 'Know when and how to restart context to maintain quality.',
      bullets: [
        'Quality degradation = immediate reset signal.',
        'New chat with compact context: objective + rules + current state.',
        'Never drag a long history just to "maintain continuity".',
      ],
    },
  ],
}

export const QUALITY_ROWS_DATA: Record<string, QualityRow[]> = {
  'pt-BR': [
    {
      gate: 'Intenção primária',
      rule: 'Objetivo principal deve ser identificado em segundos.',
      verify: 'Usuário identifica estado e próxima ação sem explicação externa.',
    },
    {
      gate: 'Contexto progressivo',
      rule: 'Detalhes avançados só aparecem quando necessários.',
      verify: 'Contexto inicial curto, com expansão controlada sob demanda.',
    },
    {
      gate: 'Segurança de execução',
      rule: 'Ações críticas exigem confirmação humana explícita.',
      verify: 'Fluxo com gate antes de qualquer ação irreversível.',
    },
    {
      gate: 'Loop de validação',
      rule: 'Nenhuma entrega sem validação baseada em evidências.',
      verify: 'CI verde + revisão técnica humana registrada.',
    },
    {
      gate: 'Compreensão verificável',
      rule: 'A mudança precisa ser explicável por humano, não apenas executável por máquina.',
      verify: 'Uma pessoa descreve objetivo, impacto e rollback sem depender do diff completo.',
    },
  ],
  en: [
    {
      gate: 'Primary intent',
      rule: 'Main objective must be identified in seconds.',
      verify: 'User identifies state and next action without external explanation.',
    },
    {
      gate: 'Progressive context',
      rule: 'Advanced details only appear when needed.',
      verify: 'Short initial context, with controlled expansion on demand.',
    },
    {
      gate: 'Execution safety',
      rule: 'Critical actions require explicit human confirmation.',
      verify: 'Flow with gate before any irreversible action.',
    },
    {
      gate: 'Validation loop',
      rule: 'No delivery without evidence-based verify.',
      verify: 'CI green + human technical review recorded.',
    },
    {
      gate: 'Verifiable comprehension',
      rule: 'The change must be explainable by a human, not only executable by a machine.',
      verify: 'One person describes objective, impact, and rollback without depending on the full diff.',
    },
  ],
}

export const REVIEW_CHECKLIST_DATA: Record<string, ChecklistItem[]> = {
  'pt-BR': [
    { item: 'Código atende o objetivo funcional definido?', category: 'Funcional' },
    { item: 'Escopo combinado foi respeitado sem desvio?', category: 'Escopo' },
    { item: 'Há risco de regressão comportamental?', category: 'Risco' },
    { item: 'Nomes, estruturas e padrões são consistentes com o projeto?', category: 'Qualidade' },
    { item: 'Há código morto, duplicação ou geração desnecessária?', category: 'Qualidade' },
    { item: 'Segurança e privacidade foram preservadas?', category: 'Segurança' },
    { item: 'Testes mínimos foram adicionados ou atualizados?', category: 'Testes' },
    { item: 'A decisão técnica foi documentada?', category: 'Documentação' },
    { item: 'O diff é claro para outro revisor entender sem contexto externo?', category: 'Revisão' },
    { item: 'Pelo menos uma pessoa consegue explicar a mudança em até 60 segundos?', category: 'Compreensão' },
    { item: 'Trade-offs e decisões implícitas da IA foram explicitados?', category: 'Compreensão' },
    { item: 'Há dono claro para manutenção deste trecho após merge?', category: 'Responsabilidade' },
    { item: 'Existe plano de rollback se algo falhar?', category: 'Segurança' },
  ],
  en: [
    { item: 'Does the code meet the defined functional objective?', category: 'Functional' },
    { item: 'Was the agreed scope respected without deviation?', category: 'Scope' },
    { item: 'Is there a risk of behavioral regression?', category: 'Risk' },
    { item: 'Are names, structures, and patterns consistent with the project?', category: 'Quality' },
    { item: 'Is there dead code, duplication, or unnecessary generation?', category: 'Quality' },
    { item: 'Were security and privacy preserved?', category: 'Security' },
    { item: 'Were minimal tests added or updated?', category: 'Tests' },
    { item: 'Was the technical decision documented?', category: 'Docs' },
    { item: 'Is the diff clear enough for another reviewer without external context?', category: 'Review' },
    { item: 'Can at least one person explain the change in up to 60 seconds?', category: 'Comprehension' },
    { item: 'Were implicit AI trade-offs and decisions made explicit?', category: 'Comprehension' },
    { item: 'Is there a clear owner for maintaining this area after merge?', category: 'Ownership' },
    { item: 'Is there a rollback plan if something fails?', category: 'Security' },
  ],
}

export const DEEP_DIVES_DATA: Record<string, DeepDive[]> = {
  'pt-BR': [
    {
      id: 'dd1',
      title: 'Arquitetura de skills',
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
      title: 'Integração MCP',
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
      title: 'Pipeline de validação',
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
      tree: [
        '.claude/',
        '├── CLAUDE.md',
        '├── settings.json',
        '├── rules/',
        '├── skills/',
        '├── agents/',
        '└── hooks/',
      ],
      links: [
        { label: 'Claude Code Docs', href: 'https://docs.anthropic.com/claude-code' },
        { label: 'Context7 MCP', href: 'https://context7.com' },
      ],
    },
  ],
  en: [
    {
      id: 'dd1',
      title: 'Skill Architecture',
      description:
        'SKILL.md defines behavior and control frontmatter; scripts/ ensures determinism for heavy logic; references/ extends context without inflating the main prompt.',
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
        'MCP connects the agent to the external world with access control, authentication, and traceability. It transforms the agent from a local generator into an operator with real data and tool access.',
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
        'Robust quality pipeline: tests + lint + typecheck + CI + review + fix loop. No delivery is final without explicit approval evidence at every gate.',
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
        'The .claude/ folder is the operational contract between agent and project. Clarity and modularity are inversely proportional to rework and risk.',
      artifacts: ['CLAUDE.md', 'settings.json', 'rules/', 'skills/', 'agents/', 'hooks/'],
      tree: [
        '.claude/',
        '├── CLAUDE.md',
        '├── settings.json',
        '├── rules/',
        '├── skills/',
        '├── agents/',
        '└── hooks/',
      ],
      links: [
        { label: 'Claude Code Docs', href: 'https://docs.anthropic.com/claude-code' },
        { label: 'Context7 MCP', href: 'https://context7.com' },
      ],
    },
  ],
}

export const WORKFLOW_PHASES_DATA: Record<string, WorkflowPhase[]> = {
  'pt-BR': [
    {
      id: 'wf-plan',
      step: '0',
      title: 'Planejamento primeiro',
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
      id: 'wf-comprehension',
      step: '7.5',
      title: 'Gate de compreensão',
      objective: 'Confirmar entendimento humano antes de merge/release.',
      checks: [
        'Alguém explica objetivo + impacto em até 60s',
        'Decisões implícitas documentadas (trade-offs/edge cases)',
        'Dono de manutenção definido',
      ],
      antiPattern: 'Aprovar porque "CI está verde" sem entender comportamento e impacto.',
    },
    {
      id: 'wf-release',
      step: '8-10',
      title: 'Gate de verificação + release',
      objective: 'Separar "concluído" de "publicado" com gate final explícito.',
      checks: ['Gate de verificação atendido', 'Rollback definido', 'Release controlado'],
      antiPattern: 'Merge/release automático sem checagem final.',
    },
  ],
  en: [
    {
      id: 'wf-plan',
      step: '0',
      title: 'Planning First',
      objective: 'Declare scope, acceptance criteria, and risks before coding.',
      checks: ['Explicit plan with steps', 'Acceptance criteria defined', 'Bounded scope (in/out)'],
      antiPattern: 'Starting directly in code without a technical contract.',
    },
    {
      id: 'wf-setup',
      step: '1',
      title: 'Work isolation',
      objective: 'Create branch/worktree to avoid impacting the baseline.',
      checks: ['1 feature = 1 branch', 'Descriptive naming', 'Clean environment'],
      antiPattern: 'Implementing in a shared context without isolation.',
    },
    {
      id: 'wf-exec',
      step: '2',
      title: 'Assisted implementation',
      objective: 'Code with AI in small blocks, reviewing before each commit.',
      checks: ['Incremental diff', 'Critical reading of output', 'Traceability maintained'],
      antiPattern: 'Committing AI output without human review.',
    },
    {
      id: 'wf-validate',
      step: '3-4',
      title: 'Local validation + pre-flight',
      objective: 'Run tests, lint, and initial review before opening a PR.',
      checks: ['Local tests passing', 'Lint/format without errors', 'Pre-flight review done'],
      antiPattern: 'Pushing a PR with unverified basic failures.',
    },
    {
      id: 'wf-loop',
      step: '5-7',
      title: 'CI + review loop',
      objective: 'Iterate CI/review/fix until real approval with evidence.',
      checks: ['CI green', 'Feedback incorporated', 'Explicit approval recorded'],
      antiPattern: 'Ignoring feedback or closing the loop without approval evidence.',
    },
    {
      id: 'wf-comprehension',
      step: '7.5',
      title: 'Comprehension gate',
      objective: 'Confirm human understanding before merge/release.',
      checks: [
        'Someone explains objective + impact in up to 60s',
        'Implicit decisions documented (trade-offs/edge cases)',
        'Maintenance owner defined',
      ],
      antiPattern: 'Approving because "CI is green" without understanding behavior and impact.',
    },
    {
      id: 'wf-release',
      step: '8-10',
      title: 'Verification gate + release',
      objective: 'Separate "completed" from "published" with an explicit final gate.',
      checks: ['Verification gate met', 'Rollback defined', 'Controlled release'],
      antiPattern: 'Automatic merge/release without a final check.',
    },
  ],
}

export const STACK_TOOLS_DATA: Record<string, StackTool[]> = {
  'pt-BR': [
    {
      name: 'anthropics/skills',
      type: 'Skills',
      why: 'Repositório oficial de skills prontas para Claude Code',
      priority: 'A',
    },
    { name: 'Context7', type: 'MCP', why: 'Docs de libs em tempo real no contexto do agente', priority: 'A' },
    {
      name: 'github/spec-kit',
      type: 'Spec',
      why: 'Spec-driven development com integração direta ao agente',
      priority: 'A',
    },
    {
      name: 'vercel-labs/skills',
      type: 'Skills',
      why: 'Skills complementares mantidas por time de produto',
      priority: 'A',
    },
    { name: 'Tavily', type: 'MCP', why: 'Search contextual para research em tempo de execução', priority: 'B' },
    {
      name: 'Superpowers',
      type: 'IDE',
      why: 'IDE agêntica com suporte a Claude e integração direta a projetos',
      priority: 'B',
    },
    {
      name: 'promptfoo/promptfoo',
      type: 'Eval',
      why: 'Avaliação e segurança em fluxos de IA: testes de saída',
      priority: 'B',
    },
    {
      name: 'pydantic/pydantic-ai',
      type: 'Framework',
      why: 'Tipagem e confiabilidade em agentes Python',
      priority: 'B',
    },
    {
      name: 'n8n-io/n8n',
      type: 'Integração',
      why: 'Automação e integração de workflows com suporte a agentes',
      priority: 'B',
    },
    {
      name: 'Stacks massivas sem critério',
      type: 'Risco',
      why: 'Volume sem validação aumenta risco e manutenção',
      priority: 'C',
    },
    {
      name: 'Infra avançada sem necessidade',
      type: 'Risco',
      why: 'RAG/agent mesh exige pré-requisito avançado',
      priority: 'C',
    },
    {
      name: 'Automação stealth (evasão)',
      type: 'Risco',
      why: 'Fora do escopo: sem auditabilidade ou segurança',
      priority: 'C',
    },
    {
      name: 'Arquitetura guiada por leak',
      type: 'Risco',
      why: 'Decisão baseada em vazamento e rumor cria stack frágil e sem contrato de manutenção',
      priority: 'C',
    },
  ],
  en: [
    {
      name: 'anthropics/skills',
      type: 'Skills',
      why: 'Official repository of ready-made skills for Claude Code',
      priority: 'A',
    },
    { name: 'Context7', type: 'MCP', why: 'Real-time library docs injected into agent context', priority: 'A' },
    {
      name: 'github/spec-kit',
      type: 'Spec',
      why: 'Spec-driven development with direct agent integration',
      priority: 'A',
    },
    {
      name: 'vercel-labs/skills',
      type: 'Skills',
      why: 'Complementary skills maintained by a product team',
      priority: 'A',
    },
    { name: 'Tavily', type: 'MCP', why: 'Contextual search for research at execution time', priority: 'B' },
    {
      name: 'Superpowers',
      type: 'IDE',
      why: 'Agentic IDE with Claude support and direct project integration',
      priority: 'B',
    },
    {
      name: 'promptfoo/promptfoo',
      type: 'Eval',
      why: 'Evaluation and security for AI flows: output testing',
      priority: 'B',
    },
    { name: 'pydantic/pydantic-ai', type: 'Framework', why: 'Typing and reliability for Python agents', priority: 'B' },
    {
      name: 'n8n-io/n8n',
      type: 'Integration',
      why: 'Workflow automation and integration with agent support',
      priority: 'B',
    },
    {
      name: 'Massive stacks without criteria',
      type: 'Risk',
      why: 'Volume without validation increases risk and maintenance',
      priority: 'C',
    },
    {
      name: 'Advanced infra without necessity',
      type: 'Risk',
      why: 'RAG/agent mesh requires advanced prerequisites',
      priority: 'C',
    },
    {
      name: 'Stealth automation (evasion)',
      type: 'Risk',
      why: 'Out of scope: no auditability or security',
      priority: 'C',
    },
    {
      name: 'Leak-driven architecture',
      type: 'Risk',
      why: 'Designing from leaks and rumors creates fragile systems with no maintenance contract',
      priority: 'C',
    },
  ],
}

export const SDD_FIELDS_DATA: Record<string, SddField[]> = {
  'pt-BR': [
    {
      id: 'context',
      number: '1',
      name: 'Contexto',
      description: 'Qual problema precisa ser resolvido, quem é afetado e quais são as restrições técnicas reais.',
      detail:
        'Contexto fraco gera objetivo vago. Sem saber quem é afetado, o critério de sucesso fica em aberto. Restrições técnicas definem o que é viável antes de qualquer plano.',
      example:
        'A função parseDate() lança exceção para entradas vazias. Afeta todos os forms do app. Restrição: manter a assinatura atual.',
      antiPattern:
        '"Está lento." : descrever sintoma sem local, impacto ou hipótese. Melhor: informar onde ocorre, qual fluxo dispara e quais limites precisam ser preservados.',
    },
    {
      id: 'objective',
      number: '2',
      name: 'Objetivo',
      description: 'O resultado esperado em uma frase. O que "pronto" significa, antes de escrever uma linha.',
      detail:
        'Um objetivo mensurável é o que separa entrega de opinião. Se não der para verificar se o objetivo foi atingido, ele é fraco.',
      example: 'parseDate() retorna null para entradas inválidas sem lançar exceção.',
      antiPattern: '"Melhorar a experiência do usuário." : Não é verificável. Não tem critério.',
    },
    {
      id: 'scope',
      number: '3',
      name: 'Escopo',
      description: 'O que entra e o que explicitamente não entra. Ambos os lados são obrigatórios.',
      detail:
        'Escopo sem o "não entra" é incompleto. É o "não entra" que previne scope creep e garante que a IA não expanda o trabalho sem pedido.',
      example: 'Entra: parseDate() em utils/date.ts. Não entra: outras funções do arquivo, validações de formato.',
      antiPattern: '"Escopo: tudo que for lento." : Sem limite, a IA vai otimizar tudo e sair do objetivo.',
    },
    {
      id: 'criteria',
      number: '4',
      name: 'Critérios de validação',
      description: 'Critérios verificáveis definidos ANTES da execução. São o contrato de aprovação da entrega.',
      detail:
        'Critérios definidos depois da execução são post-hoc rationalization. Eles precisam existir antes para que o agente (e o revisor) saibam o que aprovar.',
      example:
        "parseDate('') = null. parseDate('invalid') = null. parseDate('2024-01-15') = Date válido. Testes existentes passam sem modificação.",
      antiPattern: '"Deve funcionar corretamente." : Correto segundo quem? Com qual input? Verificado como?',
    },
    {
      id: 'plan',
      number: '5',
      name: 'Plano RPEV',
      description: 'Research, Plan, Execute e Verify definidos antes de iniciar qualquer código.',
      detail:
        'O plano não é o código: é o mapa de como chegar lá. Research evita implementar em cima de mal-entendidos. Verify define o gate de conclusão.',
      example:
        'Research: ler parseDate() e testes atuais. Plan: guard clause para empty/null. Execute: implementar em utils/date.ts. Verify: rodar testes + lint + revisar diff.',
      antiPattern: 'Pular Research e ir direto ao Execute. O agente assume estado que não entende.',
    },
    {
      id: 'evidence',
      number: '6',
      name: 'Evidências',
      description: 'Registro dos critérios atendidos, exemplos e links. Fechamento do ciclo com prova.',
      detail:
        'Sem evidências, "pronto" é uma afirmação. Com evidências, é um fato verificável. Esse campo fecha o loop e permite auditoria futura.',
      example:
        'Critérios 1-4 atendidos. Testes: 42/42 passando. PR aprovado por revisor humano. Link: github.com/repo/pull/42.',
      antiPattern: 'Marcar como pronto sem registrar o que foi verificado. Não tem rollback se precisar reverter.',
    },
  ],
  en: [
    {
      id: 'context',
      number: '1',
      name: 'Context',
      description: 'What problem needs solving, who is affected, and what the real technical constraints are.',
      detail:
        'Weak context produces a vague objective. Without knowing who is affected, the success criterion stays open. Technical constraints define what is viable before any plan.',
      example:
        'The parseDate() function throws on empty inputs. Affects all app forms. Constraint: preserve the current signature.',
      antiPattern:
        '"It is slow." : symptom only, without location, impact, or hypothesis. Better: where it happens, which flow triggers it, and what constraints must hold.',
    },
    {
      id: 'objective',
      number: '2',
      name: 'Objective',
      description: 'The expected result in one sentence. What "done" means before writing a single line.',
      detail:
        'A measurable objective is what separates delivery from opinion. If you cannot verify whether the objective was met, it is weak.',
      example: 'parseDate() returns null for invalid inputs without throwing an exception.',
      antiPattern: '"Improve the user experience." : Not verifiable. Has no criterion.',
    },
    {
      id: 'scope',
      number: '3',
      name: 'Scope',
      description: 'What is in and what is explicitly out. Both sides are mandatory.',
      detail:
        'Scope without the "out of scope" is incomplete. The "out of scope" is what prevents scope creep and ensures the AI does not expand the work without a request.',
      example: 'In: parseDate() in utils/date.ts. Out: other functions in the file, format validations.',
      antiPattern:
        '"Scope: everything that is slow." : Without a limit, the AI will optimize everything and drift from the objective.',
    },
    {
      id: 'criteria',
      number: '4',
      name: 'Validation criteria',
      description: 'Verifiable criteria defined BEFORE execution. They are the delivery approval contract.',
      detail:
        'Criteria defined after execution are post-hoc rationalization. They must exist beforehand so the agent (and the reviewer) know what to approve.',
      example:
        "parseDate('') = null. parseDate('invalid') = null. parseDate('2024-01-15') = valid Date. Existing tests pass without modification.",
      antiPattern: '"It must work correctly." : Correct according to whom? With what input? Verified how?',
    },
    {
      id: 'plan',
      number: '5',
      name: 'RPEV Plan',
      description: 'Research, Plan, Execute, and Verify defined before starting any code.',
      detail:
        'The plan is not the code: it is the map of how to get there. Research prevents implementing on top of misunderstandings. Verify defines the completion gate.',
      example:
        'Research: read parseDate() and current tests. Plan: guard clause for empty/null. Execute: implement in utils/date.ts. Verify: run tests + lint + review diff.',
      antiPattern: 'Skipping Research and going straight to Execute. The agent assumes state it does not understand.',
    },
    {
      id: 'evidence',
      number: '6',
      name: 'Evidence',
      description: 'Record of criteria met, examples, and links. Closing the cycle with proof.',
      detail:
        'Without evidence, "done" is an assertion. With evidence, it is a verifiable fact. This field closes the loop and enables future auditing.',
      example: 'Criteria 1-4 met. Tests: 42/42 passing. PR approved by human reviewer. Link: github.com/repo/pull/42.',
      antiPattern: 'Marking as done without recording what was verified. No rollback if you need to revert.',
    },
  ],
}

export const SDD_SPEC_ROWS_DATA: Record<string, SddSpecRow[]> = {
  'pt-BR': [
    {
      field: 'Contexto',
      weak: '"Sistema lento em alguns momentos"',
      strong: '"Busca de usuários expira para queries > 3 chars no plano Enterprise. Restrição: sem schema change."',
    },
    {
      field: 'Objetivo',
      weak: '"Melhorar a performance do sistema"',
      strong: '"Reduzir p95 de /api/search de 1800ms para <400ms"',
    },
    {
      field: 'Escopo',
      weak: '"Tudo que estiver lento"',
      strong: '"Apenas query builder + índice. Não entra: cache layer, auth"',
    },
    { field: 'Critério', weak: '"Deve ficar mais rápido"', strong: '"p95 < 400ms em load test com 100 req/s por 60s"' },
    {
      field: 'Pesquisa',
      weak: 'Ausente: vai direto ao código',
      strong: '"Profiling da query atual + explain plan do índice composto"',
    },
    {
      field: 'Evidência',
      weak: 'Nenhuma: "tá funcionando"',
      strong: '"p95 = 187ms. 100% dos testes passando. PR #42 aprovado."',
    },
  ],
  en: [
    {
      field: 'Context',
      weak: '"System is slow sometimes"',
      strong: '"User search times out for queries > 3 chars on Enterprise plan. Constraint: no schema changes."',
    },
    {
      field: 'Objective',
      weak: '"Improve system performance"',
      strong: '"Reduce p95 of /api/search from 1800ms to <400ms"',
    },
    {
      field: 'Scope',
      weak: '"Everything that is slow"',
      strong: '"Only query builder + index. Out: cache layer, auth"',
    },
    { field: 'Criteria', weak: '"It should be faster"', strong: '"p95 < 400ms in load test with 100 req/s for 60s"' },
    {
      field: 'Research',
      weak: 'Absent: goes straight to code',
      strong: '"Profiling of current query + explain plan of composite index"',
    },
    { field: 'Evidence', weak: 'None: "it works"', strong: '"p95 = 187ms. 100% of tests passing. PR #42 approved."' },
  ],
}

export const MULTI_AGENT_ARCHS_DATA: Record<string, MultiAgentArch[]> = {
  'pt-BR': [
    {
      id: 'network',
      letter: 'A',
      name: 'Network',
      tagline: 'Agentes comunicam livremente entre si',
      description:
        'Cada agente decide quem é o próximo a executar. Sem coordenador central. Usado em frameworks como Swarm e CrewAI.',
      when: 'Exploração inicial, protótipos. Não recomendado para produção.',
      components: ['Agent A', 'Agent B', 'Agent C', 'Peer routing'],
      tradeoff: 'Pouco confiável e caro: roteamento sem controle gera loops, tokens extras e falhas silenciosas.',
      reliability: 'low',
    },
    {
      id: 'supervisor',
      letter: 'B',
      name: 'Supervisor',
      tagline: 'Agente central delega para especialistas',
      description:
        'Um agente supervisor tem como única função coordenar: ele delega tarefas para subagentes especialistas e agrega os resultados.',
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
      description:
        'Versão simplificada do padrão Supervisor. Os subagentes são registrados como tools, o LLM central os invoca diretamente via tool call.',
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
      description:
        'Camadas de supervisores: um supervisor mestre coordena sub-supervisores, cada um com seu próprio grupo de workers especializados.',
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
      description:
        'Em vez de usar arquitetura genérica, você constrói o fluxo de controle exato para o seu caso. Maior controle sobre roteamento, estado e ferramentas.',
      when: 'Produção real com requisitos específicos. Recomendação do LangGraph para casos críticos.',
      components: ['Domain-specific graph', 'Custom routing', 'State management', 'Typed checkpoints'],
      tradeoff: 'Mais esforço inicial; menor custo operacional e mais previsibilidade em produção.',
      reliability: 'high',
    },
  ],
  en: [
    {
      id: 'network',
      letter: 'A',
      name: 'Network',
      tagline: 'Agents communicate freely with each other',
      description:
        'Each agent decides who executes next. No central coordinator. Used in frameworks like Swarm and CrewAI.',
      when: 'Initial exploration, prototypes. Not recommended for production.',
      components: ['Agent A', 'Agent B', 'Agent C', 'Peer routing'],
      tradeoff: 'Unreliable and expensive: uncontrolled routing creates loops, extra tokens, and silent failures.',
      reliability: 'low',
    },
    {
      id: 'supervisor',
      letter: 'B',
      name: 'Supervisor',
      tagline: 'Central agent delegates to specialists',
      description:
        'A supervisor agent has one function: coordinate. It delegates tasks to specialist sub-agents and aggregates results.',
      when: 'Composite tasks with well-defined subtasks and domain specialization.',
      components: ['Supervisor Agent', 'Worker: Code', 'Worker: Test', 'Worker: Docs'],
      tradeoff: 'Clear, traceable control. Supervisor becomes a bottleneck if overloaded.',
      reliability: 'high',
    },
    {
      id: 'supervisor-tools',
      letter: 'C',
      name: 'Supervisor-as-Tools',
      tagline: 'Sub-agents passed as tools to the central LLM',
      description:
        'Simplified version of the Supervisor pattern. Sub-agents are registered as tools; the central LLM invokes them directly via tool call.',
      when: 'When the supervisor needs low latency and the number of workers is fixed and small.',
      components: ['Orchestrator LLM', 'Worker as Tool A', 'Worker as Tool B', 'Tool registry'],
      tradeoff: 'Simpler to implement; less flexible for dynamic workers.',
      reliability: 'high',
    },
    {
      id: 'hierarchical',
      letter: 'D',
      name: 'Hierarchical',
      tagline: 'Supervisors coordinate other supervisors',
      description:
        'Layers of supervisors: a master supervisor coordinates sub-supervisors, each with their own group of specialized workers.',
      when: 'Large systems with orthogonal domains: frontend, backend, infra, tests as separate clusters.',
      components: ['Master Supervisor', 'Sub-supervisor A', 'Sub-supervisor B', 'Workers per cluster'],
      tradeoff: 'High scalability and domain isolation. Significant setup and debugging complexity.',
      reliability: 'medium',
    },
    {
      id: 'custom-cognitive',
      letter: 'E',
      name: 'Custom Cognitive',
      tagline: 'Custom flow for the specific domain',
      description:
        'Instead of a generic architecture, you build the exact control flow for your case. More control over routing, state, and tools.',
      when: 'Real production with specific requirements. LangGraph is recommended for critical cases.',
      components: ['Domain-specific graph', 'Custom routing', 'State management', 'Typed checkpoints'],
      tradeoff: 'More upfront effort; lower operational cost and more predictability in production.',
      reliability: 'high',
    },
  ],
}

export const MULTI_AGENT_PATTERNS_DATA: Record<string, MultiAgentPattern[]> = {
  'pt-BR': [
    {
      id: 'evaluator-optimizer',
      letter: 'F',
      name: 'Evaluator-Optimizer',
      tagline: 'Loop interno de feedback entre gerador e crítico',
      description:
        'Agente gerador produz solução. Agente crítico avalia com critério explícito. Se rejeitado, gerador retrabalha a partir do feedback até aprovação.',
      when: 'Tarefas criativas ou abertas onde a primeira saída raramente é ideal: código, reviews, docs.',
      components: ['Generator Agent', 'Critic Agent', 'Feedback loop', 'Acceptance criteria'],
      tradeoff: 'Mais tokens e latência por ciclo. Saída significativamente melhor para tarefas sem resposta única.',
    },
    {
      id: 'quality-loop',
      letter: 'G',
      name: 'Quality Loop',
      tagline: 'Executar, validar, corrigir até aprovação',
      description:
        'Executar a tarefa, validar imediatamente contra critério verificável, corrigir se falhar, repetir. Base do RPEV aplicado em loop automatizado.',
      when: 'Qualquer tarefa com critério verificável: testes passando, lint limpo, build verde.',
      components: ['Execute', 'Validate', 'Fix', 'Max retries gate'],
      tradeoff: 'Simples de implementar. Risco de loop infinito sem limite de retries explícito.',
    },
    {
      id: 'dynamic-context',
      letter: 'H',
      name: 'Dynamic Context Injection',
      tagline: 'Shell executa antes do prompt e injeta estado real',
      description:
        'O padrão `!{comando}` executa shell antes da montagem do prompt e injeta saída real no contexto. O agente recebe estado atual, não snapshot estático.',
      when: 'Quando o agente precisa de estado atual: git status, CI logs, env vars, arquivos de config.',
      components: ['Shell command', 'Live output capture', 'Prompt assembly', 'Context injection'],
      tradeoff: 'Risco de prompt injection se a fonte não for confiável. Validar origem antes de injetar.',
    },
    {
      id: 'llm-judge',
      letter: 'I',
      name: 'LLM-as-a-Judge',
      tagline: 'Modelo avalia comportamento de outro modelo',
      description:
        'Um LLM separado (ou eval framework como promptfoo) valida a saída do agente principal. Detecta regressão de comportamento sem testes manuais exaustivos.',
      when: 'Validar respostas abertas, fluxos longos ou comportamento de skills em pipeline de CI.',
      components: ['Primary agent', 'Judge LLM', 'Eval criteria', 'Pass/fail signal'],
      tradeoff: 'Custo duplo de tokens. Alto retorno para fluxos críticos onde teste manual não é viável.',
    },
  ],
  en: [
    {
      id: 'evaluator-optimizer',
      letter: 'F',
      name: 'Evaluator-Optimizer',
      tagline: 'Internal feedback loop between generator and critic',
      description:
        'Generator agent produces a solution. Critic agent evaluates with explicit criteria. If rejected, the generator reworks from feedback until approved.',
      when: 'Creative or open-ended tasks where the first output is rarely ideal: code, reviews, docs.',
      components: ['Generator Agent', 'Critic Agent', 'Feedback loop', 'Acceptance criteria'],
      tradeoff:
        'More tokens and latency per cycle. Significantly better output for tasks without a single correct answer.',
    },
    {
      id: 'quality-loop',
      letter: 'G',
      name: 'Quality Loop',
      tagline: 'Execute, validate, fix until approved',
      description:
        'Execute the task, immediately validate against a verifiable criterion, fix if it fails, repeat. The RPEV foundation applied as an automated loop.',
      when: 'Any task with a verifiable criterion: tests passing, clean lint, green build.',
      components: ['Execute', 'Validate', 'Fix', 'Max retries gate'],
      tradeoff: 'Simple to implement. Risk of infinite loop without an explicit retry limit.',
    },
    {
      id: 'dynamic-context',
      letter: 'H',
      name: 'Dynamic Context Injection',
      tagline: 'Shell executes before the prompt and injects live state',
      description:
        'The `!{command}` pattern runs shell commands before prompt assembly and injects live output into context. The agent receives current state, not a static snapshot.',
      when: 'When the agent needs current state: git status, CI logs, env vars, config files.',
      components: ['Shell command', 'Live output capture', 'Prompt assembly', 'Context injection'],
      tradeoff: 'Risk of prompt injection if the source is untrusted. Validate origin before injecting.',
    },
    {
      id: 'llm-judge',
      letter: 'I',
      name: 'LLM-as-a-Judge',
      tagline: 'Model evaluates the behavior of another model',
      description:
        'A separate LLM (or eval framework like promptfoo) validates the primary agent output. Detects behavioral regression without exhaustive manual testing.',
      when: 'Validating open-ended responses, long flows, or skill behavior in a CI pipeline.',
      components: ['Primary agent', 'Judge LLM', 'Eval criteria', 'Pass/fail signal'],
      tradeoff: 'Double token cost. High return for critical flows where manual testing is not viable.',
    },
  ],
}

export const COMM_PATTERNS_DATA: Record<string, CommPattern[]> = {
  'pt-BR': [
    {
      id: 'shared-state',
      name: 'Shared State',
      description:
        'Agentes leem e escrevem em um objeto de estado comum. Mensagens, artefatos e contexto ficam acessíveis para todos os participantes do sistema.',
      pros: ['Visibilidade total do estado', 'Fácil debug e rastreamento', 'Natural para fluxos sequenciais'],
      cons: [
        'Estado cresce rapidamente',
        'Risco de conflito em escrita paralela',
        'Contexto pesado para todos os agentes',
      ],
    },
    {
      id: 'tool-calling',
      name: 'Tool Calling',
      description:
        'Um agente invoca outro como se fosse uma ferramenta: passa parâmetros específicos e recebe apenas o resultado final daquela tarefa.',
      pros: ['Contexto isolado por tarefa', 'Workers não veem histórico completo', 'Melhor para paralelização'],
      cons: [
        'Menos visibilidade do processo interno',
        'Difícil propagar contexto parcial',
        'Perde histórico intermediário',
      ],
    },
  ],
  en: [
    {
      id: 'shared-state',
      name: 'Shared State',
      description:
        'Agents read and write to a common state object. Messages, artifacts, and context are accessible to all system participants.',
      pros: ['Full state visibility', 'Easy debug and tracing', 'Natural for sequential flows'],
      cons: ['State grows quickly', 'Risk of write conflict in parallel execution', 'Heavy context for all agents'],
    },
    {
      id: 'tool-calling',
      name: 'Tool Calling',
      description:
        'One agent invokes another as if it were a tool: passes specific parameters and receives only the final result of that task.',
      pros: ['Context isolated per task', 'Workers do not see full history', 'Better for parallelization'],
      cons: [
        'Less visibility into the internal process',
        'Hard to propagate partial context',
        'Loses intermediate history',
      ],
    },
  ],
}
