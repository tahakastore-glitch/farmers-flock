# FARMORA — A Digital Showcase for Farm Care

A responsive, front-end showcase concept for a fictional veterinary and poultry business serving buyers in Pakistan. FARMORA, its catalog items, industry stories and inquiry content are demonstration material only. This project does not represent a real registered company or make product, treatment, certification, customer, partnership or company-history claims.

## Run locally

Requires Node.js 20.19+ or 22.12+.

```bash
npm.cmd install
npm.cmd run dev
```

Vite prints the local development URL (normally `http://localhost:5173`). To make and preview a production build:

```bash
npm.cmd run build
npm.cmd run preview
```

To redeploy, run `npm.cmd run build` and publish the generated `dist/` directory to your static hosting provider. Configure the provider to serve `dist/index.html` as the site entry point.

## What's included

- React 19, strict TypeScript and Vite, with responsive layouts for phones, tablets and desktops.
- A photographic editorial hero, reusable scroll-reveal motion, an interactive industry selector, a step-by-step buyer journey, a possible-services showcase and an accessible FAQ accordion.
- Sticky responsive navigation with active section states, an Escape-close mobile menu, a skip link, reduced-motion support and a back-to-top control.
- Searchable sample catalog with category filters, live result count, empty state, product detail dialog, Escape-to-close, focus trapping, focus restoration and an animated close transition.
- Product and project inquiry actions that prefill the demo form. Client-side validation provides feedback; there is no backend and form details are not sent or stored.
- Optional WhatsApp link generation. `BUSINESS_WHATSAPP_NUMBER` in `src/config.ts` is intentionally empty; a verified business number must be supplied before enabling that link.
- Search/social metadata, a custom SVG favicon and a project-specific social preview graphic.

## Configuration and assets

- Set `BUSINESS_WHATSAPP_NUMBER` in `src/config.ts` to a verified business number using country code and digits only. Do not use a personal or placeholder number.
- Connect `ContactForm` to a real endpoint or CRM before treating submissions as live. Update the on-page demo disclosure at the same time.
- Farm photography is loaded responsively from Unsplash's image CDN. An in-layout fallback appears if an image cannot load; network access is needed to see the photos. Confirm image selection and usage rights, or replace/self-host the images, before production.
- Google Fonts (DM Sans and Playfair Display) are optional enhancements; the CSS includes system-font fallbacks.

## Checks

`npm.cmd run build` runs the TypeScript project build and creates the production bundle. There is no separate lint or test script configured in this project.
