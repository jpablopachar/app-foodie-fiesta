/**
 * Convierte el carrito en una lista de productos con tamaño y cantidad.
 * Omite productos que ya no están disponibles en el catálogo.
 * @param {object} cartItems - Cantidades agrupadas por producto y tamaño.
 * @param {object[]} foods - Productos disponibles.
 * @returns {object[]} Productos presentes y con cantidad positiva.
 */
export const getCartProducts = (cartItems, foods) =>
  Object.entries(cartItems).flatMap(([id, sizes]) => {
    const food = foods.find((product) => product._id === id)

    if (!food) return []

    return Object.entries(sizes)
      .filter(([, quantity]) => quantity > 0)
      .map(([size, quantity]) => ({ ...food, size, quantity }))
  })

/** Calcula el subtotal de los productos disponibles del carrito. */
export const calculateCartAmount = (cartItems, foods) =>
  getCartProducts(cartItems, foods).reduce(
    (total, item) => total + item.price[item.size] * item.quantity,
    0,
  )
