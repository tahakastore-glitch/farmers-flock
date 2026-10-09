# FARMORA — Veterinary & Poultry Solutions

A responsive, front-end showcase concept for a fictional veterinary and poultry supplier serving business buyers in Pakistan. FARMORA, its catalog items, descriptions and inquiries are demonstration content only; this project does not represent a real registered company or make product, certification, partnership or treatment claims.

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

## What's included

- React 19, TypeScript (strict mode) and Vite, with responsive layouts from narrow mobile to desktop.
- Sticky responsive navigation, smooth section links, mobile menu, skip link, reduced-motion support and a back-to-top control.
- Searchable catalog with category filters, live result count, empty state, product detail dialog, Escape-to-close, focus trapping and focus restoration.
- Product and catalog inquiry CTAs that prefill the demo contact form.
- Client-side validation and explicit demo feedback. There is no backend: form details are not sent or stored.
- Optional WhatsApp link generation. Configure a verified international number in `src/config.ts`; it is intentionally empty by default. Without a valid number, the contact form fallback is shown.
- Search/social metadata, a custom SVG favicon and a project-specific social preview graphic.

## Configuration and assets

- Set `BUSINESS_WHATSAPP_NUMBER` in `src/config.ts` to a verified business number using country code and digits only. Do not use a personal or placeholder number.
- Connect `ContactForm` to a real endpoint or CRM before treating submissions as live. Update the on-page demo disclosure at the same time.
- Farm photography is loaded from Unsplash's image CDN. An in-layout fallback appears if an image cannot load; network access is needed to see the photos. Replace or self-host those images for a production site after confirming usage rights and image selections.
- Google Fonts (DM Sans and Playfair Display) are optional enhancements; the CSS includes system-font fallbacks.

## Checks

Run `npm.cmd run build` for the TypeScript project build and production bundle. There is no separate lint or test script in this starter.
