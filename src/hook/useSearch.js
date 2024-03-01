import { useState, useEffect, useRef } from 'react'

export const useSearch = () => {
  const [search, setSearch] = useState('')
  const [error, setError] = useState(null)
  const initialRender = useRef(true)

  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = search === ''
      setError(false)
      return
    }
    // validaciones
    if (search === '') {
      setError('No se puede buscar una pelicula vacia')
      return
    }

    if (search.match(/^\d+$/)) {
      setError('La busqueda no solo debe tener numeros')
      return
    }
    if (search.length < 3) {
      console.log(search.length)
      setError('La busqueda debe tener al menos 3 caracteres')
      return
    }

    setError(null)
  },
  [search])
  return { search, setSearch, error }
}
