import { useTranslation } from 'react-i18next'

import {
  DEFAULT_LANGUAGE,
  SUPPORTED_LANGUAGES,
} from '../constants/languages'

export const useLanguage = () => {
  const { i18n } = useTranslation('common')

  const language = i18n.resolvedLanguage ?? DEFAULT_LANGUAGE

  const changeLanguage = async (nextLanguage) => {
    if (
      !SUPPORTED_LANGUAGES.includes(nextLanguage) ||
      language === nextLanguage
    ) {
      return
    }

    await i18n.changeLanguage(nextLanguage)
  }

  return {
    language,
    changeLanguage,
  }
}