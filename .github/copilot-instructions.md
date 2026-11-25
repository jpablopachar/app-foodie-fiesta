# GitHub Copilot Instructions

## Scope and technology

- This repository contains the Foodie Fiesta frontend: a single-page application built with React 19, JavaScript/JSX, and Vite. The backend is not part of this repository.
- The UI uses Tailwind CSS v4 through `@tailwindcss/vite`. Global styles, the theme, and shared utilities are defined in `src/index.css`.
- The client connects to a separate backend using Axios. Configure the base URL with `VITE_SERVER_URL`; `.env` files are excluded from Git.

## Structure and patterns

- `src/main.jsx` initializes i18n and mounts the app with `BrowserRouter` and `ShopContextProvider`. Preserve this provider order when changing the entry point.
- `src/App.jsx` defines routes using `ROUTES` from `src/constants/routes.js`. Check whether a route and its page are implemented before adding to them: some navigation routes are placeholders or do not yet have an associated page.
- `src/pages/` contains pages; `src/components/` contains UI components and reusable sections.
- `src/context/ShopContext.jsx` centralizes shared product, cart, and session state. Reuse this context in components instead of duplicating that state.
- Extract reusable presentation into components, shared pure logic into `src/utils/`, and reusable stateful UI logic into custom hooks in `src/hooks/` when appropriate.
- Use `src/utils/storage.js` for authentication token storage instead of accessing `localStorage` directly. Language persistence remains managed by i18n.
- Keep HTTP calls in `src/services/`, grouped by domain. Define API paths in `src/constants/apiEndpoints.js` and reuse the configured client in `src/services/httpClient.js`; do not scatter endpoint URLs across components.
- Follow the existing API error-handling pattern: log errors where appropriate and display them using notifications from `src/utils/notifications.js`.
- Use `src/constants/` for shared values such as routes, endpoints, states, fees, and translation keys instead of repeating literals.

## Languages and content

- The supported languages are Spanish (`es`, the default) and English (`en`). Language configuration, resources, and persistence are handled in `src/constants/languages.js` and `src/i18n/`.
- For UI text, use `useTranslation` with the appropriate namespace and keys from `TRANSLATION_KEYS` in `src/constants/translationKeys.js`; avoid hard-coded translatable text in JSX.
- When adding or changing a translation key, update both locale resources (`src/i18n/locales/es/` and `src/i18n/locales/en/`) and its entry in `TRANSLATION_KEYS`. When adding a language, also update the supported language list and register its resources in `src/i18n/index.js`.
- `DocumentLanguage` synchronizes the active language with `document.documentElement.lang`; preserve this behavior when modifying language initialization.

## Style and validation

- Follow `.prettierrc`: no semicolons, single quotes in JavaScript, trailing commas, a 100-character line width, and LF line endings. ESLint is configured in `eslint.config.js`; follow its React Hooks and Fast Refresh rules.
- Document every component and page with JSDoc in Spanish, matching the existing codebase. Write other code comments and JSDoc in Spanish as well.
- Run `npm run lint` and `npm run build` to validate changes. This project does not have a test runner configured.
- To run the app against the backend, set `VITE_SERVER_URL` in a local `.env` file; do not add that file or credentials to the repository.