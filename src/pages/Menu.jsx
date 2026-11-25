import { useContext, useEffect, useState } from 'react'
import { RiSearch2Line } from 'react-icons/ri'
import { LuSettings2 } from 'react-icons/lu'
import { ShopContext } from '../context/ShopContext'
import { categories } from '../assets/data'
import Title from '../components/Title'
import Item from '../components/Item'

const Menu = () => {
  const { foods } = useContext(ShopContext)

  const [category, setCategory] = useState([])
  const [sortType, setSortType] = useState('relevant')
  const [filteredFoods, setFilteredFoods] = useState([])
  const [showCategories, setShowCategories] = useState(true)
  const [search, setSearch] = useState('')
  const [currentPage, setCurrentPage] = useState(1)

  const itemsPerPage = 10

  const toggleFilter = (value, setState) => {
    setState((prev) =>
      prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value],
    )
  }

  const applyFilters = () => {
    let filtered = [...foods]
    if (search) {
      filtered = filtered.filter((food) => food.name.toLowerCase().includes(search.toLowerCase()))
    }

    if (category.length) {
      filtered = filtered.filter((food) => category.includes(food.category))
    }

    return filtered
  }

  const applySorting = (foodList) => {
    const sortedFoods = [...foodList]

    switch (sortType) {
      case 'low':
        return sortedFoods.sort((a, b) => {
          const aPrice = Object.values(a.price)[0]
          const bPrice = Object.values(b.price)[0]

          return aPrice - bPrice
        })
      case 'high':
        return sortedFoods.sort((a, b) => {
          const aPrice = Object.values(a.price)[0]
          const bPrice = Object.values(b.price)[0]

          return bPrice - aPrice
        })
      default:
        return sortedFoods
    }
  }

  const toggleShowCategories = () => {
    setShowCategories(!showCategories)
  }

  useEffect(() => {
    let filtered = applyFilters()
    let sorted = applySorting(filtered)

    setFilteredFoods(sorted)
    setCurrentPage(1)
  }, [category, sortType, foods, search])

  const getPaginatedFoods = () => {
    const startIndex = (currentPage - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage

    return filteredFoods.slice(startIndex, endIndex)
  }

  const totalPages = Math.ceil(filteredFoods.length / itemsPerPage)

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
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search here..."
            className="border-none outline-hidden w-full text-sm pl-4 bg-deep"
          />
          <div
            onClick={toggleShowCategories}
            className="flexCenter cursor-pointer text-lg border-l border-gray-200 pl-2"
          >
            <LuSettings2 />
          </div>
        </div>
      </div>
      {showCategories && (
        <div className="my-14">
          <h3 className="h4 mb-4 hidden sm:flex">Select by Category </h3>
          <div className="flexCenter sm:flexStart flex-wrap gap-x-4 sm:gap-x-12 gap-y-4">
            {categories.map((cat) => (
              <label key={cat.name}>
                <input
                  type="checkbox"
                  value={cat.name}
                  onChange={(e) => toggleFilter(e.target.value, setCategory)}
                  className="hidden peer"
                />
                <div className="flexCenter gap-2 peer-checked:text-red-500 cursor-pointer bg-deep rounded-full pr-6">
                  <img src={cat.image} alt={cat.name} className="object-cover h-20 w-20" />
                  <span className="medium-14">{cat.name}</span>
                </div>
              </label>
            ))}
          </div>
        </div>
      )}
      <div className="my-8 mb-20">
        <div className="flexBetween items-start! gap-7 flex-wrap pb-16 max-sm:flexCenter text-center max-sm:pb-24">
          <Title title1={'Food'} title2={'Selection'} titleStyles={'pb-0! xl:text-start'} />
          <div className="flexCenter gap-x-2">
            <span className="hidden sm:flex medium-16">Sort By:</span>
            <select
              onChange={(e) => setSortType(e.target.value)}
              className="text-sm p-2.5 outline-hidden bg-deep text-gray-30 rounded-sm ring-1 ring-slate-900/10"
            >
              <option value="relevant">Relevant</option>
              <option value="low">Low</option>
              <option value="high">High</option>
            </select>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-20 pl-11">
          {getPaginatedFoods().length > 0 ? (
            getPaginatedFoods().map((food) => <Item food={food} key={food._id} />)
          ) : (
            <p className="capitalize">Nod foods found for selected filters</p>
          )}
        </div>
      </div>
      <div className="flexCenter mt-14 mb-10 gap-2 sm:gap-4">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((prev) => prev - 1)}
          className={`btn-secondary py-1! px-3! ${
            currentPage === 1 && 'opacity-50 cursor-not-allowed'
          }`}
        >
          Previous
        </button>
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => setCurrentPage(index + 1)}
            className={`btn-outline py-1! px-3! ${currentPage === index + 1 && 'bg-deep!'}`}
          >
            {index + 1}
          </button>
        ))}
        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((prev) => prev + 1)}
          className={`btn-secondary py-1! px-3! ${
            currentPage === totalPages && 'opacity-50 cursor-not-allowed'
          }`}
        >
          Next
        </button>
      </div>
    </section>
  )
}

export default Menu
