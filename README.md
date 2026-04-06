# Vibening

Site público de conteúdo técnico sobre IA Coding e engenharia agêntica, com foco em material visual/interativo para estudo e apresentação.

## Stack

- React 19 + TypeScript
- Vite
- ESLint
- Mermaid (diagramas técnicos)

## Estrutura

```text
src/
public/
design-system.md
site-architecture.md
```

## Desenvolvimento local

```bash
npm install
npm run dev
```

## Qualidade

```bash
npm run check   # lint + typecheck
npm run build   # check + build
```

## Git hooks (opcional)

```bash
npm run hooks:install
```

## Deploy na Vercel (GitHub / main)

1. Suba este repositório no GitHub (`uphiago/vibening`).
2. Na Vercel, escolha **Add New Project** e conecte o repo.
3. Framework: **Vite** (detectado automaticamente).
4. Branch de produção: `main`.
5. Build command: `npm run build`.
6. Output directory: `dist`.
7. Deploy.

Sem variáveis de ambiente obrigatórias no estado atual.
