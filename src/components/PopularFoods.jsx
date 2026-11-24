import { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/pagination'
import { Autoplay, Pagination } from 'swiper/modules'
import Item from './Item'
import { TRANSLATION_KEYS } from '../constants/translationKeys'
import { useTranslation } from 'react-i18next'

/**
 * Filtra y muestra los alimentos populares en un carrusel automático.
 *
 * @returns Sección con el carrusel de alimentos populares.
 */
const PopularFoods = () => {
  const { t } = useTranslation('home')
  const { foods } = useContext(ShopContext)
  const [popularFoods, setPopularFoods] = useState([])

  useEffect(() => {
    const data = foods.filter((item) => item.popular)

    setPopularFoods(data.slice(0, 6))
  }, [foods])

  return (
    <section className="max-padd-container pt-16">
      <Title
        title1={t(TRANSLATION_KEYS.home.popularFoods.title, { ns: 'home' })}
        titleStyles={'text-center pb-16!'}
        paraStyles={'block!'}
      />
      <Swiper
        autoplay={{
          delay: 3500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        breakpoints={{
          700: {
            slidesPerView: 2,
            spaceBetween: 25,
          },
          1050: {
            slidesPerView: 3,
            spaceBetween: 25,
          },
          1400: {
            slidesPerView: 4,
            spaceBetween: 25,
          },
        }}
        modules={[Autoplay, Pagination]}
        className="h-63.75"
      >
        {popularFoods.map((food) => (
          <SwiperSlide key={food._id} className="pl-16">
            <Item food={food} />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  )
}

export default PopularFoods
