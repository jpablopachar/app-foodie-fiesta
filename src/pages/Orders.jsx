import { useCallback, useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import { getUserOrders } from '../services/orderService'
import { showError } from '../utils/notifications'
import Title from '../components/Title'
import Footer from '../components/Footer'
import { useTranslation } from 'react-i18next'
import { TRANSLATION_KEYS } from '../constants/translationKeys'
import { ORDER_PAYMENT_METHODS, ORDER_STATUSES } from '../constants/shop'

/**
 * Muestra los productos de los pedidos del usuario y permite actualizar su estado.
 * @returns Página de pedidos.
 */
const Orders = () => {
  const { t, i18n } = useTranslation('common')

  const keys = TRANSLATION_KEYS.common.orders

  const { token, currency } = useContext(ShopContext)

  const [orderData, setOrderData] = useState([])

  const loadOrderData = useCallback(() => {
    if (!token) return

    getUserOrders(token)
      .then((response) => {
        if (response.data.success) {
          const allOrdersItem = response.data.orders.flatMap((order) =>
            order.items.map((item) => ({
              ...item, status: order.status, payment: order.payment,
              paymentMethod: order.paymentMethod, date: order.date,
            })),
          )

          setOrderData(allOrdersItem.reverse())
        } else {
          showError(response.data.message)
        }
      })
      .catch((error) => {
        console.error(error)

        showError(error.message)
      })
  }, [token])

  useEffect(() => {
    loadOrderData()
  }, [loadOrderData])

  return (
    <div className="max-padd-container mt-24">
      <div className="pt-6 pb-20">
        <Title title1={t(keys.title)} title2={t(keys.list)} titleStyles={'h3'} />
        {orderData.map((item, i) => (
          <div key={i} className="p-2 rounded-xl bg-deep mt-2">
            <div className="text-gray-700 flex flex-col gap-4">
              <div className="flex gap-x-3 w-full">
                <div className="flexCenter p-2 bg-light rounded-lg">
                  <img src={item.image} alt="" className="w-16 " />
                </div>
                <div className="block w-full">
                  <h5 className="h5 capitalize line-clamp-1">{item.name}</h5>
                  <div className="flex gap-x-2 flex-col sm:flex-row sm:justify-between">
                    <div className="text-xs">
                      <div className="flex items-center gap-x-2 sm:gap-x-3">
                        <div className="flexCenter gap-x-2">
                          <h5 className="medium-14">{t(keys.price)}</h5>
                          <p>
                            {currency}
                            {item.price[item.size]}
                          </p>
                        </div>
                        <div className="flexCenter gap-x-2">
                          <h5 className="medium-14">{t(keys.quantity)}</h5>
                          <p>{item.quantity}</p>
                        </div>
                        <div className="flexCenter gap-x-2">
                          <h5 className="medium-14">{t(keys.size)}</h5>
                          <p>{item.size}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-x-2">
                        <h5 className="medium-14">{t(keys.date)}</h5>
                        <p className="text-gray-400">{new Date(item.date).toLocaleDateString(i18n.resolvedLanguage)}</p>
                      </div>
                      <div className="flex items-center gap-x-2">
                        <h5 className="medium-14">{t(keys.payment)}</h5>
                        <p className="text-gray-400">{item.paymentMethod === ORDER_PAYMENT_METHODS.COD ? t(keys.cod) : item.paymentMethod}</p>
                      </div>
                    </div>
                    {/* status and button */}
                    <div className="flex flex-col gap-2 sm:pr-4">
                      <div className="flex items-center gap-2">
                        <p className="min-w-2 h-2 rounded-full bg-green-500"></p>
                        <p className="max-sm:text-xs">{item.status === ORDER_STATUSES.PLACED ? t(keys.placed) : item.status}</p>
                      </div>
                      <button onClick={loadOrderData} className="btn-secondary p-1! px-3! text-xs!">
                        {t(keys.track)}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <Footer />
    </div>
  )
}

export default Orders
