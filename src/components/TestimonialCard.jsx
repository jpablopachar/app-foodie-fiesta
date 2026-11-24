import { FaCheck, FaStar } from 'react-icons/fa6'
import { TRANSLATION_KEYS } from '../constants/translationKeys'
import { useTranslation } from 'react-i18next'

/**
 * Muestra una reseña verificada con la información del cliente y las imágenes
 * de los alimentos asociados.
 *
 * @param {string} name - Nombre de la persona que publicó la reseña.
 * @param {string} title - Título de la reseña.
 * @param {string} description - Texto de la reseña.
 * @param {string} userImage - URL de la imagen de perfil.
 * @param {string[]} foodImages - URLs de las imágenes de alimentos.
 * @returns Tarjeta de una reseña verificada.
 */
const TestimonialCard = ({ name, title, description, userImage, foodImages }) => {
  const { t } = useTranslation('home')

  return (
    <article className="flex flex-col gap-1 rounded-lg p-4 bg-deep">
      <div className="flexBetween">
        <div className="flexBetween gap-x-2">
          <img src={userImage} alt="" height={44} width={44} className="rounded-full" />
          <h5 className="bold-14">{name}</h5>
        </div>
        <div className="bg-secondary text-white rounded-full flexCenter gap-x-2 p-1 px-2 text-xs font-semibold">
          <FaCheck />
          {t(TRANSLATION_KEYS.home.testimonials.verified, { ns: 'home' })}
        </div>
      </div>
      <hr className="h-px w-full my-2 border-gray-200" />
      <div className="flex gap-x-1 text-secondary mt-5 mb-1 text-xs">
        {Array.from({ length: 5 }, (_, index) => (
          <FaStar key={index} />
        ))}
      </div>
      <h4 className="h4">{title}</h4>
      <p>{description}</p>
      <div className="flex mt-5">
        {foodImages.map((image, index) => (
          <img
            key={`${image}-${index}`}
            src={image}
            alt=""
            height={44}
            width={44}
            className="rounded-sm aspect-square object-cover"
          />
        ))}
      </div>
    </article>
  )
}

export default TestimonialCard
