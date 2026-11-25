import Footer from '../components/Footer'
import { FaEnvelope, FaHeadphones, FaLocationDot, FaPhone } from 'react-icons/fa6'
import Title from '../components/Title'
import ContactDetail from '../components/ContactDetail'
import { useTranslation } from 'react-i18next'
import { TRANSLATION_KEYS } from '../constants/translationKeys'

/**
 * Muestra el formulario, los datos de contacto y el mapa de ubicación.
 * @returns Página de contacto.
 */
const Contact = () => {
  const { t } = useTranslation('common')

  const keys = TRANSLATION_KEYS.common.contact

  return (
    <section className="max-padd-container mt-24">
      <div className="flex flex-col xl:flex-row gap-20 py-6">
        <div>
          <Title title1={t(keys.get)} title2={t(keys.touch)} title1Styles={'h3'} />
          <p className="mb-5 max-w-xl">
            {t(keys.description)}
          </p>
          <form>
            <div className="flex gap-x-5">
              <div className="w-1/2 mb-4">
                <input
                  type="text"
                  id="name"
                  placeholder={t(keys.name)}
                  className="w-full mt-1 py-1.5 px-3 border-none ring-1 ring-slate-900/5 regular-14 bg-deep rounded-sm"
                />
              </div>
              <div className="w-1/2 mb-4">
                <input
                  type="email"
                  id="email"
                  placeholder={t(keys.emailPlaceholder)}
                  className="w-full mt-1 py-1.5 px-3 border-none ring-1 ring-slate-900/5 regular-14 bg-deep rounded-sm"
                />
              </div>
            </div>
            <div className="mb-4">
              <textarea
                id="message"
                rows="4"
                placeholder={t(keys.message)}
                className="w-full mt-1 py-1.5 px-3 border-none ring-1 ring-slate-900/5 regular-14 bg-deep rounded-sm resize-none"
              ></textarea>
            </div>
            <button type="submit" className="btn-secondary rounded-sm! shadow-xs">
              {t(keys.send)}
            </button>
          </form>
        </div>
        <div>
          <Title title1={t(keys.title)} title2={t(keys.details)} title1Styles={'h3'} />
          <p className="max-w-xl mb-4">
            {t(keys.detailsDescription)}
          </p>
          <div className="flex flex-col gap-3">
            <ContactDetail title={t(keys.location)} icon={<FaLocationDot />}>123 Foodessa Street, Food City, FC 12345</ContactDetail>
            <ContactDetail title={t(keys.email)} icon={<FaEnvelope />}>info@foodessa.com</ContactDetail>
            <ContactDetail title={t(keys.phone)} icon={<FaPhone />}>+1 (800) 123-4567</ContactDetail>
            <ContactDetail title={t(keys.support)} icon={<FaHeadphones />}>{t(keys.supportText)}</ContactDetail>
          </div>
        </div>
      </div>
      <div className="py-20">
        <Title title1={t(keys.find)} title2={t(keys.here)} title1Styles={'h3'} />
        <div className="w-full h-96 rounded-lg overflow-hidden shadow-md">
          <iframe
            className="w-full h-full"
            title={t(keys.map)}
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d100940.18159943166!2d-122.52000124311752!3d37.75767131487411!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80859a6d00690021%3A0x4a501367f076adff!2sSan%20Francisco%2C%20CA%2C%20USA!5e0!3m2!1sen!2s!4v1732252435611!5m2!1sen!2s"
            allowFullScreen
            loading="lazy"
          ></iframe>
        </div>
      </div>
      <Footer />
    </section>
  )
}

export default Contact
