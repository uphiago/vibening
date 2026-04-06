export type Lang = 'pt-BR' | 'en'

export type Layer = {
  id: string
  label: string
  summary: string
  chips: string[]
  facts: string[]
}

export type FlowStep = {
  id: string
  label: string
  summary: string
  detail: string
  payload: string
}

export type QualityRow = {
  gate: string
  rule: string
  verify: string
}

export type Principle = {
  id: string
  title: string
  subtitle: string
  icon: string
  signal: string
}

export type MethodCard = {
  id: string
  title: string
  summary: string
  bullets: string[]
}

export type DeepDive = {
  id: string
  title: string
  description: string
  artifacts: string[]
  tree?: string[]
  links: { label: string; href: string }[]
}

export type ProgressiveLayer = {
  id: string
  name: string
  objective: string
  loadWhen: string
  includes: string[]
  tokens: string
}

export type WorkflowPhase = {
  id: string
  step: string
  title: string
  objective: string
  checks: string[]
  antiPattern: string
}

export type Comparison = {
  aspect: string
  vibecoding: string
  aiAssisted: string
  risk: 'high' | 'medium' | 'ok'
}

export type AntiPattern = {
  id: string
  category: string
  problem: string
  consequence: string
  fix: string
  severity: 'critical' | 'high' | 'medium'
}

export type ContextSignal = {
  signal: string
  meaning: string
  action: string
  type: 'error' | 'warning'
}

export type Lesson = {
  id: string
  number: string
  date: string
  title: string
  objective: string
  topics: string[]
  outcomes: string[]
  tag: string
}

export type StackTool = {
  name: string
  type: string
  why: string
  priority: 'A' | 'B' | 'C'
}

export type SddField = {
  id: string
  number: string
  name: string
  description: string
  detail: string
  example: string
  antiPattern: string
}

export type SddSpecRow = {
  field: string
  weak: string
  strong: string
}

export type MultiAgentArch = {
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

export type MultiAgentPattern = {
  id: string
  letter: string
  name: string
  tagline: string
  description: string
  when: string
  components: string[]
  tradeoff: string
}

export type CommPattern = {
  id: string
  name: string
  description: string
  pros: string[]
  cons: string[]
}

export type ChecklistItem = {
  item: string
  category: string
}
