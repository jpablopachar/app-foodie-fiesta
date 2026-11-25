# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm run dev` — Vite dev server
- `npm run build` — production build
- `npm run lint` — ESLint (flat config; React hooks + react-refresh rules, Prettier-compatible)
- `npm run preview` — serve the production build

There is no test runner configured (the README mentions `node --test src/utils/cart.test.js`, but that file does not exist). `.env` is gitignored: it must define `VITE_SERVER_URL`, the backend base URL **including the `/api` prefix**. Prettier style (`.prettierrc`): no semicolons, single quotes, trailing commas, 100 columns, LF.

The backend lives in a sibling project, `app-foodie-fiesta-server`; the README describes a VS Code "Servidor y cliente" debug configuration that launches both.

## Architecture

Frontend-only React 19 + Vite SPA (plain JS/JSX, no TypeScript) styled with Tailwind CSS v4 (via `@tailwindcss/vite`). It is the client of the MERN "Foodie Fiesta" backend; the API base URL comes from `VITE_SERVER_URL` (`src/services/httpClient.js`, an axios instance that also exports `serverUrl`).

- **Entry/providers** (`src/main.jsx`): imports `./i18n` first, then wraps `<App>` in `BrowserRouter` → `ShopContextProvider`. `App.jsx` renders `DocumentLanguage`, `ToastContainer`, `Header` and all routes from the `ROUTES` constants (`src/constants/routes.js`): Login, Home, Menu, Contact, Cart, PlaceOrder, Orders and Verify.
- **Shop state** (`src/context/ShopContext.jsx`): single context holding cart (`cartItems`, shaped `{ [productId]: { [size]: quantity } }`), product list (`foods`), auth `token`, `currency`/`deliveryCharges` (from `src/constants/shop.js`), `navigate`, and actions (`addToCart`, `updateQuantity`, `getCartCount`, `getCartAmount`, `getProducts`, `getUserCart`). Cart changes are applied locally and synced to the API when a token exists. On mount it loads products and restores the token from localStorage (`src/utils/storage.js`), then fetches the user's cart. Components consume it via `useContext(ShopContext)`.
- **Services layer** (`src/services/*`): thin axios wrappers per domain (`cartService`, `productService`, `userService`, `orderService`); endpoint paths live in `src/constants/apiEndpoints.js`. Authenticated calls send the token in a `token` header. Responses follow `{ success, message, ... }`; failures are surfaced with `showError` from `src/utils/notifications.js` (react-toastify).
- **Orders/payments**: `PlaceOrder` supports cash on delivery and Stripe (`PAYMENT_METHODS`); Stripe redirects to the returned `session_url`, and `Verify` reads `success`/`orderId` from the query string to confirm payment, then navigates to Orders or Cart. `Orders` maps API values (`ORDER_PAYMENT_METHODS`, `ORDER_STATUSES`) to translated labels; unrecognized values are shown as returned.
- **Helpers**: `src/utils/cart.js` (`getCartProducts`, `calculateCartAmount` — pure functions that skip products no longer in the catalog); `src/hooks/useFoodFilters.js` (Menu search, category filter, `SORT_TYPES` ordering by first price, pagination of 10 items); `src/hooks/useLanguage.js`.
- **Static data** (`src/assets/data.jsx`): menu categories, footer contact info and social links; product images live in `src/assets`.
- **i18n** (Spanish `es` default / English `en`): `src/i18n/index.js` registers three namespaces (`common`, `home`, `auth`) from `src/i18n/locales/{es,en}/*.json`. Page texts for cart, contact, menu, orders and checkout live in the `common` namespace. Language choice is persisted in localStorage under `foodie-fiesta-language-preference`. Components never use raw key strings: they call `t(TRANSLATION_KEYS.<namespace>.<section>.<name>)` from `src/constants/translationKeys.js` with `useTranslation('<namespace>')`. Product names/descriptions and API error messages are not translated. Supported languages are defined in `src/constants/languages.js` (`DEFAULT_LANGUAGE` is `es`). When adding text, add the key to both locale JSON files and to `TRANSLATION_KEYS`; to add a language, update `languages.js`, `i18n/index.js` resources, and a new locale folder. `DocumentLanguage` syncs `<html lang>`; `LanguageSwitcher` is split into container + `LanguageSwitcherView`.
- **UI**: page-level components in `src/pages`, section/presentational components in `src/components` (e.g. `CartTotal`, `Item`, `Title`, `ContactDetail`, `TestimonialCard`).

## Conventions

- Code comments and JSDoc are written in Spanish; commit messages are also in Spanish.
- Prefer constants (routes, translation keys, endpoints, shop values in `shop.js`, login/sign-up modes in `states.js`) over inline literals.
- `.github/copilot-instructions.md` holds equivalent guidance for Copilot; keep both in sync when conventions change.
