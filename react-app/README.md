# Sabin Baral | Portfolio (React + TypeScript)

Modern React + TypeScript single-page portfolio showcasing polymer science research, lab automation, 3D printing, and materials engineering.

## Tech Stack

- **React 19** with TypeScript strict mode
- **Vite 8** for dev server and production builds
- **CSS custom properties** design system with light/dark mode
- **Inter** (Google Fonts) typography
- **Formspree** contact form backend

## Quick Start

```bash
# Install dependencies
npm install

# Start the dev server
npm run dev
```

The dev server runs at `http://localhost:5173` by default.

## Production Build

```bash
npm run build
npm run preview   # preview the production build locally
```

## Project Structure

```
src/
  App.tsx                        # Root component
  App.css                        # All component styles + design tokens
  index.css                      # CSS reset / globals
  main.tsx                       # Entry point with ThemeProvider

  components/
    layout/
      Header.tsx                 # Sticky nav with scrollspy & theme toggle
      Footer.tsx                 # Site footer
      Layout.tsx                 # Shell: header + main + footer + back-to-top
      Container.tsx              # Max-width wrapper
      Section.tsx                # IntersectionObserver fade-in wrapper
      ThemeToggle.tsx            # Dark/light mode button

    sections/
      HeroSection.tsx            # Split hero with showcase cards
      ProjectsSection.tsx        # Project cards + modal + lightbox
      PublicationsSection.tsx     # Papers, presentations, collaborators
      SkillsSection.tsx          # Grouped skill chips
      ContactSection.tsx         # Formspree form + direct links

    ui/
      Button.tsx                 # Polymorphic button (a / button)
      SectionHeading.tsx         # Eyebrow + heading pattern
      Modal.tsx                  # Accessible modal with focus trap
      Lightbox.tsx               # Full-screen image viewer
      Chip.tsx                   # Tag / skill pill

  data/
    projects.ts                  # All project content + modal sections
    publications.ts              # Publications, presentations, collaborators
    skills.ts                    # Skill groups

  hooks/
    useScrollPosition.ts         # Back-to-top + header elevation
    useIntersectionFadeIn.ts     # Viewport-triggered fade-in
    usePrefersReducedMotion.ts   # Reduced-motion media query

  theme/
    ThemeProvider.tsx             # React context for dark/light + localStorage

public/
  assets/                        # Images, PDFs, videos from original portfolio
```

## Adding Content

- **New project**: add an entry to `src/data/projects.ts` with the `Project` type.
- **New publication**: add to `src/data/publications.ts`.
- **New skill**: add to the appropriate group in `src/data/skills.ts`.
- **New images**: drop files into `public/assets/` and reference them as `/assets/filename`.

## Design Tokens

All design tokens live at the top of `src/App.css` as CSS custom properties (`--c-bg`, `--c-primary`, etc.). The `[data-theme='light']` block overrides them for light mode.

## License

Copyright 2025 Sabin Baral. All rights reserved.
