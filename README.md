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

All Fluvio content is localized JSON in `src/data/fluvio/content/`, one file per record with `en`, `fr` and `es` sections side by side:

| Location                       | Owns                                                    |
| ------------------------------ | ------------------------------------------------------- |
| `content/projects/*.json`      | The nine project records                                |
| `content/team/*.json`          | The nine team profiles                                  |
| `content/expertise/*.json`     | The six expertise areas                                 |
| `content/site/content.json`    | Site name, tagline, vision statement and values         |
| `content/site/navigation.json` | Header menu labels, footer labels and the LinkedIn link |

`src/data/fluvio/store.ts` loads these files, validates every record in every locale against a zod schema (an invalid record fails `npm test` and the build), and exposes the typed accessors the pages use. `types.ts` holds the interfaces. Images live in `src/assets/images/fluvio/` and are referenced with the `~/assets/images/fluvio/...` alias.

## Editing content without code

The content admin lives in the private `Fluvio-Research/Webiste-CMS` repository, with language tabs for English, Solomon Islands Pijin, French and Spanish. Two ways to use it:

- Locally: clone `Webiste-CMS` next to this repository and run `npm run cms` there. Choose **Work with Local Repository** and select this repository's folder; edits are written to the JSON files in your working tree. Review with `git diff`, then commit and push.
- Hosted: `https://data.fluvio.com.au/fluvio-cms/` (behind the Grafana login on that server) edits this repository on GitHub directly; sign in with a GitHub access token.

## Adding a project, team member or expertise area

Use the admin (`npm run cms`, above), or edit the JSON directly:

1. Add images to `src/assets/images/fluvio/` with descriptive kebab-case names.
2. Create the record in the matching `src/data/fluvio/content/` folder, filling `en`, `pijin`, `fr` and `es`. For projects, `slug` becomes the public route and must never change after publishing; `challenge`, `approach` and `outcome` are arrays of paragraphs, and only verified facts belong in them.
3. Set the `order` field to control display position, and `featured: true` on a project to place it in the homepage selection.
4. Update the pinned lists in `tests/fluvio-content.test.mjs` (`expectedSlugs`, `expectedTeamNames`, `expectedExpertiseTitles`, and counts).
5. Run `npm test && npm run check && npm run build`.

No page changes are needed: every route generates from the content store.

## Languages and translations

The site ships in English (default, at the root), Solomon Islands Pijin (`/pijin/...`), French (`/fr/...`) and Spanish (`/es/...`), with a language dropdown in the header.

- UI and page copy (headings, ledes, slider slides, labels) live in the content store under `src/data/fluvio/content/site/`, with one section per locale. The store schema requires every string in every locale, so a missing translation fails `npm test` and the build, and a test verifies key-for-key parity. The locale list itself lives in `src/i18n/index.ts` and `src/data/fluvio/store.ts`.
- Content records carry their own translations: each JSON file in `src/data/fluvio/content/` holds `en`, `pijin`, `fr` and `es` sections, validated together by the store's schema.
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
