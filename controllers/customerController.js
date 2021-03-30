const Joi = require('joi');
const {Customer, validate} = require('../models/Customer');

// List customers
const listCustomers = async (req, res) =>{
    const customers = await Customer.find().select('name -_id').sort({name: -1});
    console.log(customers);
    res.send(customers);
    
}

// create a customer
const createCustomer = async (req, res) =>{
    const {error} = validate(req.body);
    if(error) return res.status(404).send(error.details[0].message);

    const customer = new Customer(req.body);
    
    try{
    await customer.save();
    res.send(customer);
    console.log(`${req.body.name} Customer added successfully`);
    }
    catch(ex){
        console.log(ex.message);
        res.send(ex.message);
    }
    
    //res.send(customers);
}

// List a single customer
const listCustomer = async (req, res) =>{
    const result = await Customer.findOne({_id : req.params.id});
    if(!result) return res.status(404).send('The ID does not exist');
    res.send(result);
}

// Update a customer
const updateCustomer = async (req, res) => {
    const {error} = validate(req.body);
    if(error) return res.status(404).send(error.details[0].message);

    const customer = await Customer.findByIdAndUpdate(req.params.id, {
        $set : {
            name: req.body.name
        }
    }, {new: true, useFindAndModify: false});
   
    res.send(customer);
    console.log('Update successfull');
   
}

// Delete a customer
const deleteCustomer = async (req, res) => {
    const customer = await Customer.findByIdAndRemove(req.params.id, { useFindAndModify: false});
   
    res.send(customer);
    console.log('Delete operation successfull');
}






module.exports = {
    listCustomers : listCustomers,
    createCustomer : createCustomer,
    listCustomer : listCustomer,
    updateCustomer: updateCustomer,
    deleteCustomer : deleteCustomer
}