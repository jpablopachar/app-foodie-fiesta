import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'

/**
 * Sincroniza el atributo de idioma del documento con el idioma resuelto por i18n.
 *
 * @returns {null} No renderiza contenido visual.
 */
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