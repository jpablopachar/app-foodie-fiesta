import Hero from '../components/Hero'
import Features from '../components/Features'
import PopularFoods from '../components/PopularFoods'
import Testimonials from '../components/Testimonials'
import Footer from '../components/Footer'

/**
 * Muestra la página principal con la presentación, las ventajas del servicio,
 * los alimentos populares, los testimonios y el pie de página.
 *
 * @returns Contenido completo de la página de inicio.
 */
const Home = () => {
  return (
    <>
      <Hero />
      <Features />
      <PopularFoods />
      <Testimonials />
      <div className="max-padd-container">
        <Footer />
      </div>
    </>
  )
}

export default Home
