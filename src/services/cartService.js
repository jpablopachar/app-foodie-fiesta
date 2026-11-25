import { API_ENDPOINTS } from '../constants/apiEndpoints'
import httpClient from './httpClient'

/**
 * Añade un producto al carrito del usuario.
 *
 * @param {string} itemId - Identificador del producto.
 * @param {string} size - Talla o tamaño seleccionado.
 * @param {string} token - Token de autenticación del usuario.
 * @returns {Promise} Respuesta de la solicitud HTTP.
 */
export const addCartItem = (itemId, size, token) =>
  httpClient.post(API_ENDPOINTS.ADD_CART, { itemId, size }, { headers: { token } })

/**
 * Obtiene el carrito del usuario autenticado.
 *
 * @param {string} token - Token de autenticación del usuario.
 * @returns {Promise} Respuesta de la solicitud HTTP.
 */
export const getUserCart = (token) =>
  httpClient.post(API_ENDPOINTS.GET_CART, {}, { headers: { token } })

/**
 * Actualiza la cantidad de un producto del carrito.
 * @param {string} itemId - Identificador del producto.
 * @param {string} size - Tamaño seleccionado.
 * @param {number} quantity - Cantidad nueva.
 * @param {string} token - Token de autenticación.
 * @returns {Promise} Respuesta de la solicitud.
 */
export const updateCartItem = (itemId, size, quantity, token) =>
  httpClient.post(API_ENDPOINTS.UPDATE_CART, { itemId, size, quantity }, { headers: { token } })
