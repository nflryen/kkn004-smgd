# AGENT.md — Guidelines & Rules for AI Agents

**Project:** KKN 004 Somagede (UIN Prof. K.H. Saifuddin Zuhri Purwokerto)  
**Target:** High-Quality Vibe Coding Execution  
**Context Documents:** `PRD.md`, `DESIGN.md`, `ARCHITECTURE.md`  

---

## 1. Core Operating Principles

1. **Always Read Context Files First:**  
   Before generating, modifying, or refactoring code, you **MUST** reference `PRD.md` (functional requirements), `DESIGN.md` (visual design system & glassmorphism tokens), and `ARCHITECTURE.md` (tech stack & folder structure). Do not deviate from the agreed specifications.

2. **Mobile-First with Widescreen Scale:**  
   Write Tailwind CSS classes starting from mobile viewports (`360px - 430px`) first, then scale gracefully up to tablet (`md:`) and desktop (`lg:`, `xl:`, `2xl:`) layouts. Ensure rich hover interactions and full-width container bounds (`max-w-7xl mx-auto`) on desktop screens.

3. **Strict Stack Compliance:**  
   - **Framework:** Next.js (App Router, React 19, TypeScript)
   - **Styling:** Tailwind CSS + custom glassmorphism utilities (`globals.css`)
   - **Animations:** Framer Motion (`framer-motion` or `motion`)
   - **CMS:** Sanity.io Studio (`next-sanity`)
   - **Icons:** Lucide React (`lucide-react`)  
   *Do NOT introduce alternative CSS frameworks, state management libraries, or unapproved dependencies.*

---

## 2. Code Quality & Formatting Rules

- **TypeScript Strict Mode:** Never use `any`. Always define explicit interfaces or types for props, CMS data payloads, and component state.
- **Client vs. Server Components:**  
  - Keep components as Server Components by default.
  - Only add `'use client'` at the top of files that require interactivity, state hooks (`useState`, `useEffect`), or Framer Motion animations.
- **Clean Component Structure:**  
  Place reusable UI elements in `src/components/ui/`, section blocks in `src/components/sections/`, glass decorations in `src/components/glass/`, and layouts in `src/components/layout/`.

---

## 3. UI/UX & Glassmorphism Guidelines

- **Background & Canvas:** Primary app canvas must use dark forest slate (`#0B1917` / `#0A1312`).
- **Glass Cards:** Use the predefined frosted glass pattern:  
  `bg-white/10 backdrop-blur-md border border-white/20 shadow-xl hover:border-teal-400/50 transition-all duration-300 rounded-2xl`
- **Triple-Logo Container:** The header branding must include the three logos (Group KKN 004, UIN Saizu, Banyumas/Program) wrapped in a rounded glass pill container.
- **Motion Performance:**  
  - Use `viewport={{ once: true }}` on scroll reveals to conserve frame rates.
  - Keep floating glass elements light and non-blocking (`pointer-events-none`).

---

## 4. Workflow & Step-by-Step Execution

When asked to build features:
1. Explain what components/files will be created or modified.
2. Implement clean, modular code with concise inline comments.
3. Verify that responsiveness across Mobile, Tablet, and Desktop remains unbroken.
