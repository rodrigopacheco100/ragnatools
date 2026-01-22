# Contexto do Projeto - Ragnatools

## Visão Geral

**Ragnatools** é uma aplicação web de ferramentas para o jogo Ragnarok Online, desenvolvida com foco em auxiliar jogadores com utilitários e builders. O projeto utiliza uma stack moderna TypeScript com arquitetura monorepo.

## Stack Tecnológica

### Core
- **TypeScript** - Linguagem principal para type safety
- **React 19.2.3** - Biblioteca UI
- **Vite** - Build tool e dev server
- **pnpm** - Gerenciador de pacotes (v10.15.0)
- **Turborepo** - Sistema de build otimizado para monorepo

### Frontend Framework
- **TanStack Router** - Roteamento file-based com type safety completo
- **TanStack React Form** - Gerenciamento de formulários
- **TailwindCSS v4** - Framework CSS utility-first
- **shadcn/ui** - Componentes UI reutilizáveis
- **Base UI** - Componentes headless da MUI

### Estilização e UI
- **lucide-react** - Biblioteca de ícones
- **class-variance-authority (CVA)** - Variantes de componentes
- **clsx + tailwind-merge** - Utilitários para classes CSS
- **sonner** - Sistema de toast notifications
- **tw-animate-css** - Animações CSS

### Qualidade de Código
- **Biome** - Linting e formatação (substitui ESLint/Prettier)
- **Husky** - Git hooks
- **lint-staged** - Lint em arquivos staged

## Convenções de Código

### Nomenclatura de Arquivos
- **Componentes React**: `kebab-case.tsx` (ex: `mode-toggle.tsx`)
- **Hooks**: `use-*.ts` (ex: `use-alooid-builder.ts`)
- **Tipos/Interfaces**: `PascalCase` inline ou em arquivos `.types.ts`
- **Utilitários**: `kebab-case.ts`

### Organização de Rotas (TanStack Router)
- **Rotas públicas**: Arquivos diretos em `/routes`
- **Componentes privados**: Prefixo `-` (ex: `-components/`, `-hooks/`)
- **Rota raiz**: `__root.tsx`
- **Index routes**: `index.tsx`

### Padrões de Componentes
```typescript
// Componente funcional com tipos
export function ComponentName({ prop }: Props) {
  return <div>...</div>
}

// Uso de CVA para variantes
const variants = cva("base-classes", {
  variants: {
    variant: {
      default: "...",
      destructive: "..."
    }
  }
})
```

### Gerenciamento de Estado
- **Estado local**: `useState`, `useReducer`
- **Formulários**: TanStack Form
- **Roteamento**: TanStack Router com type-safe navigation

## Sistema de Design

### Tokens de Cor (CSS Variables)
O projeto utiliza **OKLCH** para cores e está configurado permanentemente em **modo dark**:

```css
:root {
  --background: oklch(0.145 0 0);
  --foreground: oklch(0.985 0 0);
  --primary: oklch(0.87 0 0);
  --destructive: oklch(0.704 0.191 22.216);
  /* ... */
}
```

### Tipografia
- **Fonte padrão**: Inter Variable (sans-serif)

### Radius
- Variável customizável: `--radius: 0.625rem`
- Variantes: `sm`, `md`, `lg`, `xl`, `2xl`, `3xl`, `4xl`

## Estrutura de Dados

### Items (Ragnarok Online)
```typescript
// items-enum.ts - IDs dos itens
export enum ItemId {
  AMETISTA = "719",
  ROSA_ETERNA = "748",
  // ...
}

// items.ts - Dados completos dos itens
export const items = {
  [ItemId.AMETISTA]: {
    name: "Ametista",
    img: "https://www.divine-pride.net/img/items/item/bRO/719"
  },
  // ...
} satisfies Readonly<Record<ItemId, ItemData>>

// Type helper para keys
export type ItemKey = keyof typeof items;
```

