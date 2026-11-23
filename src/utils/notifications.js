import { toast } from 'react-toastify'

/**
 * Muestra una notificación de error.
 *
 * @param {string} message - Mensaje que se mostrará.
 * @returns {string|number} Identificador de la notificación.
 */
export const showError = (message) => toast.error(message)
