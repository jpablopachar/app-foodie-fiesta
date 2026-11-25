import { API_ENDPOINTS } from '../constants/apiEndpoints'
import httpClient from './httpClient'

/** Crea un pedido con pago contra entrega. */
export const placeOrder = (order, token) =>
  httpClient.post(API_ENDPOINTS.PLACE_ORDER, order, { headers: { token } })

/** Crea un pedido y una sesión de pago de Stripe. */
export const placeStripeOrder = (order, token) =>
  httpClient.post(API_ENDPOINTS.STRIPE_ORDER, order, { headers: { token } })

/** Verifica el resultado de una sesión de pago de Stripe. */
export const verifyStripePayment = (success, orderId, token) =>
  httpClient.post(API_ENDPOINTS.VERIFY_STRIPE, { success, orderId }, { headers: { token } })

/** Obtiene los pedidos del usuario autenticado. */
export const getUserOrders = (token) =>
  httpClient.post(API_ENDPOINTS.USER_ORDERS, {}, { headers: { token } })
