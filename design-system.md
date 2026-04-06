# Design System Base (Vibening)

## 1. Tokens de cor (padrão observado)

### Base

- `--bg: #000`
- `--text: #f0f0f0`
- `--text-muted: rgba(255,255,255,0.4)`
- `--text-faint: rgba(255,255,255,0.2)`

### Surface (glass)

- `--glass: rgba(255,255,255,0.03)`
- `--glass-border: rgba(255,255,255,0.07)`
- `--glass-hover: rgba(255,255,255,0.06)`

### Acentos funcionais

- verde: `#3fb950`
- azul: `#58a6ff`
- laranja: `#ff9442`
- vermelho: `#f85149`
- roxo: `#bc8cff`

## 2. Tipografia

- display: `GeistPixel`
- texto base: `Geist`
- código/labels: `GeistMono`
- heading principal com `clamp(...)` para escala fluida
- labels em caixa alta com tracking alto (`0.15em` a `0.2em`)

## 3. Layout e organização

- estrutura vertical por seções (`max-width: 1200px`)
- espaçamento de seção consistente (`80px 40px` desktop)
- cards modulares com raio entre `12px` e `16px`
- grids com `repeat(auto-fill, minmax(...))` para blocos de catálogo

## 4. Motion e percepção

- entrada progressiva por seção via `IntersectionObserver`
- transições curtas (`0.15s` a `0.55s`)
- microfeedback em hover/active (border + brilho leve)
- animações discretas no hero (glows, scanlines, scroll hint)

## 5. Padrões mobile que devem ser mantidos

- usar `min-height: 100svh` nos blocos full-screen
- aplicar `env(safe-area-inset-bottom)` em elementos fixos no rodapé
- reduzir padding para `60px 24px` em telas menores
- stackar layouts 2 colunas em 1 coluna em `max-width: 900px`
- usar modal em formato bottom-sheet no celular quando fizer sentido

## 6. Melhorias já validadas nos projetos analisados

- esconder scrollbar visual em painéis com scroll interno, mantendo usabilidade
- travar scroll de fundo quando modal estiver aberto
- header sticky em painéis detalhados para manter contexto
- overlay com blur em modal para foco de leitura
- fallback visual para assets externos que podem falhar

## 7. Regras de qualidade visual para o novo site

- evitar blocos de texto longos sem quebra visual
- cada seção precisa de: label, título, descrição curta e conteúdo interativo
- manter contraste AAA para texto principal e AA para secundário
- não misturar mais de 2 cores de destaque por seção
- tratar animação como apoio de leitura, não decoração
