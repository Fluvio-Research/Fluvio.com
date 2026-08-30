# Fluvio Website Project Handoff

## Objective

Complete and polish the new Fluvio consultancy website in:

```text
/Users/muhammadimran/Mubashir/FluvioWebsite/New
```

The website uses AstroWind as its technical foundation and verified Fluvio material from:

```text
/Users/muhammadimran/Mubashir/FluvioWebsite/Old
```

The target is a modern, professional water and environmental technology consultancy site with large real photography, strong editorial pacing, engaging but accessible interaction and an extensible content model.

## Current branch and preview

Branch:

```text
feature/fluvio-site
```

Current committed head:

```text
8f2e329 docs: add transition polish brief
```

Live development preview:

```text
http://localhost:4321/
```

## User-approved direction

- Keep AstroWind as the foundation.
- Use current Fluvio content, projects, team profiles and original images.
- Make primary images large and clean.
- Never place decorative effects, technical overlays or text over photographs.
- Keep water and technology motion in background gutters and negative space.
- Keep the normal operating-system cursor.
- Use a professional visual standard influenced by Ibtidah's spacing, typography and restrained pacing without copying it.
- Keep the top hero slider.
- Make interaction modern, engaging and accessible.
- Keep tests lean because this is a static frontend.
- Replace the green-dominant visual theme with a controlled multi-colour water and field palette.
- Improve transitions between homepage sections.
- Avoid duplicate components and repeated page CSS.

## Completed work

### 1. Design and architecture

Completed documents:

- `docs/superpowers/specs/2026-08-30-fluvio-website-redesign-design.md`
- `docs/superpowers/plans/2026-08-30-fluvio-website-redesign.md`
- `docs/handoff/fluvio-section-transition-polish-brief.md`

The transition brief is the detailed source for the final visual pass. Read it completely before changing page styling.

### 2. Typed content and asset library

Completed and reviewed:

- `src/data/fluvio/types.ts`
- `src/data/fluvio/site.ts`
- `src/data/fluvio/expertise.ts`
- `src/data/fluvio/team.ts`
- `src/data/fluvio/projects.ts`
- `src/assets/images/fluvio/`

Content includes:

- Nine project records
- Nine team profiles
- Six expertise areas
- FluvioSense and FluvioCascade descriptions
- Twenty-seven curated and descriptively renamed local images

Do not duplicate these records inside pages or components.

### 3. Global Fluvio shell

Completed and reviewed:

- Fluvio logo and metadata
- Primary navigation
- Sticky header and mobile menu
- Footer and LinkedIn destination
- Typography and colour tokens
- Background-only hydrological atmosphere
- Shared `SectionHeading.astro`

Important files:

- `src/components/fluvio/PageBackground.astro`
- `src/components/fluvio/SectionHeading.astro`
- `src/components/CustomStyles.astro`
- `src/assets/styles/tailwind.css`
- `src/components/widgets/Header.astro`
- `src/components/widgets/Footer.astro`
- `src/layouts/Layout.astro`
- `src/layouts/PageLayout.astro`
- `src/navigation.ts`
- `src/config.yaml`

### 4. Project experience

Completed and reviewed:

- `/projects`
- All nine legacy flat project routes
- Shared project detail route in `src/pages/[slug].astro`
- Large responsive local images
- Related expertise and projects
- Optional metadata and galleries
- FluvioSense and FluvioCascade presentation

Reusable components:

- `LargeImage.astro`
- `ExpertiseList.astro`
- `ProjectFeature.astro`
- `ProjectListItem.astro`
- `ProjectMeta.astro`
- `TeamProfile.astro`
- `PlatformFeature.astro`
- `ContactPanel.astro`

Project routes that must remain unchanged:

```text
/advance-queensland
/bina
/monitoring-honiara
/ghg-emissions-reservoirs
/wrd
/tina
/sol-trader-oil-spill
/cordap
/reservoir-sedimentation
```

### 5. Primary pages and hero slider

Completed and reviewed:

