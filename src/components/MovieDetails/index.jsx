import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useMovies } from '../../hook/useMovies'
import './styles.css'
import { config } from '../../../config'

export const MovieDetails = () => {
  const { id } = useParams()
  const { movies, getMoviesById } = useMovies({ id })
  const [movieImage, setMovieImage] = React.useState('')
  const [windowWidth, setWindowWidth] = React.useState(window.innerWidth)
  const [windowHeight, setWindowHeight] = React.useState(window.innerHeight)

  React.useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth)
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [windowWidth])

  useEffect(() => {
    getMoviesById({ id })
  }, [id])

  const arrayCategories = movies[0]?.genre.split(', ')

  useEffect(() => {
    const url = `https://movies-tv-shows-database.p.rapidapi.com/?movieid=${id}`
    const options = {
      method: 'GET',
      headers: {
        Type: 'get-movies-images-by-imdb',
        'X-RapidAPI-Key': `${config.rapidApiKey}`,
        'X-RapidAPI-Host': 'movies-tv-shows-database.p.rapidapi.com'
      }
    }
    fetch(url, options)
      .then(response => response.json())
      .then(data => {
        console.log(data)
        setMovieImage(data.poster)
      })
      .catch(err => {
        console.error(err)
      })
  }, [])

  return (
    <div className='container'>
      {
        windowWidth >= 768
          ? (
          <div className='poster'>
            <img src={movies[0]?.poster} alt="" />
          </div>
            )
          : (
          <div className='bg-container'>
        <div className='bg-imagen'>
          <img src={movieImage} alt="imagen de fondo"/>
        </div>
      </div>
            )
      }
{
        windowWidth >= 768
          ? (
              movies.map(movie => (
              <div key={movie.id} className="movie-details-container">
                <div className="movie-info">
                  <h1>{movie.title}</h1>
                  <p><strong>Lanzamiento:</strong> {movie.released}</p>
                  <div className='category-container'>
                    {arrayCategories.map((cat) => <p key={cat} className='category'>{cat}</p>)}
                  </div>
                  <p className='plot'>{movie.plot}</p>
                  <p><strong>Tipo:</strong> {movie.type}</p>
                  <p><strong>Director:</strong> {movie.director}</p>
                  <p><strong>Idioma:</strong> {movie.language}</p>
                  <p><strong>País:</strong> {movie.country}</p>
                  <p><strong>Premios:</strong> {movie.awards}</p>
                  <p><strong>Rating:</strong> {movie.rating}</p>
                  <p><strong>Taquilla:</strong> {movie.boxOffice}</p>
                </div>
              </div>
              )))
          : (

              movies.map(movie => (
                  <div key={movie.id} className="movie-details-container" style={{ top: windowWidth >= 300 ? windowWidth + 170 : windowWidth + 100 }}>
                    <div className="movie-info">
                      <h1>{movie.title}</h1>
                      <p><strong>Lanzamiento:</strong> {movie.released}</p>
                      <div className='category-container'>
                        {arrayCategories.map((cat) => <p key={cat} className='category'>{cat}</p>)}
                      </div>
                      <p className='plot'>{movie.plot}</p>
                      <p><strong>Tipo:</strong> {movie.type}</p>
                      <p><strong>Director:</strong> {movie.director}</p>
                      <p><strong>Idioma:</strong> {movie.language}</p>
                      <p><strong>País:</strong> {movie.country}</p>
                      <p><strong>Premios:</strong> {movie.awards}</p>
                      <p><strong>Rating:</strong> {movie.rating}</p>
                      <p><strong>Taquilla:</strong> {movie.boxOffice}</p>
                    </div>
                  </div>
              ))

            )

}
    </div>
  )
}
