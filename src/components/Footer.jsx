import { Link } from 'react-router-dom'
import { FOOTER_CONTACT_INFO, SOCIALS } from '../assets/data'
import { ROUTES } from '../constants/routes'
import { TRANSLATION_KEYS } from '../constants/translationKeys'
import { useTranslation } from 'react-i18next'

/**
 * Muestra el pie de página con la suscripción, los enlaces informativos,
 * los datos de contacto y las redes sociales.
 *
 * @returns Pie de página de la aplicación.
 */
const Footer = () => {
  const { t } = useTranslation(['common', 'home'])
  const columns = t(TRANSLATION_KEYS.home.footer.columns, {
    ns: 'home',
    returnObjects: true,
  })

  return (
    <footer className="mb-4">
      <div className="rounded-tr-3xl rounded-tl-3xl pt-12 xl:pt-20 pb-8">
        <h3 className="h3">{t(TRANSLATION_KEYS.home.footer.headline, { ns: 'home' })}</h3>
        <p>{t(TRANSLATION_KEYS.home.footer.description, { ns: 'home' })}</p>
        <hr className="my-8 bg-slate-900/30 h-0.5 border-gray-200" />
        <div
          className="flex justify-between flex-wrap gap-2
                "
        >
          <div className="max-w-sm">
            <Link to={ROUTES.HOME} className="bold-24 flex-1 flex ">
              <span className="inline-flex">
                <span className="inline-flex items-center justify-center p-2 h-8 w-8 bg-secondary text-white rotate-[-31deg] rounded-full">
                  F
                </span>
                ood
              </span>
              essa
            </Link>
            <p className="py-4">{t(TRANSLATION_KEYS.home.footer.lookingFor, { ns: 'home' })}</p>
            <div className="flexBetween pl-3 h-12 bg-deep w-full max-w-83.25 rounded-full ring-1 ring-slate-500/15 mb-4">
              <input
                type="email"
                placeholder={t(TRANSLATION_KEYS.home.footer.emailPlaceholder, { ns: 'home' })}
                className="bg-transparent border-none outline-hidden"
              />
              <button className="btn-secondary relative right-4">
                {t(TRANSLATION_KEYS.home.footer.subscribe, { ns: 'home' })}
              </button>
            </div>
          </div>
          <div className="flex justify-between flex-wrap gap-8">
            {columns.map((col) => (
              <FooterColumn key={col.title} title={col.title}>
                <ul className="flex flex-col gap-4 regular-14 text-gray-20">
                  {col.links.map((link) => (
                    <Link to={ROUTES.HOME} key={link}>
                      {link}
                    </Link>
                  ))}
                </ul>
              </FooterColumn>
            ))}
            <div className="flex flex-col gap-5">
              <FooterColumn title={t(TRANSLATION_KEYS.home.footer.contactTitle, { ns: 'home' })}>
                {FOOTER_CONTACT_INFO.links.map((link, index) => (
                  <Link to={ROUTES.HOME} key={link.label} className="flex gap-4 md:flex-col lg:flex-row">
                    <p>
                      {t(
                        index === 0
                          ? TRANSLATION_KEYS.home.footer.contactNumber
                          : TRANSLATION_KEYS.home.footer.emailAddress,
                        {
                          ns: 'home',
                        },
                      )}
                      :
                    </p>
                    <p className="bold-15">{link.value}</p>
                  </Link>
                ))}
              </FooterColumn>
            </div>
            <div className="flex ">
              <FooterColumn title={t(TRANSLATION_KEYS.home.footer.socialTitle, { ns: 'home' })}>
                <ul className="flex gap-4">
                  {SOCIALS.links.map((link) => (
                    <Link to={ROUTES.HOME} key={link.id} className="text-xl">
                      {link.icon}
                    </Link>
                  ))}
                </ul>
              </FooterColumn>
            </div>
          </div>
        </div>
      </div>
      <p className="text-white bg-secondary medium-14 py-2 px-8 rounded-sm flexBetween ">
        <span>2025 Foodessa</span>
        <span>{t(TRANSLATION_KEYS.common.footer.rightsReserved)}</span>
      </p>
    </footer>
  )
}

export default Footer

/**
 * Renderiza una columna del pie de página con un título y su contenido.
 *
 * @param title - Título de la columna.
 * @param children - Contenido que se muestra debajo del título.
 * @returns Columna formateada del pie de página.
 */
const FooterColumn = ({ title, children }) => {
  return (
    <div className="flex flex-col gap-5">
      <h4 className="bold-18 whitespace-nowrap">{title}</h4>
      {children}
    </div>
  )
}
