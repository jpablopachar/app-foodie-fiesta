import { TbHomeFilled } from 'react-icons/tb'
import { IoMdListBox } from 'react-icons/io'
import { FaRegWindowClose } from 'react-icons/fa'
import { Link, NavLink } from 'react-router-dom'
import { ROUTES } from '../constants/routes'
import { TRANSLATION_KEYS } from '../constants/translationKeys'
import { useTranslation } from 'react-i18next'

/**
 * Muestra los enlaces de navegación y, cuando corresponde, el control para cerrar el menú.
 *
 * @param containerStyles - Clases CSS aplicadas al contenedor de navegación.
 * @param toggleMenu - Función que alterna la apertura del menú.
 * @param menuOpened - Indica si el menú está abierto.
 * @returns Elemento de navegación.
 */
const Navbar = ({ containerStyles, toggleMenu, menuOpened }) => {
  const { t } = useTranslation('common')
  const navItems = [
    { to: ROUTES.HOME, label: t(TRANSLATION_KEYS.common.navigation.home), icon: <TbHomeFilled /> },
    { to: ROUTES.MENU, label: t(TRANSLATION_KEYS.common.navigation.menu), icon: <IoMdListBox /> },
    { to: ROUTES.CONTACT, label: t(TRANSLATION_KEYS.common.navigation.contact), icon: <TbHomeFilled /> },
  ]

  return (
    <nav className={containerStyles}>
      {menuOpened && (
        <>
          <FaRegWindowClose
            onClick={toggleMenu}
            className="text-xl self-end cursor-pointer relative left-8"
          />
          <Link to={ROUTES.HOME} className="bold-24 mb-10">
            <h4 className="text-secondary">Foodessa</h4>
          </Link>
        </>
      )}
      {navItems.map(({ to, label, icon }) => (
        <div key={label} className="inline-flex">
          <NavLink
            to={to}
            className={({ isActive }) =>
              isActive ? 'active-link flexCenter gap-x-2' : 'flexCenter gap-x-2'
            }
          >
            <span className="text-xl">{icon}</span>
            <span className="medium-16">{label}</span>
          </NavLink>
        </div>
      ))}
    </nav>
  )
}

export default Navbar
