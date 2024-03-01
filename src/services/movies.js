import { config } from '../../config'
export const searchMovies = async ({ search, only, id }) => {
  if (search === '') return null
  console.log(search, only, id)
  let type = ''
  if (only === 'movie') {
    type = '&type=movie'
  } else if (only === 'series') {
    type = '&type=series'
  }

  try {
    const response = id
      ? await fetch(`https://www.omdbapi.com/?apikey=${config.apiKey}&i=${id}`)
      : await fetch(`https://www.omdbapi.com/?apikey=${config.apiKey}&s=${search}${type}`)

    if (!response.ok) {
      throw new Error('Error en la solicitud')
    }

    const data = await response.json()

    const movies = id ? [data] : data.Search

    return movies
      ? movies.map(movie => ({
        id: movie.imdbID,
        title: movie.Title,
        year: movie.Year,
        poster: movie.Poster,
        type: movie.Type,
        rated: movie.Rated,
        released: movie.Released,
        runtime: movie.Runtime,
        genre: movie.Genre,
        director: movie.Director,
        writer: movie.Writer,
        actors: movie.Actors,
        plot: movie.Plot,
        language: movie.Language,
        country: movie.Country,
        awards: movie.Awards,
        ratings: movie.Ratings,
        metascore: movie.Metascore,
        imdbRating: movie.imdbRating,
        imdbVotes: movie.imdbVotes,
        boxOffice: movie.BoxOffice
      }))
      : []
  } catch (error) {
    throw new Error('No se pudo obtener la lista de películas')
  }
}

// export const searchMovies = async ({ search, only, id = null }) => {
//   if (search === '') return null

//   let type = ''
//   if (only === 'movie') {
//     type = '&type=movie'
//   } else if (only === 'series') {
//     type = '&type=series'
//   }

//   try {
//     const response = id
//       ? (await fetch(`https://www.omdbapi.com/?apikey=afefc684&i=${id}`)).json()

//       : await fetch(`https://www.omdbapi.com/?apikey=afefc684&s=${search}${type}`)
//     // console.log(response)
//     // const data = await response.json()
//     // const movies = data.Search

//     return movies
//       ? movies.map(movie => ({
//         id: movie.imdbID,
//         title: movie.Title,
//         year: movie.Year,
//         poster: movie.Poster,
//         type: movie.Type
//       }))
//       : []
//   } catch (error) {
//     throw new Error('No se pudo obtener la lista de películas')
//   }
// }
