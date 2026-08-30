# Fluvio Website Redesign Specification

## Purpose

Build a complete, production-ready Fluvio consultancy website using AstroWind as the structural foundation. The site must communicate scientific credibility, field capability and modern environmental technology while remaining easy for the Fluvio team to extend with new projects, people and expertise areas.

The redesign uses all relevant verified material from the archived Fluvio website in `../Old`, including project descriptions, team profiles, logo assets and original photography.

## Primary Outcomes

1. Establish Fluvio as a credible water, climate and environmental systems consultancy.
2. Help government, infrastructure, research and community partners understand what Fluvio does.
3. Demonstrate technical depth through real projects, field work and named specialists.
4. Give prospective partners a clear path to start a conversation.
5. Create a maintainable content structure for adding future projects, people and expertise areas.

## Audience

### Primary

- Government and public-sector program leads
- Infrastructure and development project teams
- Environmental and water managers
- Research institutions and technical partners
- Pacific-region organisations and community partners

### Secondary

- Prospective specialist collaborators
- Prospective employees and graduate talent
- Media and stakeholders researching Fluvio's work

## Positioning

Fluvio connects field science, monitoring technology, modelling and practical delivery to improve decisions about water and environmental systems.

The brand should feel:

- Expert but approachable
- Contemporary but not fashionable for its own sake
- Technical but never visually complicated
- Grounded in real landscapes, real equipment and real partnerships
- Confident enough to use whitespace and concise language

## Information Architecture

### Primary navigation

- Home: `/`
- Vision: `/vision`
- Expertise: `/expertise`
- Projects: `/projects`
- Team: `/team`
- Contact: `/contact`

The Expertise page includes a concise team introduction and the Team page presents the complete profile directory. `/about` redirects to `/vision` and `/services` redirects to `/expertise` to preserve useful template-era links.

### Project routes

Preserve the archived route slugs so existing links remain valid:

- `/advance-queensland`
- `/bina`
- `/monitoring-honiara`
- `/ghg-emissions-reservoirs`
- `/wrd`
- `/tina`
- `/sol-trader-oil-spill`
- `/cordap`
- `/reservoir-sedimentation`

### Supporting routes

- Custom not-found page at `/404`
- Privacy and terms pages may remain available when their content is accurate
- AstroWind demonstration landing pages, generic pricing pages and placeholder blog content must not appear in navigation or published sitemap output

## Visual Direction

### Foundation

Retain AstroWind's layout, routing, image optimisation, accessibility patterns and reusable component philosophy. Replace all AstroWind demonstration branding and generic marketing content.

### Professional reference qualities

The design takes cues from high-end technology consultancies:

- Generous whitespace
- Large, precise typography
- Short supporting paragraphs
- Editorial asymmetry on larger screens
- Small monospaced labels used sparingly
- Calm motion and clear navigation
- Minimal use of borders, shadows and decorative containers

The final result must remain recognisably Fluvio rather than copying another organisation's layout or identity.

### Photography

Original Fluvio photography is the principal visual language.

- Main images are large, high-resolution and given room to breathe.
- Images must never be covered by decorative technology overlays, pointer effects or dense text panels.
- Hero and project imagery use consistent aspect ratios and thoughtful focal positioning.
- Field work, landscapes, equipment and community partnership imagery take priority over generic illustrations.
- Team portraits use consistent crops without aggressive filters.
- Image captions and alt text explain the subject or project context.

### Background visual system

Hydrological and technology concepts appear only as background atmosphere:

- Soft diffusion fields inspired by water movement
- Low-contrast contour or ripple lines
- Sparse dot fields suggesting sensing networks
- Slow pointer-responsive movement within the page background
- No custom cursor
- No decorative layer may cross or obscure an image, card, button, form control or text block
- Background effects must be disabled or made static under `prefers-reduced-motion`
- Background effects must never block interaction or capture pointer events

### Colour

The core palette is restrained:

- Near-black green for primary text and dark surfaces
- Warm white for the main page background
- Water teal as the single primary accent
- Pale aqua and mineral grey for low-contrast backgrounds and rules
- Photography provides the majority of secondary colour

