import { useState } from 'react'
import { SORT_TYPES } from '../constants/shop'

/**
 * Gestiona la búsqueda, los filtros, el orden y la paginación del menú.
 * @param {object[]} foods - Productos disponibles.
 * @returns Estado y acciones para mostrar el menú filtrado.
 */
export const useFoodFilters = (foods) => {
  const [category, setCategory] = useState([])
  const [sortType, setSortType] = useState(SORT_TYPES.RELEVANT)
  const [search, setSearch] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  const toggleCategory = (value) => {
    setCategory((prev) =>
      prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value],
    )
    setCurrentPage(1)
  }

  const changeSearch = (value) => {
    setSearch(value)
    setCurrentPage(1)
  }

  const changeSort = (value) => {
    setSortType(value)
    setCurrentPage(1)
  }

  const filtered = foods.filter((food) =>
    food.name.toLowerCase().includes(search.toLowerCase()) &&
    (!category.length || category.includes(food.category)),
  )

  if (sortType === SORT_TYPES.LOW || sortType === SORT_TYPES.HIGH) {
    filtered.sort((a, b) => {
      const difference = Object.values(a.price)[0] - Object.values(b.price)[0]
      return sortType === SORT_TYPES.LOW ? difference : -difference
    })
  }

  const totalPages = Math.ceil(filtered.length / itemsPerPage)
  const page = Math.min(currentPage, Math.max(totalPages, 1))
  const pageFoods = filtered.slice((page - 1) * itemsPerPage, page * itemsPerPage)

  return { search, changeSearch, changeSort, toggleCategory, page, setCurrentPage, totalPages, pageFoods }
}
