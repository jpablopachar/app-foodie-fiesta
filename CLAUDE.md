# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm run dev` — Vite dev server
- `npm run build` — production build
- `npm run lint` — ESLint (flat config; React hooks + react-refresh rules, Prettier-compatible)
- `npm run preview` — serve the production build

There is no test runner configured. `.env` files are gitignored and none exist in the repo: create `.env` with `VITE_SERVER_URL` (backend base URL) to run against an API. Prettier style (`.prettierrc`): no semicolons, single quotes, trailing commas, 100 columns, LF.

## Architecture

Frontend-only React 19 + Vite SPA (plain JS/JSX, no TypeScript) styled with Tailwind CSS v4 (via `@tailwindcss/vite`). It is the client of a separate backend (MERN "Foodie Fiesta"); the API base URL comes from `VITE_SERVER_URL` (`src/services/httpClient.js`, an axios instance).

- **Entry/providers** (`src/main.jsx`): imports `./i18n` first, then wraps `<App>` in `BrowserRouter` → `ShopContextProvider`. `App.jsx` defines routes using the `ROUTES` constants (`src/constants/routes.js`); only Login and Home are implemented, the rest are commented-out placeholders.
- **Shop state** (`src/context/ShopContext.jsx`): single context holding cart, product list (`foods`), and auth `token`. It loads products on mount and restores the token from storage (`src/utils/storage.js`) then fetches the user's cart. Components consume it via `useContext(ShopContext)`.
- **Services layer** (`src/services/*`): thin axios wrappers per domain (cart, product, user); endpoint paths live in `src/constants/apiEndpoints.js`. Errors are surfaced via `src/utils/notifications.js` (react-toastify).
- **i18n** (Spanish `es` default / English `en`): `src/i18n/index.js` registers three namespaces (`common`, `home`, `auth`) from `src/i18n/locales/{es,en}/*.json`. Language choice is persisted in localStorage under `foodie-fiesta-language-preference`. Components never use raw key strings: they call `t(TRANSLATION_KEYS.<namespace>.<section>.<name>)` from `src/constants/translationKeys.js` (grouped by namespace) with `useTranslation('<namespace>')`. Supported languages are defined in `src/constants/languages.js` (`DEFAULT_LANGUAGE` is `es`). When adding text, add the key to both locale JSON files and to `TRANSLATION_KEYS`; to add a language, update `languages.js`, `i18n/index.js` resources, and a new locale folder. `DocumentLanguage` syncs `<html lang>`; `LanguageSwitcher` is split into container + `LanguageSwitcherView`, with `src/hooks/useLanguage.js`.
- **UI**: page-level components in `src/pages`, section/presentational components in `src/components`.

## Conventions

- Code comments and JSDoc are written in Spanish; commit messages are also in Spanish.
- Prefer constants (routes, translation keys, endpoints, shop values) over inline literals.