The site supports light and dark themes using AstroWind's existing theme system. Dark mode must remain calm, legible and photographic rather than becoming neon.

### Typography

- Use a modern geometric or humanist sans-serif for headings and body copy.
- Use a readable serif italic only for rare editorial emphasis inside major headings.
- Use a monospaced face only for occasional section labels, project metadata and technical facts.
- Keep body text at a comfortable reading width.
- Avoid excessive uppercase text.
- Avoid excessive rounded pills.

### Shape and depth

- Use one consistent modest radius for photographs and primary panels.
- Buttons may use a compact capsule shape.
- Cards should generally be flat with borders or surface contrast instead of heavy shadows.
- Elevation is reserved for navigation and rare focal content.

## Page Designs

### Home

The homepage follows a clear consultancy narrative:

1. Header with Fluvio logo, primary navigation and a Start a project action.
2. Editorial hero with the primary statement: "Technology for a more resilient water future."
3. Supporting copy explaining field science, sensing, modelling and environmental decision support.
4. Large, clean Fluvio landscape image as the dominant hero visual.
5. A compact capability strip covering monitoring systems, water modelling and project delivery.
6. Expertise introduction with three to five clear capability groups.
7. Featured projects using large alternating image and copy compositions, not a uniform card grid.
8. FluvioSense and FluvioCascade product or platform introduction.
9. Team credibility section with selected specialists and a path to the full team.
10. Partner and regional impact section using factual statements from the archived content.
11. Contact call to action and full footer.

### Vision

The Vision page explains why Fluvio exists and how it works.

- Open with a concise statement about healthier water systems and resilient communities.
- Use large documentary imagery.
- Present principles such as evidence, partnership, practical innovation and long-term capability.
- Explain Fluvio's Pacific and Australian context without overstating geographic reach.
- Include a final invitation to discuss a project or partnership.

### Expertise

The Expertise page groups services into understandable decision-oriented areas:

- Innovative hydrological monitoring
- Island-scale and catchment modelling
- Catchment and water resource management
- Blue carbon and greenhouse gas assessment
- Operational monitoring systems
- Sediment transport and reservoir assessment

Each area includes a short outcome statement, evidence from relevant projects and links to matching project routes.

The Team section follows the expertise content and includes all verified archived profiles:

- Simon Albert
- Alistair Grinham
- Nick Hutley
- Melanie Johnson
- Louis Ray
- Mandus Boselalu
- Mubashir Imran
- Yuval Kark-Levin
- Eric Cheung

Profile presentation must support a future role title, biography, portrait and external profile link without requiring component changes.

### Team

The Team page opens with a short statement about Fluvio's multidisciplinary approach, then presents all verified profiles with large, consistent portraits. Specialists may be grouped by discipline only when archived role and specialty information supports the grouping.

### Projects index

The project index is an editorial portfolio rather than a generic equal-card grid.

- One featured project uses a large landscape image and prominent summary.
- Remaining projects alternate image placement and layout rhythm.
- Project metadata may include location, discipline, partner and year only when verified.
- Projects are filterable only if verified categories are useful and the implementation remains accessible without client-side JavaScript.
- Every project has a clear detail link.

### Project detail

Every project route uses a shared data-driven template with:

1. Project title, concise outcome statement and verified metadata.
2. Large unoverlaid hero image.
3. Project challenge or context.
4. Fluvio approach and technical work.
5. Outcome, contribution or ongoing status based on archived facts.
6. Supporting image gallery when enough relevant images are available.
7. Related expertise and related projects.
8. Contact call to action.

The template must gracefully handle missing metadata or a limited image set.

### Contact

- Use concise invitation copy for projects and partnerships.
- Provide verified direct contact details if available in the archived content.
- Include the verified LinkedIn company link.
- Provide an accessible contact form interface.
- Do not claim the form sends messages until a working submission endpoint is configured.
- When no endpoint exists, use an explicit mail action or clearly state how the user can make contact.

### Not-found page

- Clearly state that the page could not be found.
- Provide links to Home, Expertise and Projects.
- Maintain the Fluvio visual system without adding novelty that distracts from recovery.

