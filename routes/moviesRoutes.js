const express = require('express');
const router = express.Router();
const movieController = require('../controllers/moviesController');

// Create a new Movie
router.post('/', movieController.createMovie);

// get all  Movies 
router.get('/', movieController.listMovies);

// get a particular Movie
router.get('/:id', movieController.listMovie);

//  Update a particualer Movie
router.put('/:id', movieController.updateMovie);

// Delete a particualer Movie
router.delete('/:id', movieController.deleteMovie);

// Export the route to be used in index
module.exports = router;


