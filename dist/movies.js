import express from 'express';
import { movies, addMovie } from './data/moviesData.js';
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
