import { API_ENDPOINTS } from '../constants/apiEndpoints'
import httpClient from './httpClient'

/**
 * Obtiene la lista de productos desde el servidor.
 *
 * @returns Respuesta de la solicitud HTTP.
 */
const getProducts = () => httpClient.get(API_ENDPOINTS.PRODUCT_LIST)

export default getProducts
