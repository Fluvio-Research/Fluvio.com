# Fluvio Section Transition and Visual Polish Brief

## Role

Act as a senior digital art director, interaction designer and Astro frontend engineer. Improve the existing Fluvio website rather than redesigning it from scratch.

The current site already has approved content, routes, a hero slider, a typed project system, team profiles, expertise data and reusable media components. Your task is to make the movement from one section to the next feel intentional, modern and connected while reducing duplicated CSS.

Do not replace working content or rebuild completed components without a concrete reason.

## Workspace

```text
/Users/muhammadimran/Mubashir/FluvioWebsite/New
```

Development preview:

```text
http://localhost:4321/
```

## Current problem

The homepage sections currently feel stacked rather than composed as one continuous narrative.

Specific symptoms:

1. The hero ends and the capability strip begins with a hard ruled boundary.
2. Most later sections repeat the same large top and bottom padding, so the rhythm becomes predictable.
3. The expertise, projects, platforms, team and impact sections do not visually hand off to one another.
4. The platforms section changes background colour abruptly without a transition band or a related background field.
5. The same page shell, heading scale, eyebrow, focus and breakpoint rules are repeated across several pages.
6. The current green-dominant colour direction feels too narrow for a modern technical consultancy.

The goal is not to add more objects. The goal is to improve continuity, pacing, colour rhythm and reuse.

## Approved creative direction

Use a Field Editorial visual language:

- Large real Fluvio photography
- Clear, precise typography
- Generous but varied whitespace
- Thin editorial rules
- Strong contrast between evidence, people and technical capability
- Water and sensing concepts expressed through background atmosphere
- Clean foreground content with no decorative overlays
- Professional quality influenced by Ibtidah's spacing and pacing without copying its layout or identity

The top hero slider is approved and must remain.

## Source references

### Live content and brand references

