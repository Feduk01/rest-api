import express from 'express';
import { router } from './movies.js';
const app = express();
const port = 4200;
// Middleware
app.use(express.json()); // lägger saker i req.body
app.use('/', (req, res, next) => {
    console.log(`${req.method} ${req.url}`, req.body);
    next();
});
// Test get request
app.get('/', (req, res) => {
    res.status(200).send('Hello from server');
});
app.use('/movies', router);
app.listen(port, () => {
    console.log('Mini-project-2 Api server is online on port: ' + port);
});
