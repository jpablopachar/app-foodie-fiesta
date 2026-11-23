import axios from 'axios'

export const serverUrl = import.meta.env.VITE_SERVER_URL

/**
 * Cliente HTTP de Axios configurado con la URL base del servidor.
 */
const httpClient = axios.create({
  baseURL: serverUrl,
})

export default httpClient