- [Current Fluvio website](https://fluvio.com.au/)
- [Current Fluvio projects](https://fluvio.com.au/projects)
- [Current Fluvio expertise](https://fluvio.com.au/expertise)
- [Current Fluvio vision](https://fluvio.com.au/vision)
- [Ibtidah visual reference](https://ibtidah.com/)
- [AstroWind source template](https://github.com/arthelokyo/astrowind)

Use the current Fluvio site only for factual content, project context and brand character. Use Ibtidah only for visual qualities such as disciplined spacing, typographic confidence, simple navigation and restrained motion.

### Archived local content

```text
/Users/muhammadimran/Mubashir/FluvioWebsite/Old/content/
/Users/muhammadimran/Mubashir/FluvioWebsite/Old/images/
/Users/muhammadimran/Mubashir/FluvioWebsite/Old/IMAGE-MANIFEST.md
/Users/muhammadimran/Mubashir/FluvioWebsite/Old/DESIGN-TOKENS.md
/Users/muhammadimran/Mubashir/FluvioWebsite/Old/SITE-MAP.md
```

Do not invent project statistics, clients, partners, credentials or outcomes.

## Read these source files first

Read in this order before editing:

1. `docs/superpowers/specs/2026-08-30-fluvio-website-redesign-design.md`
2. `src/pages/index.astro`
3. `src/components/fluvio/HeroSlider.astro`
4. `src/components/fluvio/PageBackground.astro`
5. `src/components/fluvio/SectionHeading.astro`
6. `src/assets/styles/tailwind.css`
7. `src/components/CustomStyles.astro`
8. `src/components/fluvio/ProjectFeature.astro`
9. `src/components/fluvio/ProjectListItem.astro`
10. `src/pages/vision.astro`
11. `src/pages/expertise.astro`
12. `src/pages/team.astro`
13. `src/pages/contact.astro`

Then inspect the live site at desktop, tablet and mobile widths.

## Preserve these completed systems

Do not replace or duplicate:

- `HeroSlider.astro`
- `PageBackground.astro`
- `SectionHeading.astro`
- `LargeImage.astro`
- `ProjectFeature.astro`
- `ProjectListItem.astro`
- `ProjectMeta.astro`
- `TeamProfile.astro`
- `PlatformFeature.astro`
- `ContactPanel.astro`
- Typed content in `src/data/fluvio/`
- Shared flat project routing in `src/pages/[slug].astro`
- AstroWind image handling, navigation, layouts and metadata pipeline

Extend these components where a shared capability belongs. Do not create a second component with the same responsibility.

## Required transition strategy

Create one reusable section framing system that controls spacing, tone and boundaries.

Recommended component:

```text
src/components/fluvio/SectionFrame.astro
```

Recommended interface:

```ts
interface Props {
  id?: string;
  labelledby?: string;
  tone?: 'paper' | 'mist' | 'navy' | 'water' | 'warm';
  boundary?: 'none' | 'rule' | 'contour' | 'wash';
  spacing?: 'compact' | 'standard' | 'wide';
  class?: string;
}
```

The component should:

- Render a semantic `<section>`.
- Apply one shared content shell.
- Apply one of a small number of background tones.
- Place decorative transition details behind content.
- Keep all decorative layers `pointer-events: none`.
- Avoid putting any background pattern over text, images, buttons, forms or cards.
- Become static under `prefers-reduced-motion`.
- Use no client-side state.

Do not create separate components for each transition type.

## Homepage transition sequence

Implement the following section rhythm.

### 1. Hero to capability strip

Current issue: the transition is an immediate hard rule.

Improve it by:

- Letting the hero end with generous negative space below the slider controls.
- Moving the capability strip into a soft mist field.
- Using one thin water-blue rule rather than two dark rules.
- Adding a low-opacity contour wash in the outer gutter only.
- Keeping the three capability columns flat, without cards or shadows.

### 2. Capability strip to Expertise

Use a quiet paper section with an asymmetric transition:

- Keep the left side clean for the heading.
- Let a pale mineral-blue field enter from the opposite outer gutter.
- Use the expertise list rules as the structural continuation of the capability strip.
- Vary spacing so this section feels like a new chapter, not another identical block.

### 3. Expertise to Selected Projects

Create the strongest editorial handoff on the page:

- Use the last expertise rule to visually point toward the first large project image.
- Introduce a wide background water line or contour field behind the whitespace between sections.
- Do not overlap the project image.
- Do not place text over photography.
- Keep the first project larger than the following projects.

### 4. Projects to Platforms

Treat this as a change from field evidence to operational technology:

- Transition from paper to a pale water or mineral-blue background.
- Use one simple technical grid or sparse dot field in the background gutter.
- Do not add fake charts, device frames, floating panels or dashboard fragments.
- Use silt gold as a small technical label or rule accent.

### 5. Platforms to Team

Move back to paper and human photography:

- Fade the technical background before team portraits begin.
- Use more breathing room above the first portrait row.
- Keep portrait names and roles always visible.
- Do not rely on hover to reveal essential information.

### 6. Team to Impact

Use a deep navy chapter break:

- Navy is the primary dark surface, not forest green.
- Use white text and one river-blue or coral rule.
- Keep the transition shape or contour entirely behind the section.
- Do not animate the portraits or move them across the boundary.

### 7. Impact to Contact

Use a warm final handoff:

- Move from navy into warm white or a very pale silt tint.
- Keep the contact panel calm and direct.
- Use one consistent project-enquiry action.
- Avoid urgency language, sales language and oversized rounded containers.

## Colour system

Replace the green-dominant theme with this controlled palette:

```css
:root {
  --fluvio-paper: #fbfcfa;
  --fluvio-mist: #f1f6f8;
  --fluvio-ink: #13202a;
  --fluvio-navy: #173b57;
  --fluvio-river: #2f7d94;
  --fluvio-teal: #3b8587;
  --fluvio-mineral: #7089ad;
  --fluvio-silt: #c39a5b;
  --fluvio-coral: #d9765b;
}
```

Rules:

- Warm white and soft mist lead the site.
- Navy leads text, navigation and dark sections.
- River blue and teal communicate water and technology.
- Mineral blue supports modelling and technical content.
- Silt gold adds landscape warmth.
- Coral is rare and reserved for a small high-attention detail.
- Green remains mainly in photography.
- Use one supporting accent per section, not all accents at once.
- Dark mode is navy-led rather than green-led.
- Check WCAG AA contrast for every text and control combination.

## Deduplication requirements

Before creating code, search for an existing component, utility or token that already owns the responsibility.

### Extract repeated page structure

The following are currently duplicated across `vision.astro`, `expertise.astro`, `team.astro` and `contact.astro`:

- Page shell width
- Editorial hero spacing
- Eyebrow styling
- Page title scale
- Intro paragraph width
- Focus-visible treatment
- Desktop and mobile breakpoints

Move shared page-level styles into one of these locations:

1. `src/assets/styles/tailwind.css` for genuinely global layout and typography utilities.
2. A single `EditorialPageHero.astro` component if markup and semantics repeat together.
3. `SectionFrame.astro` for section tone, boundary and spacing.

Do not create both a global utility and a component for the same responsibility.

### Reuse threshold

- If a pattern appears once, keep it local.
- If the same style appears on two pages, consider a shared utility.
- If the same semantic markup and behavior appear on three or more pages, extract a component.
- Do not create wrapper components that only rename a `<div>`.
- Do not duplicate data already available from `src/data/fluvio/`.

### Naming rules

- Keep the `fluvio-` prefix for custom classes.
- Use responsibility-based names such as `fluvio-section`, `fluvio-page-hero` and `fluvio-section-boundary`.
- Do not use page-specific class names for a shared pattern.
- Keep one source of truth for colour tokens.
- Keep one source of truth for spacing tokens.

## Interaction best practices

- Keep the normal operating-system cursor.
- Preserve the hero slider's pause/resume control.
- Preserve keyboard previous, next, Home and End behavior.
- Preserve reduced-motion behavior and suppressed automatic live announcements.
- Use transition durations between 180ms and 450ms for interface feedback.
- Background drift may use longer 18 to 30 second cycles.
- Avoid moving layout during hover.
- Avoid scroll hijacking, horizontal core-content carousels and parallax photography.
- Do not animate text, buttons, cards or photographs across section boundaries.
- Decorative motion remains in background gutters and negative space.
- Pause background work when the page is hidden when practical.
- Make the site fully understandable with scripts disabled.

## Performance best practices

- Keep the site statically generated.
- Do not add a large animation package.
- Prefer CSS backgrounds and one small existing pointer listener.
- Do not create a second global pointer listener.
- Use `requestAnimationFrame` for pointer-responsive background updates.
- Keep below-the-fold images lazy loaded.
- Preserve responsive `sizes` values on local images.
- Do not preload more than the first hero image.
- Avoid large SVG filters, canvas backgrounds and WebGL.

## Accessibility best practices

- Keep one `h1` per page.
- Preserve logical heading order.
- Keep one `<main>` landmark from the shared page layout.
- Keep focus outlines clearly visible.
- Maintain 44 by 44 pixel minimum pointer targets.
- Never require hover to understand or operate content.
- Keep documentary image alt text factual and specific.
- Use empty alt text only for truly decorative images.
- Ensure background patterns never lower text contrast.
- Respect `prefers-reduced-motion` and theme preferences.

## Content and routing guardrails

Do not change:

- The nine legacy project slugs
- Project facts, partners, dates or outcomes
- Team names or biographies without a verified source
- Expertise labels without checking the design specification
- FluvioSense and FluvioCascade descriptions without checking the archive
- The transparent contact behavior until a verified recipient and endpoint exist

Do not restore:

- Generic template pages
- Pricing or software-startup sections
- Stock imagery
- Fake testimonials
- Fake statistics
- Generic client logo strips
- Public demonstration blog content

## Required workflow

1. Read all files listed in the source order.
2. Inspect the live homepage at 1440px, 1024px and 390px widths.
3. Write down which transition type will be used between every pair of homepage sections.
4. Search for duplicate classes and existing reusable components.
5. Implement shared tokens and utilities first.
6. Implement `SectionFrame.astro` only if it reduces real repetition.
7. Apply the transition sequence to the homepage.
8. Replace duplicated page hero and shell styling.
9. Verify dark mode, reduced motion and keyboard behavior.
10. Run all project checks.
11. Reinspect the homepage and one internal page at all three widths.
12. Report every file changed and why.

## Verification commands

Run:

```bash
npm test
npm run check
npm run build
```

All commands must pass.

Also verify:

- `/`
- `/vision`
- `/expertise`
- `/projects`
- `/team`
- `/contact`
- One flat project route such as `/tina`

## Acceptance checklist

The work is complete only when:

- The homepage reads as one continuous story rather than stacked blocks.
- Every section boundary has an intentional but restrained treatment.
- The colour system is no longer green-dominant.
- Main images remain large, clean and unoverlaid.
- The hero slider remains fully accessible.
- Background motion stays behind content.
- Mobile sections stack naturally without awkward blank areas.
- Reduced-motion mode is static and calm.
- Dark mode is navy-led and readable.
- Shared page shell, hero, eyebrow, focus and breakpoint styles are no longer copied across multiple pages.
- No duplicate components were introduced.
- No routes or verified content were lost.
- `npm test`, `npm run check` and `npm run build` pass.

## Final report format

Return:

1. Design diagnosis
2. Files changed
3. Shared utilities or components created
4. Duplicated code removed
5. Section transition map
6. Colour changes
7. Accessibility and performance decisions
8. Verification commands and results
9. Remaining limitations
