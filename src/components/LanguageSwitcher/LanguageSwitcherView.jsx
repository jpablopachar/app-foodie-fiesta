/**
 * Muestra un selector con los idiomas disponibles y notifica los cambios.
 *
 * @param {string} language - Código del idioma seleccionado.
 * @param {{value: string, label: string}[]} options - Códigos y etiquetas de los idiomas disponibles.
 * @param {string} label - Etiqueta accesible del selector.
 * @param {(language: string) => void} onLanguageChange - Función que recibe el idioma seleccionado.
 * @returns Elemento de selección de idioma.
 */
const LanguageSwitcherView = ({
  language,
  options,
  label,
  onLanguageChange,
}) => {
  return (
    <select
      value={language}
      aria-label={label}
      onChange={(event) => {
        onLanguageChange(event.target.value)
      }}
      className="
        cursor-pointer
        rounded-lg
        bg-white
        px-3 py-2
        text-sm
        text-tertiary
        ring-1
        ring-tertiary/15
        focus-visible:ring-2
        focus-visible:ring-secondary
      "
    >
      {options.map(({ value, label }) => (
        <option key={value} value={value}>
          {label}
        </option>
      ))}
    </select>
  )
}

export default LanguageSwitcherView