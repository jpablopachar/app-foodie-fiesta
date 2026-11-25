# Repository Guidelines

## Project Structure & Module Organization

Foodie Fiesta is a React 19 single-page app built with Vite and Tailwind CSS v4. Routes live in `src/App.jsx`, with screens in `src/pages/` and reusable UI in `src/components/`. Shared product, cart, and session state lives in `src/context/ShopContext.jsx`. Keep reusable hooks in `src/hooks/` and shared helpers in `src/utils/`.

Keep API calls in `src/services/`, using the shared Axios client and endpoint constants. Put imported images in `src/assets/`, directly served assets in `public/`, and global styles in `src/index.css`.

## Build, Test, and Development Commands

- `npm ci` installs dependencies from the lockfile.
- `npm run dev` starts the Vite development server. Set `VITE_SERVER_URL` in a local `.env` to point to the separate backend. Keep local environment files and credentials out of Git.
- `npm run lint` checks JavaScript and JSX with ESLint, including React Hooks and Fast Refresh rules.
- `npm run build` generates the production bundle in `dist/`.
- `npm run preview` serves the built bundle locally for verification.

## Coding Style & Naming Conventions

Follow `.prettierrc` for two-space indentation, single quotes in JavaScript, trailing commas, LF endings, a 100-character print width, and omitted semicolons. Use PascalCase for component and page filenames, such as `CartTotal.jsx`, and the `use` prefix for hooks, such as `useFoodFilters.js`. Write component and page JSDoc and code comments in Spanish.

Reference shared routes and translation keys from `src/constants/`. Update both Spanish and English locale files under `src/i18n/locales/` when changing user-facing text.

## Testing Guidelines

The repository has no automated test runner or coverage threshold. Run lint and build before opening a pull request. Manually exercise affected flows in the browser, such as filtering and sorting the menu, updating the cart, or switching languages.

## Commit & Pull Request Guidelines

Write descriptive Spanish commit subjects that start with a verb, such as “Agrega opciones de ordenación de productos.” In pull requests, summarize the change and how you verified it. Link related issues when available and include screenshots for visible UI changes.
