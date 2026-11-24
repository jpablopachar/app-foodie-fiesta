import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'

const DocumentLanguage = () => {
  const { i18n } = useTranslation()

  const language = i18n.resolvedLanguage

  useEffect(() => {
    if (language) {
      document.documentElement.lang = language
    }
  }, [language])

  return null
}

export default DocumentLanguage