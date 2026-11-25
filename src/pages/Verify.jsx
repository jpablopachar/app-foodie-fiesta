import { useContext, useEffect } from 'react'
import { ShopContext } from '../context/ShopContext'
import { useSearchParams } from 'react-router-dom'
import { verifyStripePayment } from '../services/orderService'
import { showError } from '../utils/notifications'
import { ROUTES } from '../constants/routes'
import { useTranslation } from 'react-i18next'
import { TRANSLATION_KEYS } from '../constants/translationKeys'

/**
 * Verifica el resultado del pago y redirige al carrito o a los pedidos.
 * @returns Indicador de verificación.
 */
const Verify = () => {
  const { t } = useTranslation('common')
  const { navigate, token, setCartItems } = useContext(ShopContext)
  const [searchParams] = useSearchParams()

  const success = searchParams.get('success')
  const orderId = searchParams.get('orderId')

  useEffect(() => {
    if (!token) return

    const verifyPayment = async () => {
      try {
        const response = await verifyStripePayment(success, orderId, token)

        if (response.data.success) {
          setCartItems({})
          navigate(ROUTES.ORDERS)
        } else {
          if (response.data.message) showError(response.data.message)

          navigate(ROUTES.CART)
        }
      } catch (error) {
        console.error(error)

        showError(error.message)
      }
    }
    verifyPayment()
  }, [token, success, orderId, navigate, setCartItems])

  return <div>{t(TRANSLATION_KEYS.common.checkout.verifying)}</div>
}

export default Verify
