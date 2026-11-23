import { createContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'

export const ShopContext = createContext()

const ShopContextProvider = (props) => {
  const currency = '$'
  const deliveryCharges = 10
  const serverUrl = import.meta.env.VITE_SERVER_URL

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
          `${serverUrl}/cart/add`,
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

  const getProducts = async () => {
    try {
      const res = await axios.get(`${serverUrl}/product/list`)

      if (res.data.success) {
        setFoods(res.data.products)
      } else {
        toast.error(res.data.message)
      }
    } catch (error) {
      console.error(error)

      toast.error(error.message)
    }
  }

  const getUserCart = async (token) => {
    try {
      const res = await axios.post(`${serverUrl}/cart/get`, {}, { headers: { token } })

      if (res.data.success) {
        setCartItems(res.data.cartData)
      }
    } catch (error) {
      console.log(error)

      toast.error(error.message)
    }
  }

  useEffect(() => {
    if (!token && localStorage.getItem('token')) {
      const storedToken = localStorage.getItem('token')

      setToken(storedToken)
      getUserCart(storedToken)
    }

    getProducts()
  }, [token])

  const contextValue = {
    cartItems,
    foods,
    currency,
    deliveryCharges,
    serverUrl,
    token,
    navigate,
    setCartItems,
    setToken,
    addToCart,
    getProducts,
    getUserCart,
  }

  return <ShopContext.Provider value={contextValue}>{props.children}</ShopContext.Provider>
}

export default ShopContextProvider
