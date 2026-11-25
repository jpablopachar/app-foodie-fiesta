import { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from '../components/Title'
import { FaRegWindowClose } from 'react-icons/fa'
import { FaPlus, FaMinus } from 'react-icons/fa6'
import CartTotal from '../components/CartTotal'
import { ROUTES } from '../constants/routes'
import { getCartProducts } from '../utils/cart'
import { useTranslation } from 'react-i18next'
import { TRANSLATION_KEYS } from '../constants/translationKeys'

/**
 * Muestra el carrito y permite modificar cantidades o continuar al pago.
 * @returns Página del carrito.
 */
const Cart = () => {
  const { t } = useTranslation('common')

  const { foods, cartItems, currency, updateQuantity, navigate } = useContext(ShopContext)

  const keys = TRANSLATION_KEYS.common.cart

  const cartData = getCartProducts(cartItems, foods)

  return (
    <section className="max-padd-container mt-24">
      <div className="pt-6">
        <Title title1={t(keys.title)} title2={t(keys.list)} titleStyles={'h3'} />
        <div>
          {cartData.map((item) => {
            const key = `${item._id}-${item.size}`
            return (
              <div key={key} className="p-2 rounded-xl bg-deep mt-2">
                <div className="flex items-center gap-x-3">
                  <div className="flex items-start gap-6 p-2 bg-light rounded-xl">
                    <img src={item.image} alt="" className="w-16 sm:w-18" />
                  </div>
                  <div className="flex flex-col w-full">
                    <div className="flexBetween">
                      <h5 className="h5 my-0! line-clamp-1">{item.name}</h5>
                      <button type="button" aria-label={t(keys.remove)}
                        onClick={() => updateQuantity(item._id, item.size, 0)}
                        className="cursor-pointer"
                      ><FaRegWindowClose /></button>
                    </div>
                    <p className="bold-14 my-0.5">{item.size}</p>
                    <div className="flexBetween">
                      <div className="flex items-center ring-1 ring-slate-900/5 rounded-full overflow-hidden bg-primary">
                        <button
                          onClick={() => item.quantity > 1 && updateQuantity(item._id, item.size, item.quantity - 1)}
                          aria-label={t(keys.decrease)}
                          className="p-1.5 text-white bg-secondary rounded-full shadow-md"
                        >
                          <FaMinus className="text-xs" />
                        </button>
                        <p className="px-2">{item.quantity}</p>
                        <button
                          onClick={() => updateQuantity(item._id, item.size, item.quantity + 1)}
                          aria-label={t(keys.increase)}
                          className="p-1.5 text-white bg-secondary rounded-full shadow-md"
                        >
                          <FaPlus className="text-xs" />
                        </button>
                      </div>
                      <h4 className="h4">
                        {currency}
                        {item.price[item.size]}
                      </h4>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
        <div className="flex my-20">
          <div className="w-full sm:w-112.5">
            <CartTotal />
            <button onClick={() => navigate(ROUTES.PLACE_ORDER)} className="btn-secondary mt-7">
              {t(keys.checkout)}
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Cart
