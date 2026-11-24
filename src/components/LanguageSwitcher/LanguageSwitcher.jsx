import { useTranslation } from 'react-i18next'
import { useLanguage } from '../../hooks/useLanguage'
import { LANGUAGE_OPTIONS } from '../../constants/languages'
import { TRANSLATION_KEYS } from '../../constants/translationKeys'
import LanguageSwitcherView from './LanguageSwitcherView'

/**
 * Conecta el selector de idioma con el idioma actual y las traducciones.
 *
 * @returns Selector de idioma de la aplicación.
 */
const LanguageSwitcher = () => {
  const { t } = useTranslation('common')

  const { language, changeLanguage } = useLanguage()

  return (
    <LanguageSwitcherView
      language={language}
      options={LANGUAGE_OPTIONS}
      label={t(TRANSLATION_KEYS.common.language.select)}
      onLanguageChange={changeLanguage}
    />
  )
}

export default LanguageSwitcher
