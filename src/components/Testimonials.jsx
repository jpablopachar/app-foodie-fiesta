import Title from './Title'
import TestimonialCard from './TestimonialCard'
import { FaStar } from 'react-icons/fa6'
import user1 from '../assets/testimonials/user1.png'
import food1 from '../assets/food_1.png'
import food2 from '../assets/food_2.png'
import { TRANSLATION_KEYS } from '../constants/translationKeys'
import { useTranslation } from 'react-i18next'

/**
 * Muestra reseñas verificadas de clientes junto con sus valoraciones
 * y ejemplos de alimentos.
 *
 * @returns Sección de testimonios de clientes.
 */
const Testimonials = () => {
  const { t } = useTranslation('home')
  const reviews = t(TRANSLATION_KEYS.home.testimonials.reviews, {
    ns: 'home',
    returnObjects: true,
  })

  return (
    <div>
      <div className="py-16">
        <Title
          title1={t(TRANSLATION_KEYS.home.testimonials.title, { ns: 'home' })}
          titleStyles={'text-center pb-16!'}
          paraStyles={'block!'}
        />
        <div className="max-padd-container">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_3fr] gap-20 mb-16 rounded-2xl">
            <div className="hidden sm:flex items-start justify-between flex-col gap-10">
              <Title
                title1={t(TRANSLATION_KEYS.home.testimonials.whatPeopleSay, { ns: 'home' })}
                title1Styles={'pb-10'}
                paraStyles={'block!'}
              />
              <div className="flex flex-col gap-1 bg-deep p-2 rounded-sm">
                <div className="flex text-secondary gap-2">
                  {Array.from({ length: 5 }, (_, index) => (
                    <FaStar key={index} />
                  ))}
                </div>
                <div className="medium-14">
                  {t(TRANSLATION_KEYS.home.testimonials.reviewCount, { ns: 'home' })}
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-7">
              {reviews.map((review) => (
                <TestimonialCard
                  key={review.name}
                  {...review}
                  userImage={user1}
                  foodImages={[food1, food2]}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Testimonials
