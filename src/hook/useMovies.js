import { useMemo, useRef, useState } from 'react'
import { searchMovies } from '../services/movies'
export const useMovies = ({ search, sort, only }) => {
  const [movies, setMovies] = useState([])
  const previusSearch = useRef(search)

  const sortedMovies = useMemo(() => {
    // con use memo
    // si cambia la busqueda o el ordenamiento
    // se vuelve a ejecutar la funcion de ordenamiento
    return movies
      ? [...movies].sort((a, b) => {
          if (sort === 'Titulo') {
            return a.title.localeCompare(b.title)
          }
          if (sort === 'Fecha de lanzamiento descendente') {
            return a.year.substring(0, 4) - b.year.substring(0, 4)
          }
          if (sort === 'Fecha de lanzamiento ascendente') {
            return b.year.substring(0, 4) - a.year.substring(0, 4)
          }
          return 0
        })
      : movies
  }, [movies, sort])

  const findOnlySort = (movies) => {
    if (only === 'movie') {
      return movies.filter(movie => movie.type === 'movie')
    } else if (only === 'series') {
      return movies.filter(movie => movie.type === 'series')
    }
    return movies
  }

  const getMovies = useMemo(() => {
    return async ({ search }) => {
      if (search === previusSearch.current) return
      if (search.length < 3) {
        setMovies([])
        return
      }
      try {
        previusSearch.current = search
        const newMovies = await searchMovies({ search, only })
        setMovies(newMovies)
      } catch (error) {
        console.error(error)
      }
    }
  }, [only])

  const getMoviesById = async ({ id }) => {
    try {
      if (id === '') {
        setMovies([])
        return
      }
      const newMovies = await searchMovies({ id })
      setMovies(newMovies)
    } catch (error) {
      console.error(error)
    }
  }
  return { movies: findOnlySort(sortedMovies), getMovies, getMoviesById }
}
