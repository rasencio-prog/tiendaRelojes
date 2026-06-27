# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Start dev server (http://localhost:5173)
npm run build     # Production build → dist/
npm run preview   # Preview the production build
npm run lint      # Run ESLint
```

No test suite is configured.

## Architecture

Single-page React 19 app built with Vite 8, Tailwind CSS 4 (via Vite plugin), React Router 7, and Axios. The backend is a separate Laravel API at `http://localhost:8000` (configured via `VITE_API_URL` in `.env`).

### Route structure

- `/` — public storefront (single-page scroll layout)
- `/admin/login` — unauthenticated login page
- `/admin/*` — protected admin panel (requires Bearer token in `localStorage` under `admin_token`)

### Key layers

**`src/services/api.js`** — single Axios instance with base URL `$VITE_API_URL/api`. An interceptor injects the `admin_token` Bearer header on every request. All API calls live here: auth (`/auth/login|logout|me`), productos, users, contactos, solicitudes-venta, and pedidos. Product mutations use `multipart/form-data` with `_method: PUT` for updates (Laravel method spoofing).

**`src/context/`** — two React contexts:
- `AuthContext` — stores the logged-in admin user, exposes `loginSuccess(token, user)` and `logoutUser()`. Restores session on mount by calling `/auth/me` if a token is found.
- `CartContext` — cart state (items + qty) and `cartOpen` drawer toggle. Cart is in-memory only (not persisted). Submitting a cart calls `crearPedido` in the API.

**`src/components/`** splits into:
- `layout/` — Navbar, Hero, AboutSection, ContactSection, Footer
- `watches/` — ProductGrid, ProductCard, OffersSection, SellSection
- `cart/` — CartDrawer (slide-in panel)
- `ui/` — WhatsAppFAB (floating action button)
- `admin/` — AdminLayout (sidebar shell), RequireAuth (redirect guard)

**`src/pages/admin/`** — Dashboard, ProductoList/Form, UserList/Form. Forms handle both create and edit based on whether `:id` param is present.

**`src/hooks/useFetch.js`** — generic data-fetching hook wrapping any `fetchFn`. Handles loading/error state and cancellation on unmount.

**`src/data/products.js`** — static fallback product list used in the public storefront when the API is unavailable. Contains `formatPrice` helper for CLP currency formatting.

### Styling

Tailwind CSS 4 with the Vite plugin (no `tailwind.config.js` needed). Global dark-theme base styles in `src/index.css`. The storefront background is `#0a0a0a` with `#f5f5f5` text, set inline on the root div.
