import { Route, Routes } from 'react-router-dom'
import { Movies } from './components/Movies'
import { MovieDetails } from './components/MovieDetails/index'
import './App.css'

const App = () => {
  return (
    <div className="page">
        <Routes>
          <Route path='/' element={<Movies />} />
          <Route path='/:id' element={<MovieDetails />} />
        </Routes>
    </div>
  )
}
export default App
