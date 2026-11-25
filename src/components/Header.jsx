import { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import Navbar from './Navbar'
import { RiShoppingBasketLine, RiUserLine } from 'react-icons/ri'
import { TbUserCircle, TbArrowNarrowRight } from 'react-icons/tb'
import { CgMenuLeft } from 'react-icons/cg'
import { ShopContext } from '../context/ShopContext'
import { removeStoredToken } from '../utils/storage'
import { ROUTES } from '../constants/routes'
import { TRANSLATION_KEYS } from '../constants/translationKeys'
import LanguageSwitcher from './LanguageSwitcher/LanguageSwitcher'
import { useTranslation } from 'react-i18next'

/**
 * Muestra el encabezado con la navegación, el acceso al carrito y las opciones de usuario.
 *
 * @returns Elemento del encabezado.
 */
const Header = () => {
  const { t } = useTranslation('common')
  const { getCartCount, navigate, token, setToken } = useContext(ShopContext)

  const [menuOpened, setMenuOpened] = useState(false)

  /**
   * Alterna la apertura del menú de navegación.
   */
  const toggleMenu = () => {
    setMenuOpened((prev) => !prev)
  }

  /**
   * Cierra la sesión y redirige al usuario a la página de inicio de sesión.
   */
  const logout = () => {
    navigate(ROUTES.LOGIN)

    removeStoredToken()

    setToken('')
  }

  return (
    <>
      <header className="py-3 w-full absolute top-0 left-0 right-0 z-50 bg-white">
        <div className="max-padd-container flexBetween">
          <Link to={ROUTES.HOME} className="bold-24 flex-1 flex">
            <span className="inline-flex">
              <span className="inline-flex items-center justify-center p-2 h-8 w-8 bg-secondary text-white rotate-[-31deg] rounded-full">
                F
              </span>
              ood
            </span>
            essa
          </Link>
          {/* Navbar */}
          <div className="flex-1">
            <Navbar
              toggleMenu={toggleMenu}
              menuOpened={menuOpened}
              containerStyles={`${menuOpened ? 'flex flex-col gap-y-12 h-screen w-[222px] absolute left-0 top-0 bg-white z-50 px-10 py-4 shadow-xl' : 'hidden xl:flex gap-x-5 xl:gap-x-8 medium-15 rounded-full px-2 py-1'}`}
            />
          </div>
          {/* Right side */}
          <div className="flex-1 flex items-center justify-end gap-x-3 sm:gap-x-10">
            {!menuOpened && (
              <CgMenuLeft
                onClick={toggleMenu}
                className="text-2xl xl:hidden
              cursor-pointer"
              />
            )}
            <Link to={ROUTES.CART} className="flex relative">
              <RiShoppingBasketLine className="text-2xl" />
              <span className="bg-secondary text-white medium-14 absolute left-3.5 -top-2.5 flexCenter w-4 h-4 rounded-full inset-shadow-sm">
                {getCartCount()}
              </span>
            </Link>
            <div className="group relative">
              <div onClick={() => navigate(ROUTES.LOGIN)}>
                {token ? (
                  <div className="my-2.25">
                    <TbUserCircle className="text-[29px] cursor-pointer" />
                  </div>
                ) : (
                  <button className="btn-outline border-none! flexCenter gap-x-2 py-3!">
                    {t(TRANSLATION_KEYS.common.actions.login)} <RiUserLine className="text-xl" />
                  </button>
                )}
              </div>
              {token && (
                <>
                  <ul className="bg-white shadow-xs p-2 w-32 ring-1 ring-slate-900/15 rounded-sm absolute right-0 top-10 hidden group-hover:flex flex-col">
                    <li onClick={() => navigate(ROUTES.ORDERS)} className="flexBetween cursor-pointer">
                      <p>{t(TRANSLATION_KEYS.common.navigation.orders)}</p>
                      <TbArrowNarrowRight className="opacity-50 text-[19px]" />
                    </li>
                    <hr className="my-2 border-gray-200" />
                    <li onClick={logout} className="flexBetween cursor-pointer">
                      <p>{t(TRANSLATION_KEYS.common.actions.logout)}</p>
                      <TbArrowNarrowRight className="opacity-50 text-[19px]" />
                    </li>
                  </ul>
                </>
              )}
            </div>
          </div>
        </div>
        <div className="absolute top-full right-4 z-50 mt-2">
          <LanguageSwitcher />
        </div>
      </header>
    </>
  )
}

export default Header
