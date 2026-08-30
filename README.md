# Fluvio Website

The Fluvio consultancy website: water, environmental and climate solutions grounded in field science, monitoring technology and practical delivery.

Built with [Astro](https://astro.build/) and Tailwind CSS on the AstroWind template foundation. The site is fully static, has no server runtime and no client-side framework.

## Commands

All commands run from the project root:

| Command           | Action                                                |
| ----------------- | ----------------------------------------------------- |
| `npm install`     | Install dependencies                                  |
| `npm run dev`     | Start the local dev server at `http://localhost:4321` |
| `npm test`        | Run the content and route contract tests              |
| `npm run check`   | Type-check, lint and verify formatting                |
| `npm run build`   | Build the production site into `./dist/`              |
| `npm run preview` | Preview the production build locally                  |
| `npm run fix`     | Auto-fix lint and formatting issues                   |

Run `npm test`, `npm run check` and `npm run build` after every content or code change. All three must pass before committing.

## Where content lives

All Fluvio content is typed data in `src/data/fluvio/`:

| File                           | Owns                                                                             |
| ------------------------------ | -------------------------------------------------------------------------------- |
| `src/data/fluvio/types.ts`     | The content interfaces (`Project`, `TeamMember`, `ExpertiseArea`, `SiteContent`) |
| `src/data/fluvio/site.ts`      | Site name, tagline, hero, vision statement and values                            |
| `src/data/fluvio/projects.ts`  | The project records and the `featuredProjects` selector                          |
| `src/data/fluvio/team.ts`      | The team profiles                                                                |
| `src/data/fluvio/expertise.ts` | The six expertise areas                                                          |

Images live in `src/assets/images/fluvio/` and are always referenced with the `~/assets/images/fluvio/...` alias. Pages and components read from these modules; never duplicate a record inside a page.

## Adding a project

1. Copy the project's hero image (and any gallery images) into `src/assets/images/fluvio/` with a descriptive kebab-case name, for example `project-my-catchment.jpeg`.
2. Append a new object to the `projects` array in `src/data/fluvio/projects.ts` that satisfies the `Project` interface in `src/data/fluvio/types.ts`:
   - `slug` becomes the public route (`/my-catchment`), served by `src/pages/[slug].astro`. Choose it once; do not rename existing slugs.
   - `challenge`, `approach` and `outcome` are arrays of paragraphs. Use only verified facts; do not invent statistics, partners or outcomes.
   - `heroAlt` must factually describe the photograph.
   - Optional fields: `location`, `timeframe`, `partners`, `gallery`, `relatedProjects` (other project slugs), `featured`.
3. Set `featured: true` only if the project should appear in the homepage selection.
4. If the project relates to an expertise area, add its slug to that area's `relatedProjects` in `src/data/fluvio/expertise.ts`.
5. If the test file pins the expected slug list (`expectedSlugs` in `tests/fluvio-content.test.mjs`), add the new slug there.
6. Run `npm test && npm run check && npm run build`.

No page changes are needed: `/projects` and the flat project route generate from the data.

## Adding a team member

1. Add a portrait to `src/assets/images/fluvio/` (descriptive name, for example `team-firstname-lastname.jpeg`).
2. Append a record to `teamMembers` in `src/data/fluvio/team.ts` satisfying the `TeamMember` interface: `name`, `bio`, `portrait`, `portraitAlt`, `specialties`, and optionally `role` and `profileUrl`.
3. Add the name to `expectedTeamNames` in `tests/fluvio-content.test.mjs` (the list order matches the page order).
4. Run `npm test && npm run check && npm run build`.

## Adding an expertise area

1. Add a representative image to `src/assets/images/fluvio/`.
2. Append a record to `expertiseAreas` in `src/data/fluvio/expertise.ts` satisfying the `ExpertiseArea` interface. `description` is an array of paragraphs; `relatedProjects` lists project slugs.
3. Update `expectedExpertiseTitles` and the expertise count assertion in `tests/fluvio-content.test.mjs`.
4. Run `npm test && npm run check && npm run build`.

## Languages and translations

The site ships in English (default, at the root), French (`/fr/...`) and Spanish (`/es/...`), with a language dropdown in the header.

- UI and page copy live in `src/i18n/en.ts` (canonical shape), `src/i18n/fr.ts` and `src/i18n/es.ts`. The French and Spanish catalogs are typed against the English one, so a missing string fails `npm run check`, and a test verifies key-for-key parity.
- Long-form content (project stories, team bios, expertise descriptions, site values) is translated as overlays in `src/data/fluvio/translations/fr.ts` and `es.ts`, keyed by project slug, expertise slug or team member name. `src/data/fluvio/localized.ts` merges them over the canonical English records.
- When adding a project, team member or expertise area, add the matching entries to both overlay files; the test suite fails if any record is missing a translation.
- Routes, slugs and images are shared across languages; only human-readable text is translated.

## Updating navigation and metadata

- Header and footer links: `src/navigation.ts`.
- Site name, default SEO metadata, Open Graph image and theme: `src/config.yaml`.
- Per-page titles and descriptions: the `metadata` object passed to `PageLayout` in each file under `src/pages/`.

## Contact endpoint (future work)

The Contact page (`src/pages/contact.astro` and `src/components/fluvio/ContactPanel.astro`) currently opens a clearly described, unaddressed email draft because the archive contains no verified public business address. To wire up a real endpoint later:

1. Obtain a verified recipient address or a form-handling endpoint from Fluvio.
2. Replace the draft action in `ContactPanel.astro` with either a `mailto:` link to the verified address or a `POST` form to the verified endpoint.
3. Do not add attachment uploads, privacy promises or response-time promises unless Fluvio has confirmed them.
4. Update the contact assertions in `tests/fluvio-content.test.mjs` to match the new behaviour.

## Routes

Public routes: `/`, `/vision`, `/expertise`, `/projects`, `/team`, `/contact`, the nine flat project routes generated from `src/data/fluvio/projects.ts`, a custom 404, and permanent redirects `/about -> /vision` and `/services -> /expertise`. The template blog is disabled in `src/config.yaml` and its demonstration pages have been removed.

## Tests

`tests/fluvio-content.test.mjs` is the single lean contract file, run with the built-in Node test runner. It pins the content records, routes, accessibility behaviour of the hero slider and the absence of template demonstration content. Keep tests in this file; do not add a browser automation framework for this static site.

## Acknowledgements

Based on the open-source [AstroWind](https://github.com/arthelokyo/astrowind) template by onWidget, used under the MIT licence (see `LICENSE.md`).
