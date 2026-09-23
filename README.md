# Perfume Network — Fine Fragrance Boutique

A modern, fully responsive perfume e-commerce storefront built with React, Vite,
and React Router. It includes product browsing, favorites, a shopping cart, a
WhatsApp-based checkout, a contact form that sends enquiries over WhatsApp, and a
protected admin panel.

## Features

- **Storefront** — home, category pages (Designer, Middle Eastern, Minis,
  Accessories), Weekly Edit blog with a read-article modal, sampling, and contact.
- **Product cards** — real perfume imagery with an interactive 3D tilt-on-hover
  effect, add-to-cart, and favorite (wishlist) toggles.
- **Cart** — slide-in drawer with quantity controls, live totals, and free-shipping
  logic. Persisted to `localStorage`.
- **Favorites** — save products and view them on a dedicated Favorites page.
- **Checkout** — validated address form. On submit, a formatted order (items,
  quantities, prices, delivery address) is sent to the store's WhatsApp number and
  the user lands on an order-success page.
- **Contact** — the contact form composes a WhatsApp message with the enquiry.
- **Auth** — modern login and register screens with a unified sign-in that routes
  admins to the admin panel and customers to the storefront.
- **Admin panel** — dashboard, products, orders, customers, and settings, protected
  behind admin login.
- **Polish** — smooth scroll, scroll-reveal animations, sticky header/nav, favicon,
  and Open Graph / Twitter social preview image.

## Tech Stack

- React 19
- React Router 7
- Vite 8
- Plain CSS (design tokens in `src/App.css`)

## Getting Started

```bash
npm install      # install dependencies
npm run dev      # start the dev server (http://localhost:5173)
npm run build    # production build into dist/
npm run preview  # preview the production build
npm run lint     # run ESLint
```

## Login Credentials (demo)

The auth is a front-end demo — there is no backend. Credentials are hardcoded in
`src/context/AuthContext.jsx`.

### Admin

| Field    | Value                      |
| -------- | -------------------------- |
| Email    | `admin@perfumenetwork.in`  |
| Password | `admin@123`                |

Signing in with these routes to the **admin panel** (`/admin`). The admin login can
also be reached directly at `/admin/login`.

### Customer

Any valid email address with a password of **6 or more characters** signs in as a
customer and returns to the storefront home page. For example:

| Field    | Value             |
| -------- | ----------------- |
| Email    | `you@example.com` |
| Password | `any 6+ chars`    |

## Configuration

Store settings live in `src/config.js`:

```js
export const WHATSAPP_NUMBER = '919876543210' // your number, intl format, no +
export const STORE_NAME = 'Perfume Network'
export const SHIPPING_FEE = 149
export const FREE_SHIPPING_THRESHOLD = 5000
```

> **Important:** Set `WHATSAPP_NUMBER` to your own number in full international
> format with no `+`, spaces, or dashes (e.g. `+91 98765 43210` → `919876543210`).
> Both checkout orders and contact-form enquiries are sent to this number.

## Architecture

The app uses a **feature-based architecture** with path aliases and barrel
exports. Code is grouped by domain (what it does) rather than by file type, so
each feature is self-contained and easy to reason about.

Import anything via the `@/` alias (maps to `src/`), and import features through
their barrel — e.g. `import { useStore } from '@/features/cart'`.

```
public/
  products/            hand-built SVG bottle illustrations (per product)
  favicon.svg          branded favicon
  og-image.png         social share image (1200×630)
scripts/
  gen-bottles.mjs      generates the product bottle SVGs
  gen-images.mjs       regenerates PNG assets from SVG sources (uses sharp)
src/
  app/                 composition root
    App.jsx              <AppProviders><AppRoutes /></AppProviders>
    AppProviders.jsx     all global context providers
    AppRoutes.jsx        centralized route table (uses ROUTES + feature barrels)
    PublicLayout.jsx     storefront shell (header/nav/footer/cart) via <Outlet />
  components/          shared, cross-feature components
    layout/              Header, Navigation, Footer, AnnouncementBar
    ui/                  Reveal, ScrollToTop (presentation-only primitives)
  features/           domain modules, each with an index.js barrel
    auth/                AuthContext + Login/Register/AdminLogin pages
    cart/                StoreContext (cart + favorites state) + CartDrawer
    catalog/             product data, ScentCard, CategoryPage + category pages
    checkout/            Checkout + Success pages, WhatsApp order builder
    favorites/           Favorites page
    admin/               admin layout + dashboard/products/orders/etc.
    marketing/           Home sections, Weekly Edit, Sampling, Contact, Track Order
  lib/                app-wide primitives (no UI)
    config.js            store configuration
    routes.js            ROUTES — single source of truth for paths
    format.js            formatPrice and other formatters
    index.js             barrel
  styles/             global styles
    base.css             reset + base element styles
    app.css              design tokens + all component styles
    index.css            entry that @imports base then app
  main.jsx            React entry point
```

### Conventions

- **Path alias:** `@/` → `src/` (configured in `vite.config.js` and `jsconfig.json`).
- **Barrels:** every feature and shared folder exposes a public API via `index.js`.
  Import from the barrel (`@/features/catalog`), not deep paths.
- **Routes:** never hardcode path strings — use `ROUTES` from `@/lib`.
- **Composition:** providers live in `app/AppProviders`, routes in `app/AppRoutes`,
  keeping `App.jsx` a trivial three-line composition root.

## Products & Images

All products are defined in `src/data/products.js`. Product images are elegant,
hand-built **SVG bottle illustrations** in `public/products/`, generated by
`scripts/gen-bottles.mjs`. Because they are vectors, they always render correctly,
stay on-brand, and never depend on external stock photos. To tweak or add bottles,
edit the recipes in that script and re-run:

```bash
node scripts/gen-bottles.mjs
```

To use your own product photography instead, drop image files into
`public/products/` and update the `image` paths in `src/data/products.js`.

Social/OG and touch-icon PNGs can be regenerated from the SVG sources with:

```bash
node scripts/gen-images.mjs
```

## Notes

- This is a front-end demo: authentication, orders, and the admin panel are not
  backed by a server. Orders and enquiries are delivered via WhatsApp deep links.
