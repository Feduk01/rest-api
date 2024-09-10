import express from 'express';
import { movies, addMovie, deleteMovie } from './data/moviesData.js';
import { isValidMovieExceptId } from './data/validateData.js';
export const router = express.Router();
//få ut alla filmer
router.get('/', (req, res) => {
    res.send(movies);
});
//plocka ut en utvald film
router.get('/:id', (req, res) => {
    const id = Number(req.params.id);
    const found = movies.find((movie) => movie.id === id);
    if (found) {
        res.send(found);
    }
    else {
        res.sendStatus(404);
    }
});
//Post
router.post('/', (req, res) => {
    //får ut data ur vår request
    const newMovie = req.body;
    //Validering
    if (!isValidMovieExceptId(newMovie)) {
        res.send(404);
        return;
    }
    addMovie(newMovie);
    res.sendStatus(201);
});
//Put
router.put('/:id', (req, res) => {
    const id = Number(req.params.id);
    if (!isValidId(id)) {
        res.sendStatus(400); //bad request
        return;
    }
    const newMovie = req.body;
    if (!isValidMovieExceptId(newMovie)) {
        res.sendStatus(400);
        return;
    }
    const index = movies.findIndex(movie => movie.id === id);
    if (index === -1) {
        res.sendStatus(404);
        return;
    }
    movies[index] = { ...newMovie, id: id };
    res.sendStatus(204);
});
//Delete 
router.delete('/:id', (req, res) => {
    const id = Number(req.params.id);
    if (!isValidId(id)) {
        res.sendStatus(400); //bad request
        return;
    }
    deleteMovie(id);
    res.sendStatus(204);
});
//Hjälp funktion
function isValidId(maybeId) {
    return !isNaN(maybeId) && maybeId >= 0;
}
