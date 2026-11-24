import { Link } from 'react-router-dom'
import { ROUTES } from '../constants/routes'
import { TRANSLATION_KEYS } from '../constants/translationKeys'
import bg from '../assets/bg.png'
import { TbTruckDelivery } from 'react-icons/tb'
import { IoPeopleCircleOutline } from 'react-icons/io5'
import { IoMdRestaurant } from 'react-icons/io'
import { AiFillShop } from 'react-icons/ai'
import { PiChefHatFill } from 'react-icons/pi'
import { useTranslation } from 'react-i18next'

/**
 * Muestra la sección principal de bienvenida con la llamada a explorar el menú
 * y los indicadores destacados del servicio.
 *
 * @returns Sección principal de presentación de la aplicación.
 */
const Hero = () => {
  const { t } = useTranslation(['common', 'home'])

  return (
    <section className="max-padd-container py-20 xl:py-36 bg-deep">
      <div className="flexCenter gap-6 flex-col xl:flex-row">
        <div className="flex flex-1 flex-col pt-12 xl:pt-32">
          <h1 className="h1 max-w-184">
            {t(TRANSLATION_KEYS.home.hero.titleBefore, { ns: 'home' })}{' '}
            <span className="inline-flex">
              <span className="inline-flex items-center justify-center p-5 h-16 w-16 bg-secondary text-white rotate-[-31deg] rounded-full">
                F
              </span>
              ood
            </span>{' '}
            {t(TRANSLATION_KEYS.home.hero.titleAfter, { ns: 'home' })}
          </h1>
          <p>{t(TRANSLATION_KEYS.home.hero.description, { ns: 'home' })}</p>
          <div className="mt-6">
            <Link to={ROUTES.MENU} className="btn-secondary">
              {t(TRANSLATION_KEYS.common.actions.explore)}
            </Link>
          </div>
        </div>
        <div className="flex flex-1 relative z-10 top-12">
          <div className="relative">
            <img src={bg} alt="" height={666} width={666} />
            {/* Badge */}
            <div className="hidden sm:block absolute top-8 right-14 max-w-48 bg-light shadow-xs pl-2 py-2 rounded-xl">
              <div className="flex gap-2">
                <TbTruckDelivery size={31} className="text-secondary" />
                <h5 className="h5 relative top-1">{t(TRANSLATION_KEYS.home.hero.badges.fastDelivery, { ns: 'home' })}</h5>
              </div>
              <p className="text-xs">{t(TRANSLATION_KEYS.home.hero.badges.fastDeliveryDescription, { ns: 'home' })}</p>
            </div>
            {/* Badge */}
            <div className="hidden sm:block absolute top-52 right-6 max-w-60 bg-light shadow-xs p-2 rounded-xl">
              <div className="flex gap-2">
                <IoMdRestaurant size={26} className="text-secondary" />
                <h5 className="h5">{t(TRANSLATION_KEYS.home.hero.badges.dishes, { ns: 'home' })}</h5>
              </div>
            </div>
            {/* Badge */}
            <div className="hidden sm:block absolute top-3/4 right-12 max-w-48 bg-light shadow-xs pl-2 py-2 rounded-xl">
              <div className="flex gap-2">
                <AiFillShop size={23} className="text-secondary" />
                <h5 className="h5">{t(TRANSLATION_KEYS.home.hero.badges.branches, { ns: 'home' })}</h5>
              </div>
              <p className="text-xs">{t(TRANSLATION_KEYS.home.hero.badges.branchesDescription, { ns: 'home' })}</p>
            </div>
            {/* Badge */}
            <div className="hidden sm:block absolute top-28 left-3 max-w-48 bg-light shadow-xs pl-2 py-2 rounded-xl">
              <div className="flex gap-2">
                <IoPeopleCircleOutline size={31} className="text-secondary" />
                <h5 className="h5 relative top-1">{t(TRANSLATION_KEYS.home.hero.badges.happyCustomers, { ns: 'home' })}</h5>
              </div>
              <p className="text-xs">{t(TRANSLATION_KEYS.home.hero.badges.happyCustomersDescription, { ns: 'home' })}</p>
            </div>
            {/* Badge */}
            <div className="hidden sm:block absolute top-72 left-3 max-w-48 bg-light shadow-xs p-2 rounded-xl">
              <div className="flex gap-2">
                <PiChefHatFill size={27} className="text-secondary" />
                <h5 className="h5 relative top-1">{t(TRANSLATION_KEYS.home.hero.badges.expertCooks, { ns: 'home' })}</h5>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
