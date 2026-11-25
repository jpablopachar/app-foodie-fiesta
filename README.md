# React + Vite

## Organización del cliente

Los componentes y páginas utilizan los servicios de `src/services` para acceder a la API
configurada mediante `VITE_SERVER_URL` (incluido el prefijo `/api`). Las operaciones
reutilizables del carrito y las notificaciones están en `src/utils`, y los filtros del
menú en `src/hooks`.

Los textos de la interfaz están en `src/i18n/locales/es` y `src/i18n/locales/en`;
sus claves compartidas se declaran en `src/constants/translationKeys.js`. Los nombres
y descripciones de productos, estados no reconocidos y mensajes de error enviados por
la API se muestran tal como los devuelve el servidor.

Para comprobar los cálculos del carrito ejecuta `node --test src/utils/cart.test.js`.

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
