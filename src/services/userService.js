import { API_ENDPOINTS } from '../constants/apiEndpoints'
import httpClient from './httpClient'

/**
 * Registra un usuario nuevo.
 *
 * @param {{ name: string, email: string, password: string }} user - Datos del usuario.
 * @returns {Promise} Respuesta de la solicitud HTTP.
 */
export const registerUser = ({ name, email, password }) =>
  httpClient.post(API_ENDPOINTS.USER_REGISTER, { name, email, password })

/**
 * Inicia sesión con las credenciales del usuario.
 *
 * @param {{ email: string, password: string }} credentials - Credenciales del usuario.
 * @returns {Promise} Respuesta de la solicitud HTTP.
 */
export const loginUser = ({ email, password }) =>
  httpClient.post(API_ENDPOINTS.USER_LOGIN, { email, password })
