const express = require('express');
const router = express.Router();
const rentalController = require('../controllers/rentalController');

// Create a new Rental
router.post('/', rentalController.createRental);

// get all  Rentals 
router.get('/', rentalController.listRentals);

// get a particular Rental
router.get('/:id', rentalController.listRental);

// //  Update a particualer Rental
// router.put('/:id', rentalController.updateRental);

// // Delete a particualer Rental
// router.delete('/:id', rentalController.deleteRental);

// Export the route to be used in index
module.exports = router;


