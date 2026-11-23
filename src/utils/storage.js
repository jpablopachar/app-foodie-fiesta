const TOKEN_KEY = 'token'

/**
 * Obtiene el token de autenticación almacenado.
 *
 * @returns {string|null} Token almacenado o null si no existe.
 */
export const getStoredToken = () => localStorage.getItem(TOKEN_KEY)

/**
 * Guarda el token de autenticación.
 *
 * @param {string} token - Token de autenticación.
 * @returns {void}
 */
export const setStoredToken = (token) => localStorage.setItem(TOKEN_KEY, token)

/**
 * Elimina el token de autenticación almacenado.
 *
 * @returns {void}
 */
export const removeStoredToken = () => localStorage.removeItem(TOKEN_KEY)
