const _ = require('lodash');
const bcrypt = require('bcrypt');
const Joi = require('joi');
const {User, validate} = require('../models/User');

// List customers
const listUsers = async (req, res) =>{
    const users = await User.find().select('name email isAdmin').sort({name: -1});
    console.log(users);
    res.send(users);
    
}

// create new user
const createUser = async (req, res) =>{
    const {error} = validate(req.body);
    if(error) return res.status(404).send(error.details[0].message);

    let user = await User.findOne({email: req.body.email});
    if(user) return res.status(400).send('User already exists!');

    const user = new User(_.pick(req.body, ['name', 'email', 'password', 'isAdmin']));
    
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);

    const token = user.generateAuthToken();

    try{
    await user.save();
    res.header('x-auth-token', token ).send(_.pick(user, ['_id', 'email', 'name', 'isAdmin']));
    console.log(`${user.name}, Your acccount was successfully created`);
    }
    catch(ex){
        console.log(ex.message);
        res.send(ex.message);
    }
    
    //res.send(customers);
}

// // List a single customer
// const listCustomer = async (req, res) =>{
//     const result = await Customer.findOne({_id : req.params.id});
//     if(!result) return res.status(404).send('The ID does not exist');
//     res.send(result);
// }

// // Update a customer
// const updateCustomer = async (req, res) => {
//     const {error} = validate(req.body);
//     if(error) return res.status(404).send(error.details[0].message);

//     const customer = await Customer.findByIdAndUpdate(req.params.id, {
//         $set : {
//             name: req.body.name
//         }
//     }, {new: true, useFindAndModify: false});
   
//     res.send(customer);
//     console.log('Update successfull');
   
// }

// // Delete a customer
// const deleteCustomer = async (req, res) => {
//     const customer = await Customer.findByIdAndRemove(req.params.id, { useFindAndModify: false});
   
//     res.send(customer);
//     console.log('Delete operation successfull');
// }






module.exports = {
    createUser: createUser,
    listUsers : listUsers
}