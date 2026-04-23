---
name: design-md
description: Fetch a brand's DESIGN.md system (colors, typography, components, layout, guidelines) and apply it to the current project. Uses the awesome-design-md / getdesign.md registry with 58+ major brands.
allowed-tools: Bash(npx:*) Bash(npm:*) Read Write Edit Glob Grep
---

# Design MD — Brand Design System Fetcher

Fetch and apply any brand's complete design system to the current project using the [getdesign.md](https://getdesign.md) registry (58+ brands).

## Usage

```
/design-md <brand>
```

**Examples:**
```
/design-md stripe
/design-md vercel
/design-md linear
/design-md claude
/design-md spotify
/design-md tesla
/design-md bmw
/design-md adidas
```

## What it does

1. Fetches the DESIGN.md for the specified brand via `npx getdesign@latest add <brand>`
2. Reads the generated DESIGN.md to extract: colors, typography, components, layout, depth/elevation, and agent prompts
3. Applies the design system to the current project's globals.css, layout.tsx, and key components

## Available brands (58+)

Stripe, Vercel, Linear, Notion, Claude, Spotify, Tesla, BMW, Airbnb, Figma, GitHub, Slack, Discord, Apple, Google, Microsoft, Meta, Amazon, Netflix, Uber, Lyft, Shopify, Intercom, Atlassian, Dropbox, Twilio, Segment, Mixpanel, Amplitude, Datadog, PagerDuty, Grafana, Supabase, PlanetScale, Railway, Render, Fly, Netlify, Cloudflare, OpenAI, Anthropic, Hugging Face, Replicate, Runway, Midjourney, Framer, Webflow, Loom, Pitch, Miro, Airtable, Coda, Retool, Bubble, Glide, Brex, Ramp, Stripe Atlas, and more.

## Step-by-step instructions

When the user runs `/design-md <brand>`:

### Step 1 — Fetch the DESIGN.md

```bash
npx getdesign@latest add $ARGUMENTS
```

This creates a `DESIGN.md` file in the current directory.

### Step 2 — Parse the design system

Read the generated `DESIGN.md` and extract:

- **Color palette**: Primary, secondary, accent, background, surface, text colors + exact hex values
- **Typography**: Font families, weights, sizes, line-heights, letter-spacing
- **Components**: Button styles, card styles, input styles, badge styles
- **Layout**: Grid system, spacing scale, max-widths, border-radius tokens
- **Depth/Elevation**: Shadow levels, blur values, z-index scale
- **Dark mode**: If applicable, dark theme tokens
- **Agent prompts**: The "how to build like this brand" section at the end

### Step 3 — Apply to project

Depending on the project type, update:

**For Next.js projects:**
- `src/app/globals.css` or `app/globals.css` — CSS custom properties (`:root` variables)
- `src/app/layout.tsx` — Font imports and metadata
- Main components — Replace hardcoded colors/fonts with CSS variables

**For any project:**
- Create or update a `design-tokens.css` file with all CSS custom properties
- Update `tailwind.config.ts` if Tailwind is present
- Document the design system in a `docs/design-system.md`

### Step 4 — Confirm

Show the user:
1. The brand's primary colors and typography
2. Which files were updated
3. A summary of key design tokens applied

## CSS variable convention

Map DESIGN.md tokens to CSS variables following this pattern:

```css
:root {
  /* Colors */
  --color-primary: #[hex];
  --color-secondary: #[hex];
  --color-accent: #[hex];
  --color-bg: #[hex];
  --color-surface: #[hex];
  --color-text: #[hex];
  --color-text-muted: #[hex];
  --color-border: #[hex];

  /* Typography */
  --font-sans: '[FontName]', system-ui, sans-serif;
  --font-mono: '[MonoFont]', monospace;
  --font-display: '[DisplayFont]', sans-serif;

  /* Spacing */
  --space-1: 4px;
  --space-2: 8px;
  --space-4: 16px;
  --space-8: 32px;

  /* Border radius */
  --radius-sm: [value];
  --radius-md: [value];
  --radius-lg: [value];
  --radius-full: 9999px;

  /* Shadows */
  --shadow-sm: [value];
  --shadow-md: [value];
  --shadow-lg: [value];
}
```

## Notes

- If `npx getdesign@latest add <brand>` fails, try fetching directly: `npx getdesign@latest list` to see all available brands
- Brand names are lowercase (e.g., `stripe` not `Stripe`)
- The DESIGN.md is placed in the project root by default
- Always back up globals.css before applying a new design system
