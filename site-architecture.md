# Arquitetura do Site Teórico (Aula 1)

## Estrutura recomendada

1. `Hero`
- título forte da aula teórica
- subtítulo com proposta técnica
- CTA para navegar seções

2. `Roteiro das Aulas`
- Aula 1 (teórica) e Aula 2 (hands-on)
- fronteira clara entre conteúdo conceitual e prática ao vivo

3. `Vibe Coding vs Engenharia Assistida`
- comparação em tabela/card
- foco em trade-offs e risco

4. `Stack Agêntico`
- Skills
- MCP
- Contexto de projeto (`AGENTS.md` / `CLAUDE.md`)

5. `RPEV`
- visual de fluxo `Research -> Plan -> Execute -> Verify`
- exemplo curto em cada etapa

6. `Context Engineering`
- contexto mínimo viável
- progressive disclosure
- sinais de contexto ruim

7. `Qualidade e Governança`
- loop `validate -> fix -> repeat`
- checkpoints de revisão
- confirmação humana para ações destrutivas

8. `Anti-padrões`
- prompt gigante sem estratégia
- execução sem plano
- merge sem validação

9. `Checklist Final`
- playbook reutilizável após a aula
- referência rápida para estudo

10. `Referências Técnicas`
- links dos docs do repositório
- links externos primários

## Mapeamento de componentes (React)

- `SiteNav`
- `LanguageSwitcher` (opcional)
- `Hero`
- `LessonRoadmap`
- `ComparisonTable`
- `StackLayers`
- `RpevFlow`
- `ContextPatterns`
- `GovernanceChecklist`
- `AntiPatterns`
- `References`
- `Footer`

## Padrão de implementação visual

- cards com classe base `glass-card`
- seções com `opacity/translateY` e classe `.visible`
- tokens globais no `index.css`
- variação de cor por seção usando `--accent`

## Responsividade mínima

- desktop: layout híbrido (cards e painéis em 2 colunas quando útil)
- tablet: reduzir densidade visual sem perder conteúdo
- mobile: uma coluna, tipografia reduzida, interações por toque

## Critério de pronto para publicar

- legível em celular sem zoom
- sem overflow horizontal
- sem animação que atrapalhe leitura
- links de referência funcionais
- conteúdo técnico coerente com `docs/` e `ia-coding/`
