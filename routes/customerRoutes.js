const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customerController');

// Create a new Customer
router.post('/', customerController.createCustomer);

// get all  Customers 
router.get('/', customerController.listCustomers);

// get a particular Customer
router.get('/:id', customerController.listCustomer);

//  Update a particualer Customer
router.put('/:id', customerController.updateCustomer);

// Delete a particualer Customer
router.delete('/:id', customerController.deleteCustomer);

// Export the route to be used in index
module.exports = router;


