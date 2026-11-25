/** Tipo de moneda utilizada en la tienda */
export const CURRENCY = '$'
/** Costo de envío aplicado a los pedidos */
export const DELIVERY_CHARGES = 10

/** Identificadores de los métodos de pago disponibles. */
export const PAYMENT_METHODS = Object.freeze({ COD: 'cod', STRIPE: 'stripe' })

/** Valores del método de pago devueltos en los pedidos de la API. */
export const ORDER_PAYMENT_METHODS = Object.freeze({ COD: 'COD' })

/** Estados de pedido devueltos por la API. */
export const ORDER_STATUSES = Object.freeze({ PLACED: 'Order Placed' })

/** Opciones de ordenación de los productos. */
export const SORT_TYPES = Object.freeze({ RELEVANT: 'relevant', LOW: 'low', HIGH: 'high' })

/** Orden de presentación de los tamaños de productos. */
export const SIZE_ORDER = ['H', 'F', 'S', 'M', 'L', 'XL']