## Content Model

Use typed data modules or Astro content collections so content can be changed without editing page structure.

### Project fields

- `title`
- `slug`
- `summary`
- `location`
- `year`
- `disciplines`
- `partners`
- `heroImage`
- `heroAlt`
- `gallery`
- `challenge`
- `approach`
- `outcome`
- `featured`
- `relatedProjects`

All optional fields must be rendered conditionally.

### Team fields

- `name`
- `role`
- `bio`
- `portrait`
- `portraitAlt`
- `specialties`
- `profileUrl`

### Expertise fields

- `title`
- `slug`
- `summary`
- `description`
- `image`
- `relatedProjects`

## Reusable Components

Create focused Fluvio components that compose with AstroWind's layouts:

- Background atmosphere
- Section heading
- Large image feature
- Expertise list
- Featured project feature
- Project listing item
- Project metadata
- Team profile
- Platform feature
- Contact call to action

Avoid creating alternate components that duplicate AstroWind primitives without a clear need.

## Interaction and Motion

- Header remains clear and usable at every viewport.
- Mobile navigation uses AstroWind's existing accessible toggle pattern.
- Hover states clarify links and actions without moving content significantly.
- Background motion is slow, low-contrast and decorative.
- Project and team elements may use subtle entrance transitions through AstroWind's intersection pattern.
- Avoid scroll hijacking, custom cursors, looping interface animation and fake technical readouts.
- The site remains fully understandable when scripts are disabled.

## Responsive Behaviour

- Desktop hero is editorial and asymmetric.
- Mobile hero stacks copy, actions and the large image in a natural reading order.
- Navigation collapses into the AstroWind mobile menu.
- Project compositions become single-column without shrinking images into thumbnails.
- Team profiles use one column on small screens and two to three columns as space permits.
- Touch targets are at least 44 by 44 CSS pixels.
- Text never depends on text over photography for legibility.

## Accessibility

- Maintain semantic heading order and landmarks.
- All images have meaningful alt text or empty alt text when purely decorative.
- All controls work with keyboard navigation.
- Focus states remain clearly visible.
- Meet WCAG AA contrast for text and controls.
- Respect reduced motion and saved theme preferences.
- Do not rely on colour alone to communicate state.
- Forms have persistent visible labels and clear validation messages.

## Performance

- Use Astro's local image optimisation for Fluvio assets.
- Preload only the primary above-the-fold image and required fonts.
- Lazy load below-the-fold images.
- Keep background effects CSS-first with minimal JavaScript.
- Avoid adding a large animation library for background-only motion.
- Preserve static generation and keep the shipped JavaScript budget small.

## Search and Metadata

- Update site title, description, canonical origin and social metadata for Fluvio.
- Give every route a unique title and description.
- Use descriptive image metadata.
- Preserve archived project slugs.
- Add Organisation, ProfessionalService and project-relevant structured data only when values are verified.
- Generate sitemap and robots output from published Fluvio routes.
- Remove generic AstroWind demonstration metadata and content from indexable output.

## Extensibility

Adding a new project should require adding one typed data record and images, not writing a new page layout. Adding a team member or expertise area should follow the same principle.

Content field names, project slugs and asset paths must be documented in the project README. No external content management system is required for this version.

## Verification

Before completion:

- `npm run build` succeeds.
- `npm run check` succeeds.
- All required routes render without errors.
- Navigation and mobile menu work.
- Light and dark themes render correctly.
- Homepage, Expertise, Projects, one project detail page and Contact are visually inspected at desktop and mobile widths.
- There is no remaining AstroWind demo branding in visible pages or metadata.
- No decorative effect overlaps content elements.
- Reduced-motion mode removes nonessential motion.
- Links to project routes and contact destinations are valid.

## Non-Goals

- Building a custom content management system
- Creating unverified client logos, project statistics or awards
- Recreating the archived GoDaddy form backend
- Copying another organisation's site pixel for pixel
- Adding complex dashboards or fake environmental data displays
- Adding an animation framework where CSS can provide the approved effect
