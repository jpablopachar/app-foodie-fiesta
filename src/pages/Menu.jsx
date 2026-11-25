import { useContext, useState } from 'react'
import { RiSearch2Line } from 'react-icons/ri'
import { LuSettings2 } from 'react-icons/lu'
import { ShopContext } from '../context/ShopContext'
import { categories } from '../assets/data'
import Title from '../components/Title'
import Item from '../components/Item'
import { useFoodFilters } from '../hooks/useFoodFilters'
import { useTranslation } from 'react-i18next'
import { TRANSLATION_KEYS } from '../constants/translationKeys'

/**
 * Muestra los alimentos con búsqueda, filtros, ordenación y paginación.
 * @returns Página del menú.
 */
const Menu = () => {
  const { t } = useTranslation('common')

  const keys = TRANSLATION_KEYS.common.menu

  const { foods } = useContext(ShopContext)

  const { search, changeSearch, changeSort, toggleCategory, page, setCurrentPage, totalPages, pageFoods } = useFoodFilters(foods)

  const [showCategories, setShowCategories] = useState(true)

  return (
    <section className="max-padd-container mt-24">
      <div className="w-full max-w-2xl flexCenter">
        <div className="inline-flex items-center justify-center bg-deep overflow-hidden w-full rounded-full p-4 px-5">
          <div className="text-lg cursor-pointer">
            <RiSearch2Line />
          </div>
          <input
            type="text"
            value={search}
            onChange={(e) => changeSearch(e.target.value)}
            placeholder={t(keys.search)}
            className="border-none outline-hidden w-full text-sm pl-4 bg-deep"
          />
          <div
            onClick={() => setShowCategories((previous) => !previous)}
            className="flexCenter cursor-pointer text-lg border-l border-gray-200 pl-2"
          >
            <LuSettings2 />
          </div>
        </div>
      </div>
      {showCategories && (
        <div className="my-14">
          <h3 className="h4 mb-4 hidden sm:flex">{t(keys.categories)}</h3>
          <div className="flexCenter sm:flexStart flex-wrap gap-x-4 sm:gap-x-12 gap-y-4">
            {categories.map((cat) => (
              <label key={cat.name}>
                <input
                  type="checkbox"
                  value={cat.name}
                  onChange={(e) => toggleCategory(e.target.value)}
                  className="hidden peer"
                />
                <div className="flexCenter gap-2 peer-checked:text-red-500 cursor-pointer bg-deep rounded-full pr-6">
                  <img src={cat.image} alt={cat.name} className="object-cover h-20 w-20" />
                  <span className="medium-14">{t(`${keys.categoryNames}.${cat.name}`, { defaultValue: cat.name })}</span>
                </div>
              </label>
            ))}
          </div>
        </div>
      )}
      <div className="my-8 mb-20">
        <div className="flexBetween items-start! gap-7 flex-wrap pb-16 max-sm:flexCenter text-center max-sm:pb-24">
          <Title title1={t(keys.food)} title2={t(keys.selection)} titleStyles={'pb-0! xl:text-start'} />
          <div className="flexCenter gap-x-2">
            <span className="hidden sm:flex medium-16">{t(keys.sort)}</span>
            <select
              onChange={(e) => changeSort(e.target.value)}
              className="text-sm p-2.5 outline-hidden bg-deep text-gray-30 rounded-sm ring-1 ring-slate-900/10"
            >
              <option value="relevant">{t(keys.relevant)}</option>
              <option value="low">{t(keys.low)}</option>
              <option value="high">{t(keys.high)}</option>
            </select>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-20 pl-11">
          {pageFoods.length > 0 ? (
            pageFoods.map((food) => <Item food={food} key={food._id} />)
          ) : (
            <p className="capitalize">{t(keys.empty)}</p>
          )}
        </div>
      </div>
      <div className="flexCenter mt-14 mb-10 gap-2 sm:gap-4">
        <button
          disabled={page === 1}
          onClick={() => setCurrentPage(page - 1)}
          className={`btn-secondary py-1! px-3! ${
            page === 1 && 'opacity-50 cursor-not-allowed'
          }`}
        >
          {t(keys.previous)}
        </button>
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => setCurrentPage(index + 1)}
            className={`btn-outline py-1! px-3! ${page === index + 1 && 'bg-deep!'}`}
          >
            {index + 1}
          </button>
        ))}
        <button
          disabled={page >= totalPages}
          onClick={() => setCurrentPage(page + 1)}
          className={`btn-secondary py-1! px-3! ${
            page >= totalPages && 'opacity-50 cursor-not-allowed'
          }`}
        >
          {t(keys.next)}
        </button>
      </div>
    </section>
  )
}

export default Menu
