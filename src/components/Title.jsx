import { TRANSLATION_KEYS } from '../constants/translationKeys'
import { useTranslation } from 'react-i18next'

/**
 * Muestra un título compuesto por dos partes y una descripción opcional.
 *
 * @param title1 - Primera parte del título.
 * @param title2 - Segunda parte del título, resaltada visualmente.
 * @param titleStyles - Clases CSS aplicadas al contenedor del título.
 * @param title1Styles - Clases CSS aplicadas al encabezado.
 * @param paraStyles - Clases CSS aplicadas a la descripción.
 * @returns Bloque de título y descripción.
 */
const Title = ({ title1, title2, titleStyles, title1Styles, paraStyles }) => {
  const { t } = useTranslation('home')

  return (
    <div className={`${titleStyles} pb-1`}>
      <h2 className={`${title1Styles} h2`}>
        {title1}
        <span className="text-secondary font-light!"> {title2}</span>
      </h2>
      <p className={`${paraStyles} hidden`}>
        {t(TRANSLATION_KEYS.home.description, { ns: 'home' })}
      </p>
    </div>
  )
}

export default Title

