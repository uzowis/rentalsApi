const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const loginController = require('../controllers/loginController');
const auth = require('../middlewares/auth');

// Create a new User
router.post('/', userController.createUser);

// get all  Users
router.get('/', auth, userController.listUsers);

// Login User
router.post('/login', loginController.loginUser);

// // get a particular Rental
// router.get('/:id', rentalController.listRental);

// //  Update a particualer Rental
// router.put('/:id', rentalController.updateRental);

// // Delete a particualer Rental
// router.delete('/:id', rentalController.deleteRental);

// Export the route to be used in index
module.exports = router;