- `/`
- `/vision`
- `/expertise`
- `/projects`
- `/team`
- `/contact`
- Custom 404 page
- Permanent `/about` to `/vision` redirect
- Permanent `/services` to `/expertise` redirect

The homepage hero slider includes:

- Three real Fluvio images
- Separate copy and image regions
- Previous and next controls
- Keyboard Arrow, Home and End behavior
- Slide count and progress
- Accessible live announcements for manual changes
- Silent automatic changes
- Persistent Pause and Resume control
- Eight-second autoplay
- Hover and focus suspension
- Reduced-motion static mode

Do not rebuild or replace `src/components/fluvio/HeroSlider.astro` unless fixing a verified defect.

## Review history

All completed production packages passed independent specification and code-quality review after corrections.

Key reviewed fixes include:

- Exact expertise labels and exact content contracts
- Correct effective homepage metadata
- Responsive image `sizes`
- One meaningful project action per item
- Accessible platform navigation
- Correct carousel region role
- Persistent playback control
- Silent automatic carousel announcements
- Correct action-label pattern without `aria-pressed`

## Current uncommitted state

The active cleanup task was interrupted at the user's request.

Current uncommitted production change:

```text
M tests/fluvio-content.test.mjs
```

That partial change adds a lean repository scan for remaining demonstration strings and public routes. It is intended for the cleanup task and will fail until the generic template pages and blog content are removed or disabled.

Do not discard this change. Continue and complete it as part of Remaining Task 1 below.

The untracked `.superpowers/brainstorm/` directory contains local visual-companion artifacts. It is not production website code and should not be committed.

## Remaining Task 1: Clean public demonstration content

Read:

```text
docs/superpowers/plans/2026-08-30-fluvio-website-redesign.md
```

Complete Task 5.

Delete or disable the remaining public template surfaces:

```text
src/pages/homes/
src/pages/landing/
src/pages/pricing.astro
src/pages/[...blog]/
src/data/post/
```

Then:

1. Disable generic blog output in `src/config.yaml`.
2. Remove RSS and blog references from public navigation and output if any remain.
3. Finish the partial no-demo assertion in `tests/fluvio-content.test.mjs`.
4. Update `README.md` with exact instructions for adding projects, team members, expertise areas and a future contact endpoint.
5. Keep tests in the existing file. Do not add a new testing framework.
6. Run `npm test`, `npm run check` and `npm run build`.
7. Commit the cleanup as one scoped change.

Known current formatting blocker:

```text
src/data/post/markdown-elements-demo-post.mdx
```

Removing the generic post collection should remove that parser failure.

## Remaining Task 2: Improve section transitions and remove green dominance

Read this entire brief first:

```text
docs/handoff/fluvio-section-transition-polish-brief.md
```

This is the main visual work still required.

### Colour direction

Use:

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

- Warm white and soft mist lead page backgrounds.
- Navy leads typography, navigation and dark chapter sections.
- Blue and teal communicate water and technology.
- Mineral blue supports technical detail.
- Silt adds landscape warmth.
- Coral is rare and high-attention.
- Green remains primarily in photography.
- Use one supporting accent per section.
- Dark mode remains navy-led.

### Transition and deduplication goal

The homepage currently feels like a stack of sections with repeated spacing.

Improve it through one shared transition and section-framing system. Do not add a separate component for every transition.

The detailed brief recommends:

```text
src/components/fluvio/SectionFrame.astro
```

Use it only if it reduces real duplication.

The duplicated styles that must be consolidated are currently found across:

- `src/pages/vision.astro`
- `src/pages/expertise.astro`
- `src/pages/team.astro`
- `src/pages/contact.astro`

Repeated concerns:

- Shell width
- Editorial hero spacing
- Eyebrow styling
- Page title scale
- Intro width
- Focus-visible treatment
- Desktop/mobile breakpoint rules

Move truly shared layout and typography rules into `src/assets/styles/tailwind.css`, or use one shared semantic component. Do not create both for the same responsibility.

### Transition acceptance

The homepage should read as one continuous story:

