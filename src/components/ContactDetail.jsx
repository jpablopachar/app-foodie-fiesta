/**
 * Muestra un dato de contacto con su título e icono.
 * @param {object} props - Propiedades del dato de contacto.
 * @param {string} props.title - Título del dato.
 * @param {React.ReactNode} props.icon - Icono asociado.
 * @param {React.ReactNode} props.children - Valor del dato.
 * @returns Dato de contacto.
 */
const ContactDetail = ({ title, icon, children }) => (
  <div className="flex flex-col">
    <h5 className="h5 capitalize mr-4">{title}</h5>
    <p className="flexStart gap-x-2">{icon} {children}</p>
  </div>
)

export default ContactDetail
