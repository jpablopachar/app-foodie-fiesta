/**
 * Define el código y la etiqueta visible de cada idioma disponible.
 * Las claves de primer nivel identifican los idiomas mediante su código.
 */
export const LANGUAGES = {
  es: {
    value: 'es',
    label: 'Español',
  },
  en: {
    value: 'en',
    label: 'English',
  },
}

/**
 * Códigos de idioma admitidos por la aplicación.
 * El objeto se congela para evitar que sus valores se modifiquen en tiempo de ejecución.
 */
export const AVAILABLE_LANGUAGES = Object.freeze({
  ES: LANGUAGES.es.value,
  EN: LANGUAGES.en.value,
})

/**
 * Código del idioma que se utiliza cuando no se especifica uno.
 */
export const DEFAULT_LANGUAGE = AVAILABLE_LANGUAGES.ES

/**
 * Lista de códigos de idioma admitidos, derivada de {@link AVAILABLE_LANGUAGES}.
 */
export const SUPPORTED_LANGUAGES = Object.values(AVAILABLE_LANGUAGES)

/**
 * Opciones de idioma en el formato requerido por los controles de selección.
 */
export const LANGUAGE_OPTIONS = [
  {
    value: AVAILABLE_LANGUAGES.ES,
    label: LANGUAGES.es.label,
  },
  {
    value: AVAILABLE_LANGUAGES.EN,
    label: LANGUAGES.en.label,
  },
]
