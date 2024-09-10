import express, { Router, Request, Response } from 'express'
import { Movie, movies, MovieNoId, addMovie, deleteMovie} from './data/moviesData.js'
import { isValidMovieExceptId } from './data/validateData.js'
import { number } from 'joi'

export const router: Router = express.Router()

//Alla URL-parametrar är strängar!
interface IdParam {
  id: string
}

//få ut alla filmer
router.get('/', (req: Request, res: Response) => {
  res.send(movies)
})

//plocka ut en utvald film
router.get('/:id', (req: Request<IdParam>, res: Response) => {
  const id: number = Number(req.params.id)
  const found: Movie | undefined = movies.find((movie) => movie.id === id)
  if (found) {
    res.send(found)
  } else {
    res.sendStatus(404)
  }
})

//Post
router.post('/', (req: Request<void, void, MovieNoId>, res: Response) => {
  //får ut data ur vår request
  const newMovie: MovieNoId = req.body
  //Validering
  if (!isValidMovieExceptId(newMovie)) {
    res.send(404)
    return
  }
  addMovie(newMovie)
  res.sendStatus(201)
})

//Put
router.put('/:id',(req: Request<IdParam, void, MovieNoId>, res: Response) => {
  const id: number = Number(req.params.id)
  if(!isValidId(id)){
    res.sendStatus(400)//bad request
    return
  }

  const newMovie: MovieNoId = req.body
  if(!isValidMovieExceptId(newMovie)){
    res.sendStatus(400)
    return
  }

  const index: number = movies.findIndex(movie => movie.id === id)
  if(index === -1){
    res.sendStatus(404)
    return
  }

  movies[index] = {...newMovie, id:id}
  res.sendStatus(204)
})


//Delete 

router.delete('/:id', (req: Request<IdParam>, res:Response)=>{
  const id: number = Number(req.params.id)
  if(!isValidId(id)){
    res.sendStatus(400)//bad request
    return
  }
  deleteMovie(id)
  res.sendStatus(204)
})

//Hjälp funktion
function isValidId(maybeId: number): boolean {
	return !isNaN(maybeId) && maybeId >= 0
}

