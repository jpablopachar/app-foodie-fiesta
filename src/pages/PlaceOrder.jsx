import { useContext, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from '../components/Title'
import CartTotal from '../components/CartTotal'
import Footer from '../components/Footer'
import { placeOrder, placeStripeOrder } from '../services/orderService'
import { showError } from '../utils/notifications'
import { getCartProducts } from '../utils/cart'
import { ROUTES } from '../constants/routes'
import { PAYMENT_METHODS } from '../constants/shop'
import { TRANSLATION_KEYS } from '../constants/translationKeys'
import { useTranslation } from 'react-i18next'

/**
 * Recoge los datos de entrega y envía el pedido con el método de pago elegido.
 * @returns Formulario de finalización de compra.
 */
const PlaceOrder = () => {
  const { t } = useTranslation('common')

  const keys = TRANSLATION_KEYS.common.checkout

  const {
    navigate,
    cartItems,
    setCartItems,
    getCartAmount,
    getCartCount,
    deliveryCharges,
    foods,
    token,
  } = useContext(ShopContext)

  const [method, setMethod] = useState(PAYMENT_METHODS.COD)

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    city: '',
    country: '',
    state: '',
    zipcode: '',
    phone: '',
  })

  const onChangeHandler = (e) => {
    const name = e.target.name
    const value = e.target.value

    setFormData((data) => ({ ...data, [name]: value }))
  }

  const onSubmitHandler = async (event) => {
    event.preventDefault()

    try {
      const orderItems = getCartProducts(cartItems, foods)

      if (!orderItems.length) {
        showError(t(keys.empty))

        return
      }

      if (orderItems.reduce((total, item) => total + item.quantity, 0) !== getCartCount()) {
        showError(t(keys.unavailable))

        return
      }

      const orderData = {
        address: formData,
        items: orderItems,
        amount: getCartAmount() + deliveryCharges,
      }

      switch (method) {
        case PAYMENT_METHODS.COD: {
          const response = await placeOrder(orderData, token)

          if (response.data.success) {
            setCartItems({})
            navigate(ROUTES.ORDERS)
          } else {
            showError(response.data.message)
          }

          break
        }
        case PAYMENT_METHODS.STRIPE: {
          const responseStripe = await placeStripeOrder(orderData, token)

          if (responseStripe.data.success) {
            const { session_url } = responseStripe.data

            window.location.replace(session_url)
          } else {
            showError(responseStripe.data.message)
          }

          break
        }
        default:
          showError(t(keys.invalidMethod))

          break
      }
    } catch (error) {
      console.error(error)

      showError(error.message)
    }
  }

  return (
    <section className="max-padd-container mt-24">
      <form onSubmit={onSubmitHandler} className="py-6">
        <div className="flex flex-col xl:flex-row gap-20 xl:gap-28">
          <div className="flex flex-1 flex-col gap-3 text-[95%]">
            <Title title1={t(keys.delivery)} title2={t(keys.information)} title1Styles={'h3'} />
            <div className="flex gap-3">
              <input
                required
                onChange={onChangeHandler}
                value={formData.firstName}
                type="text"
                name="firstName"
                placeholder={t(keys.firstName)}
                className="ring-1 ring-slate-900/15 p-1 pl-3 rounded-xs bg-deep outline-hidden"
              />
              <input
                required
                onChange={onChangeHandler}
                value={formData.lastName}
                type="text"
                name="lastName"
                placeholder={t(keys.lastName)}
                className="ring-1 ring-slate-900/15 p-1 pl-3 rounded-xs bg-deep outline-hidden"
              />
            </div>
            <input
              required
              onChange={onChangeHandler}
              value={formData.email}
              type="email"
              name="email"
              placeholder={t(keys.email)}
              className="ring-1 ring-slate-900/15 p-1 pl-3 rounded-xs bg-deep outline-hidden"
            />
            <input
              required
              onChange={onChangeHandler}
              value={formData.phone}
              type="text"
              name="phone"
              placeholder={t(keys.phone)}
              className="ring-1 ring-slate-900/15 p-1 pl-3 rounded-xs bg-deep outline-hidden"
            />
            <input
              required
              onChange={onChangeHandler}
              value={formData.street}
              type="text"
              name="street"
              placeholder={t(keys.street)}
              className="ring-1 ring-slate-900/15 p-1 pl-3 rounded-xs bg-deep outline-hidden"
            />
            <div className="flex gap-3">
              <input
                required
                onChange={onChangeHandler}
                value={formData.city}
                type="text"
                name="city"
                placeholder={t(keys.city)}
                className="ring-1 ring-slate-900/15 p-1 pl-3 rounded-xs bg-deep outline-hidden"
              />
              <input
                required
                onChange={onChangeHandler}
                value={formData.state}
                type="text"
                name="state"
                placeholder={t(keys.state)}
                className="ring-1 ring-slate-900/15 p-1 pl-3 rounded-xs bg-deep outline-hidden"
              />
            </div>
            <div className="flex gap-3">
              <input
                required
                onChange={onChangeHandler}
                value={formData.zipcode}
                type="text"
                name="zipcode"
                placeholder={t(keys.zipcode)}
                className="ring-1 ring-slate-900/15 p-1 pl-3 rounded-xs bg-deep outline-hidden"
              />
              <input
                required
                onChange={onChangeHandler}
                value={formData.country}
                type="text"
                name="country"
                placeholder={t(keys.country)}
                className="ring-1 ring-slate-900/15 p-1 pl-3 rounded-xs bg-deep outline-hidden"
              />
            </div>
          </div>
          <div className="flex flex-1 flex-col">
            <CartTotal />
            <div className="my-6">
              <h3 className="bold-20 mb-5">
                {t(keys.payment)} <span className="text-secondary">{t(keys.method)}</span>
              </h3>
              <div className="flex gap-3">
                <button type="button"
                  onClick={() => setMethod(PAYMENT_METHODS.STRIPE)}
                  className={`${method === PAYMENT_METHODS.STRIPE ? 'btn-secondary' : 'btn-outline'} py-1! text-xs cursor-pointer`}
                >
                  Stripe
                </button>
                <button type="button"
                  onClick={() => setMethod(PAYMENT_METHODS.COD)}
                  className={`${method === PAYMENT_METHODS.COD ? 'btn-secondary' : 'btn-outline'} p-1! px-3! text-xs cursor-pointer`}
                >
                  {t(keys.cod)}
                </button>
              </div>
            </div>
            <div>
              <button type="submit" className="btn-dark rounded-sm!">
                {t(keys.place)}
              </button>
            </div>
          </div>
        </div>
      </form>
      <Footer />
    </section>
  )
}

export default PlaceOrder