### Contents (Agrupamentos)
```typescript
type ContentData = {
  name: string;
  items: ItemKey[];
}

export const contents: Readonly<ContentData[]> = [
  {
    name: "Drops de equipamentos",
    items: [ItemId.ROSA_ETERNA]
  },
  // ...
]
```

## Features Implementadas

### Alooid Builder
Ferramenta para construir comandos do jogo com seleção de itens.

**Funcionalidades:**
- Seleção de até 10 itens
- Seleção automática cross-section
- Toast notification ao atingir limite
- Indicador visual de seleção cheia (borda vermelha)
- Geração de comando para o jogo
- Sistema de slots configurável

**Estrutura:**
```
alooid-builder/
├── -components/
│   ├── command-panel.tsx      # Painel de comando gerado
│   ├── content-list.tsx       # Lista de conteúdos
│   ├── page-header.tsx        # Cabeçalho da página
│   └── index.ts
├── -hooks/
│   └── use-alooid-builder.ts  # Lógica principal
└── index.tsx                   # Componente da rota
```

## Scripts Disponíveis

### Root (monorepo)
```bash
pnpm run dev          # Inicia todos os apps em dev mode
pnpm run build        # Build de todos os apps
pnpm run dev:web      # Inicia apenas o app web
pnpm run check-types  # Verifica tipos TypeScript
pnpm run check        # Executa Biome (format + lint)
pnpm run prepare      # Inicializa Husky hooks
```

### App Web
```bash
pnpm run dev          # Vite dev server (porta 3001)
pnpm run build        # Build de produção
pnpm run serve        # Preview do build
pnpm run check-types  # Type checking
```

## Configurações Importantes

### Biome (biome.json)
- Formatação automática
- Linting com regras recomendadas
- Organização de imports
- Suporte a TypeScript/React

### Git Hooks
- **pre-commit**: Executa `biome check --write` em arquivos staged

### TypeScript
- Strict mode habilitado
- Module resolution: NodeNext
- Target: ES2020+

## Padrões de Desenvolvimento

### Adicionando Novos Itens
1. Adicionar ID em `items-enum.ts`
2. Adicionar dados completos em `items.ts`
3. Referenciar em `contents.ts` se necessário

### Criando Nova Rota
1. Criar pasta em `/routes/nome-da-rota/`
2. Criar `index.tsx` com componente da rota
3. Componentes privados em `-components/`
4. Hooks privados em `-hooks/`

### Adicionando Componente UI
1. Usar `shadcn` CLI se disponível no catálogo
2. Componentes vão para `src/components/ui/`
3. Seguir padrão de variantes com CVA

## Fontes de Imagens

### Divine Pride
```
https://www.divine-pride.net/img/items/item/bRO/{itemId}
```

### Hero Ragnarok (servidor específico)
```
https://site.heroragnarok.com/?module=image&action=processicon&id={itemId}
```

## Considerações de Performance

- **Code splitting**: Automático via Vite + TanStack Router
- **Tree shaking**: Habilitado no build
- **Lazy loading**: Componentes de rota carregados sob demanda
- **CSS**: TailwindCSS v4 com JIT mode

## Próximos Passos Sugeridos

1. **Documentação de componentes**: Adicionar Storybook ou similar
2. **Testes**: Configurar Vitest + Testing Library
3. **CI/CD**: Pipeline de deploy automatizado
4. **i18n**: Internacionalização (pt-BR, en-US)
5. **PWA**: Transformar em Progressive Web App
6. **Analytics**: Integração com analytics

## Referências Úteis

- [TanStack Router Docs](https://tanstack.com/router)
- [TailwindCSS v4 Docs](https://tailwindcss.com)
- [shadcn/ui](https://ui.shadcn.com)
- [Biome](https://biomejs.dev)
- [Divine Pride Database](https://www.divine-pride.net)

---

**Última atualização**: 2026-01-29
**Versão do documento**: 1.0.0
