import React, { useRef, useState, useCallback } from 'react'
import { MovieCard } from './card'
import { Form } from '../Form/index'
import { SelectList } from '../SelectList/index'
import { OnlySelect } from '../OnlySelect/index'
import { useSearch } from '../../hook/useSearch.js'
import { useMovies } from '../../hook/useMovies.js'
import { debaunce } from '../../utils/debounce'
import { Header } from '../Header/index.jsx'

const ListOfMovies = ({ movies }) => {
  return (
        <ul className="movies">
            {movies.map((movie, index) => {
              return (
                <MovieCard movie={movie} key={index} />
              )
            })}
        </ul>
  )
}

const NoMoviesResult = () => {
  return <p>No se encontraron películas</p>
}

export const Movies = () => {
  const [sort, setSort] = useState('Fecha de lanzamiento ascendente')
  const [only, setOnly] = useState('')
  const { search, setSearch, error } = useSearch()
  const { movies, getMovies } = useMovies({ search, sort, only })
  const previusSearch = useRef(search)

  const getMoviesDebunced = useCallback(debaunce(search => getMovies({ search }), 500), [getMovies])

  const handleSubmit = e => {
    e.preventDefault()
    // Forma nativa de obtener los valores de un formulario
    // const field = Object.fromEntries(new window.FormData(e.target))
    // console.log(field)
    getMovies({ search, only })
    previusSearch.current = search
    console.log('Soy la previusSearch.current', previusSearch.current)
  }

  const handleInputChange = (e) => {
    const newSearch = e.target.value
    setSearch(newSearch)
    getMoviesDebunced(newSearch)
  }

  const handleSortChange = (e) => {
    const newSort = e.target.value
    setSort(newSort)
    console.log('Soy el sort', newSort)
  }
  const handleOnlyChange = (e) => {
    const newOnly = e.target.value
    setOnly(newOnly)
    console.log('Soy el only', newOnly)
  }
  const optionOnly = [
    { value: '', label: 'Todo' },
    { value: 'movie', label: 'Peliculas' },
    { value: 'series', label: 'Series' }
  ]

  const hasMovies = movies.length > 0
  return (
    <>
    <Header title={'Buscador de peliculas'} />
    <div>
        <Form search={search} changeInput={handleInputChange} submitForm={handleSubmit} error={error} />
        <OnlySelect onChange={handleOnlyChange} value={only} options={optionOnly} />
        <SelectList onChange={handleSortChange} value={sort} />

        {error && <p style={{ color: 'red' }}>{error}</p>}
      </div>
      {
        hasMovies ? <ListOfMovies movies={movies} /> : <NoMoviesResult />
      }
    </>
  )
}
