# Agent Guidelines for Hostel Morocco

<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## Project Overview

- **Framework**: Next.js 16.2.3 (App Router)
- **React**: 19.2.4
- **Styling**: Tailwind CSS 4
- **Language**: TypeScript 5 (strict mode)
- **Package Manager**: pnpm

## Build/Lint/Test Commands

```bash
pnpm dev         # Development server (Turbopack)
pnpm build      # Production build
pnpm start     # Start production server
pnpm lint      # Run ESLint
pnpm lint --fix  # Fix auto-fixable issues
```

There is **no test framework configured** in this project.

## Code Style Guidelines

### Imports

- Use double quotes for all imports
- Group imports: built-in React/Next first, then third-party, then local
- Use path aliases: `@/*` maps to project root

```typescript
import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";
```

### TypeScript

- Always use explicit types for function parameters and return types
- Use `interface` for object shapes, `type` for unions/aliases
- Enable strict mode - avoid `any`

```typescript
interface Props {
  children: React.ReactNode;
  className?: string;
}

export default function Component({ children, className }: Props) {
  return <div className={className}>{children}</div>;
}
```

### Naming Conventions

- **Components**: PascalCase (e.g., `HomePage`, `UserCard`)
- **Files**: kebab-case for pages, PascalCase for components
- **Functions**: camelCase (e.g., `getData`, `handleClick`)
- **Constants**: SCREAMING_SNAKE_CASE (e.g., `MAX_RETRY_COUNT`)

### File Structure

```
app/
├── page.tsx           # Home page (root)
├── layout.tsx         # Root layout
├── globals.css       # Global styles
└── [route]/
    └── page.tsx      # Route pages
```

### React/Next.js Patterns

- Use Server Components by default (no "use client" unless needed)
- Prefer Next.js built-ins over third-party libraries
- Use `next/image` for images with proper width/height
- Use `next/font/google` for fonts
- Metadata should be exported from layout.tsx/page.tsx

### Tailwind CSS 4

This project uses **Tailwind CSS 4** with the new `@import` syntax:

```css
@import "tailwindcss";

@theme inline {
  --color-primary: #0070f3;
}
```

- Use utility classes for styling
- Dark mode: use `dark:` prefix (e.g., `dark:bg-black`)
- Custom colors defined in `@theme`

### Error Handling

- Use try/catch for async operations
- Return proper error boundaries for unexpected states
- Never expose sensitive data in error messages

### Formatting

- 2 spaces for indentation
- No semicolons at end of lines
- Trailing commas in objects/arrays
- Max line length: 100 characters (soft)

## ESLint Configuration

The project uses `eslint-config-next` for core web vitals and TypeScript.

## Development Workflow

1. Run `pnpm dev` to start development server
2. Make changes and verify with `pnpm build` before committing
3. Run `pnpm lint` to check for errors
4. Do not commit build artifacts (`.next/`)

## Environment Variables

- Create `.env.local` for local development
- Never commit secrets to git
- Use `NEXT_PUBLIC_` prefix for client-side accessible env vars

## Path Aliases

- `@/*` maps to project root (configured in tsconfig.json)