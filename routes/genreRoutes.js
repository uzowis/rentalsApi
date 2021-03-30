const express = require('express');
const router = express.Router();
const genreController = require('../controllers/genreController');

// Create a new genre
router.post('/', genreController.createGenre);

// get all movie genres 
router.get('/', genreController.listGenres);

// get a particular genre
router.get('/:id', genreController.listGenre);

//  Update a particualer genre
router.put('/:id', genreController.updateGenre);

// Delete a particualer genre
router.delete('/:id', genreController.deleteGenre);

// Export the route to be used in index
module.exports = router;


