/**
 * Rutas de la API utilizadas por los servicios de la aplicación.
 */
export const API_ENDPOINTS = {
  /** Ruta para obtener la lista de productos. */
  PRODUCT_LIST: '/product/list',
  /** Ruta para registrar un usuario. */
  USER_REGISTER: '/user/register',
  /** Ruta para iniciar sesión. */
  USER_LOGIN: '/user/login',
  /** Ruta para añadir un producto al carrito. */
  ADD_CART: '/cart/add',
  /** Ruta para obtener el carrito del usuario. */
  GET_CART: '/cart/get',
  /** Ruta para actualizar el carrito del usuario. */
  UPDATE_CART: '/cart/update',
  /** Ruta para realizar un pedido. */
  PLACE_ORDER: '/order/place',
  /** Ruta para realizar un pedido con Stripe. */
  STRIPE_ORDER: '/order/stripe',
  /** Ruta para verificar el pago con Stripe. */
  VERIFY_STRIPE: '/order/verifyStripe',
  /** Ruta para obtener los pedidos del usuario. */
  USER_ORDERS: '/order/userOrders',
}
