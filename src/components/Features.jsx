import Title from './Title'
import shipping from '../assets/shipping-fast.svg'
import hot from '../assets/hot-food.svg'
import fresh from '../assets/fresh-food.svg'
import hat from '../assets/hat-chef.svg'
import { TRANSLATION_KEYS } from '../constants/translationKeys'
import { useTranslation } from 'react-i18next'

/**
 * Muestra las principales ventajas de elegir el servicio de Foodessa.
 *
 * @returns Sección con las características destacadas del servicio.
 */
const Features = () => {
  const { t } = useTranslation('home')

  return (
    <section className="max-padd-container py-16 xl:py-28 pb-12!">
      <Title
        title1={t(TRANSLATION_KEYS.home.features.title, { ns: 'home' })}
        titleStyles={'text-center pb-16!'}
        paraStyles={'block!'}
      />
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 gap-y-12">
        <div className="flexCenter flex-col gap-3 bg-deep p-4 py-8 rounded-xl">
          <img src={shipping} alt="" height={44} width={44} />
          <div className="flexCenter flex-col">
            <h5 className="h5">
              {t(TRANSLATION_KEYS.home.features.fastDelivery.title, { ns: 'home' })}
            </h5>
            <hr className="w-8 bg-secondary h-1 rounded-full border-none" />
          </div>
          <p className="text-center">
            {t(TRANSLATION_KEYS.home.features.fastDelivery.description, { ns: 'home' })}
          </p>
        </div>
        <div className="flexCenter flex-col gap-3 bg-deep p-4 py-8 rounded-xl">
          <img src={hot} alt="" height={44} width={44} />
          <div className="flexCenter flex-col">
            <h5 className="h5">
              {t(TRANSLATION_KEYS.home.features.hotFoods.title, { ns: 'home' })}
            </h5>
            <hr className="w-8 bg-secondary h-1 rounded-full border-none" />
          </div>
          <p className="text-center">
            {t(TRANSLATION_KEYS.home.features.hotFoods.description, { ns: 'home' })}
          </p>
        </div>
        <div className="flexCenter flex-col gap-3 bg-deep p-4 py-8 rounded-xl">
          <img src={fresh} alt="" height={44} width={44} />
          <div className="flexCenter flex-col">
            <h5 className="h5">
              {t(TRANSLATION_KEYS.home.features.freshFoods.title, { ns: 'home' })}
            </h5>
            <hr className="w-8 bg-secondary h-1 rounded-full border-none" />
          </div>
          <p className="text-center">
            {t(TRANSLATION_KEYS.home.features.freshFoods.description, { ns: 'home' })}
          </p>
        </div>
        <div className="flexCenter flex-col gap-3 bg-deep p-4 py-8 rounded-xl">
          <img src={hat} alt="" height={44} width={44} />
          <div className="flexCenter flex-col">
            <h5 className="h5">
              {t(TRANSLATION_KEYS.home.features.expertChefs.title, { ns: 'home' })}
            </h5>
            <hr className="w-8 bg-secondary h-1 rounded-full border-none" />
          </div>
          <p className="text-center">
            {t(TRANSLATION_KEYS.home.features.expertChefs.description, { ns: 'home' })}
          </p>
        </div>
      </div>
    </section>
  )
}

export default Features
