import { createContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'

export const ShopContext = createContext()

const ShopContextProvider = (props) => {
  const currency = '$'
  const deliveryCharges = 10
  const backendUrl = import.meta.env.VITE_BACKEND_URL

  const navigate = useNavigate()

  const [cartItems, setCartItems] = useState({})
  const [foods, setFoods] = useState([])
  const [token, setToken] = useState('')

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
        await axios.post(
          `${backendUrl}/cart/add`,
          { itemId, size },
          {
            headers: {
              token,
            },
          },
        )
      } catch (error) {
        console.error(error)

        toast.error(error.message)
      }
    }
  }

  const contextValue = {
    cartItems,
    foods,
    currency,
    deliveryCharges,
    backendUrl,
    token,
    navigate,
    setCartItems,
    setToken,
    addToCart,
  }

  return <ShopContext.Provider value={contextValue}>{props.children}</ShopContext.Provider>
}

export default ShopContextProvider
