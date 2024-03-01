import { Link } from 'react-router-dom'

export const MovieCard = ({ movie }) => {
  return (
    <li className="movie" key={movie.id} >
      <h3>{movie.title}</h3>
      <p>{movie.year}</p>

      {
        movie.poster === 'N/A'
          ? <img src='https://via.placeholder.com/300x400?text=Poster+no+disponible' alt={movie.title} />
          : <img src={movie.poster} alt={movie.title} />
      }
      <Link to={`/${movie.id}`}>
        Ver detalles
      </Link>
    </li>
  )
}
