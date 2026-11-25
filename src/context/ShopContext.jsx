import { createContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { CURRENCY, DELIVERY_CHARGES } from '../constants/shop'
import { addCartItem, getUserCart as fetchUserCart, updateCartItem } from '../services/cartService'
import { serverUrl } from '../services/httpClient'
import getProductsFromService from '../services/productService'
import { showError } from '../utils/notifications'
import { getStoredToken } from '../utils/storage'
import { calculateCartAmount } from '../utils/cart'

/**
 * Contexto con el estado y las acciones compartidas de la tienda.
 */
export const ShopContext = createContext()

/**
 * Provee el estado del carrito, los productos y las acciones de la tienda.
 *
 * @param props - Contenido que recibirá el contexto.
 * @returns Proveedor del contexto de la tienda.
 */
const ShopContextProvider = (props) => {
  const navigate = useNavigate()

  const [cartItems, setCartItems] = useState({})
  const [foods, setFoods] = useState([])
  const [token, setToken] = useState('')

  /**
   * Añade una unidad de un producto y tamaño al carrito.
   *
   * @param {string} itemId - Identificador del producto.
   * @param {string} size - Talla o tamaño seleccionado.
   * @returns Promesa que se resuelve al completar la operación.
   */
  const addToCart = async (itemId, size) => {
    let cartData = structuredClone(cartItems)

    if (cartData[itemId]) {
      if (cartData[itemId][size]) {
        cartData[itemId][size] += 1
      } else {
        cartData[itemId][size] = 1
      }
    } else {
      cartData[itemId] = {}
      cartData[itemId][size] = 1
    }

    setCartItems(cartData)

    if (token) {
      try {
        const response = await addCartItem(itemId, size, token)

        if (!response.data.success) showError(response.data.message)
      } catch (error) {
        console.error(error)

        showError(error.message)
      }
    }
  }

  /**
   * Actualiza la cantidad local y la sincroniza con el carrito del usuario.
   * @param {string} itemId - Identificador del producto.
   * @param {string} size - Tamaño seleccionado.
   * @param {number} quantity - Cantidad deseada.
   * @returns {Promise<void>} Resultado de la actualización.
   */
  const updateQuantity = async (itemId, size, quantity) => {
    setCartItems((current) => ({
      ...current,
      [itemId]: { ...current[itemId], [size]: quantity },
    }))

    if (token) {
      try {
        const response = await updateCartItem(itemId, size, quantity, token)

        if (!response.data.success) showError(response.data.message)
      } catch (error) {
        console.error(error)

        showError(error.message)
      }
    }
  }

  /**
   * Obtiene la cantidad total de productos en el carrito.
   * @returns {number} - Cantidad total de productos en el carrito.
   */
  const getCartCount = () => {
    let totalCount = 0;

    for (const items in cartItems) {
      for (const item in cartItems[items]) {
        try {
          if (cartItems[items][item] > 0) {
            totalCount += cartItems[items][item];
          }
        } catch (error) {
          console.error(error);
        }
      }
    }

    return totalCount;
  };

  /**
   * Carga la lista de productos y actualiza el estado de la tienda.
   *
   * @returns Promesa que se resuelve al completar la carga.
   */
  const getProducts = async () => {
    try {
      const res = await getProductsFromService()

      if (res.data.success) {
        setFoods(res.data.products)
      } else {
        showError(res.data.message)
      }
    } catch (error) {
      console.error(error)

      showError(error.message)
    }
  }

  /**
   * Carga el carrito del usuario autenticado y actualiza su estado.
   *
   * @param {string} token - Token de autenticación del usuario.
   * @returns Promesa que se resuelve al completar la carga.
   */
  const getUserCart = async (token) => {
    try {
      const res = await fetchUserCart(token)

      if (res.data.success) {
        setCartItems(res.data.cartData)
      } else {
        showError(res.data.message)
      }
    } catch (error) {
      console.log(error)

      showError(error.message)
    }
  }

  useEffect(() => {
    if (!token) {
      const storedToken = getStoredToken()

      if (storedToken) {
        setToken(storedToken)
        getUserCart(storedToken)
      }
    }

    getProducts()
  }, [token])

  const contextValue = {
    cartItems,
    foods,
    currency: CURRENCY,
    deliveryCharges: DELIVERY_CHARGES,
    serverUrl,
    token,
    navigate,
    setCartItems,
    setToken,
    addToCart,
    updateQuantity,
    getCartAmount: () => calculateCartAmount(cartItems, foods),
    getCartCount,
    getProducts,
    getUserCart,
  }

  return <ShopContext.Provider value={contextValue}>{props.children}</ShopContext.Provider>
}

export default ShopContextProvider
