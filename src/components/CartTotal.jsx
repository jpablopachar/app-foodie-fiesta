import { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title'
import { useTranslation } from 'react-i18next'
import { TRANSLATION_KEYS } from '../constants/translationKeys'

/**
 * Muestra el subtotal, el costo de envío y el total del carrito.
 * @returns Resumen de importes del carrito.
 */
const CartTotal = () => {
  const { t } = useTranslation('common')

  const { currency, deliveryCharges, getCartAmount } = useContext(ShopContext)

  const amount = getCartAmount()

  const shipping = amount === 0 ? 0 : deliveryCharges
  const keys = TRANSLATION_KEYS.common.cart

  return (
    <div>
      <Title title1={t(keys.title)} title2={t(keys.total)} title1Styles={'h3'} />
      <div className="flexBetween pt-3">
        <h5 className="h5">{t(keys.subtotal)}</h5>
        <p className="h5">
          {currency}
          {amount.toFixed(2)}
        </p>
      </div>
      <hr className="mx-auto h-px w-full bg-gray-900/10 my-1" />
      <div className="flexBetween pt-3">
        <h5 className="h5">{t(keys.shipping)}</h5>
        <p className="h5">{currency}{shipping.toFixed(2)}</p>
      </div>
      <hr className="mx-auto h-px w-full bg-gray-900/10 my-1" />
      <div className="flexBetween pt-3">
        <h5 className="h5">{t(keys.total)}:</h5>
        <p className="h5">
          {currency}
          {(amount + shipping).toFixed(2)}
        </p>
      </div>
      <hr className="mx-auto h-px w-full bg-gray-900/10 my-1" />
    </div>
  )
}

export default CartTotal
