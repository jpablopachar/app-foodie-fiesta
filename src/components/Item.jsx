import { useContext, useState } from 'react'
import { FaStar, FaStarHalfStroke } from 'react-icons/fa6'
import { TbShoppingBagPlus } from 'react-icons/tb'
import { ShopContext } from '../context/ShopContext'
import { TRANSLATION_KEYS } from '../constants/translationKeys'
import { useTranslation } from 'react-i18next'
import { SIZE_ORDER } from '../constants/shop'

/**
 * Muestra la información de un alimento y permite seleccionar su tamaño
 * para añadirlo al carrito.
 *
 * @param food - Alimento que se va a mostrar.
 * @returns Tarjeta con los datos, tamaños, precio y acción de compra del alimento.
 */
const Item = ({ food }) => {
  const { t } = useTranslation('common')
  const { currency, addToCart } = useContext(ShopContext)

  const [size, setSize] = useState(food.sizes[0])

  return (
    <div>
      <div className="flex rounded-xl bg-deep relative">
        <div className="flexCenter m-6 rounded-full absolute top-0 bottom-0 -left-22">
          <img
            src={food.image}
            alt=""
            height={155}
            width={155}
            className="object-contain aspect-square rounded-xl"
          />
        </div>
        <div className="mx-4 pl-20">
          <div className="py-3">
            <h4 className="bold-16 line-clamp-1 mb-1">{food.name}</h4>
            <div className="flex items-center justify-between pb-2">
              <h5 className="medium-14">
                {t(`${TRANSLATION_KEYS.common.menu.categoryNames}.${food.category}`, { defaultValue: food.category })}
              </h5>
              <div className="flex items-center justify-start gap-x-1 text-secondary bold-14">
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStarHalfStroke />
              </div>
            </div>
            <p className="line-clamp-2">{food.description}</p>
          </div>
          <div className="flexBetween mb-2">
            <div className="flex gap-1">
              {[...food.sizes]
                .sort((a, b) => {
                  return SIZE_ORDER.indexOf(a) - SIZE_ORDER.indexOf(b)
                })
                .map((item, i) => (
                  <button
                    onClick={() => setSize(item)}
                    key={i}
                    className={`${item === size ? 'ring-1 ring-slate-900/10' : ''} h-6 w-6 bg-light text-xs font-semibold rounded-xs`}
                  >
                    {item}
                  </button>
                ))}
            </div>
            <button
              onClick={() => addToCart(food._id, size)}
              aria-label={t(TRANSLATION_KEYS.common.actions.addToCart)}
              className="flexCenter gap-x-1 text-[18px] bg-secondary text-white rounded-xs p-0.75"
            >
              <TbShoppingBagPlus />
            </button>
          </div>
          <div className="flexBetween rounded-xl pb-3 text-[13px] font-semibold">
            <div className="flexBetween gap-1">
              <h5>{t(TRANSLATION_KEYS.common.product.prep)}</h5>
              <p className="text-xs relative top-px">20m</p>
            </div>
            <hr className="h-4 w-px bg-tertiary/10 border-none" />
            <div className="flexCenter gap-1">
              <h5>{t(TRANSLATION_KEYS.common.product.price)}</h5>
              <p className="text-xs text-secondary relative top-px">
                {currency}
                {food.price[size]}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Item