1. Hero to capability strip: soft mist field and one water-blue rule.
2. Capabilities to Expertise: paper with a mineral-blue background field entering from an outer gutter.
3. Expertise to Projects: strongest editorial handoff through background contour whitespace, never over the project image.
4. Projects to Platforms: paper to pale water or mineral blue with a sparse technical background.
5. Platforms to Team: return to paper and human photography with more breathing room.
6. Team to Impact: deep navy chapter break with white text and one blue or coral rule.
7. Impact to Contact: warm white or pale silt closing handoff.

Do not animate text, images, cards or buttons across boundaries. Decorative motion stays in background gutters.

## Remaining Task 3: Final verification and review

After cleanup and visual polish:

1. Run `npm test`.
2. Run `npm run check`.
3. Run `npm run build`.
4. Inspect Home, Vision, Expertise, Projects, Team, Contact and `/tina`.
5. Inspect at approximately 1440px, 1024px and 390px widths.
6. Verify light theme, dark theme and reduced-motion mode.
7. Verify mobile navigation and slider Pause/Resume behavior.
8. Confirm no decorative layer touches images, text, buttons or cards.
9. Confirm no visible generic template branding remains.
10. Perform one final independent whole-branch review.

## Known limitations and decisions

### Contact

The archive contains no verified public business email address. The Contact page therefore opens a clearly described unaddressed draft rather than pretending a form was submitted.

Do not add a recipient, server action, attachment upload, privacy promise or response-time promise without verified information.

### Build warning

The build currently warns that `src/icons` does not exist. This warning is optional and does not fail the build. A future worker may create the expected local icon directory or adjust the integration configuration if the warning can be removed without adding unused assets.

### Tests

Keep one lean content and route contract file:

```text
tests/fluvio-content.test.mjs
```

Do not add browser automation or a large testing framework for this static site unless a real interaction regression cannot be protected another way.

## Important source references

- [Current Fluvio website](https://fluvio.com.au/)
- [Fluvio projects](https://fluvio.com.au/projects)
- [Fluvio expertise](https://fluvio.com.au/expertise)
- [Fluvio vision](https://fluvio.com.au/vision)
- [Ibtidah visual reference](https://ibtidah.com/)
- [AstroWind repository](https://github.com/arthelokyo/astrowind)

## Commit history for completed work

```text
8f2e329 docs: add transition polish brief
d775c00 fix: use carousel action labels
67e6e40 fix: improve carousel rotation controls
d7cc521 feat: complete Fluvio consultancy pages
66c5a1c fix: make project actions interactive
d304ff6 fix: refine project image sizing and links
d553581 feat: build Fluvio project experience
84bf81c docs: refine interaction direction
ff7f069 fix: correct Fluvio homepage metadata
3453fce feat: establish Fluvio brand shell
73820af test: strengthen Fluvio content contracts
167546e feat: add Fluvio content foundation
eabc992 docs: add Fluvio redesign specification
```

## Ready-to-use continuation prompt

```text
Continue the Fluvio website in /Users/muhammadimran/Mubashir/FluvioWebsite/New on branch feature/fluvio-site.

Read these files completely before making changes:
1. docs/handoff/fluvio-project-handoff.md
2. docs/handoff/fluvio-section-transition-polish-brief.md
3. docs/superpowers/specs/2026-08-30-fluvio-website-redesign-design.md
4. docs/superpowers/plans/2026-08-30-fluvio-website-redesign.md

Preserve all completed Fluvio content, routes, components and hero-slider accessibility behavior. Do not discard the current uncommitted change in tests/fluvio-content.test.mjs. First finish the interrupted public-demo cleanup task. Then complete the multi-colour section-transition and deduplication pass exactly as specified in the transition brief. Keep photographs large and clean, keep decorative motion behind content, keep tests lean and do not invent facts or contact details.

Run npm test, npm run check and npm run build after each remaining package. Finish with desktop, tablet, mobile, dark-theme and reduced-motion inspection, then perform a whole-branch review.
```
