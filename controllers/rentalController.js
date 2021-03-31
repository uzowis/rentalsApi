const Joi = require('joi');
const {Rental, validate} = require('../models/Rental');
const {Genre} = require('../models/Genre');
const {Movie} = require('../models/Movie');
const {Customer} = require('../models/Customer');

// List Rentals
const listRentals= async (req, res) =>{
    const rentals = await Rental.find().select().sort({customer: -1});
    console.log(rentals);
    res.send(rentals);
    
}

// create a Rental
const createRental = async (req, res) =>{
    const {error} = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    
    const customer = await Customer.findById(req.body.customerId);
    if(!customer) return res.status(400).send('Customer does not exit'); 
    
    const movie = await Movie.findById(req.body.movieId);
    if(!movie) return res.status(400).send('Movie does not exit');
    if(movie.qtyInStock === 0) return res.status(400).send('Movie is out of stock')
    
    const genre = await Genre.findById(movie.genre._id);
    if(!genre) return res.status(400).send('Genre does not exit');



    const rental = new Rental({
        customer : {
            _id : customer._id,
            name : customer.name,
            phone : customer.phone
        },
        movie : {
            _id : movie._id,
            title : movie.title,
            genre : genre.name
        }
    });
    
    try{
    await rental.save();
    movie.qtyInStock --;
    movie.save();

    res.send(rental);
    console.log(`${movie.title} Was Rented!!!`);
    }
    catch(ex){
        console.log(ex.message);
        res.send(ex.message);
    }
    
    //res.send(Rentals);
}

// List a single Rental
const listRental = async (req, res) =>{
    const result = await Rental.findOne({_id : req.params.id});
    if(!result) return res.status(404).send('The ID does not exist');
    res.send(result);
}

// Update a Rental
const updateRental = async (req, res) => {
    const {error} = validate(req.body);
    if(error) return res.status(404).send(error.details[0].message);
    const genre = await Genre.findById(req.body.genreId);
    if(!genre) return res.status(400).send('Genre does not exist');
    
    const Rental = await Rental.findByIdAndUpdate(req.params.id, {
        $set : {
            title : req.body.title,
            genre : {
                _id : genre._id,
                name : genre.name
            },
            qtyInStock : req.body.qtyInStock,
            dailyRentalRate : req.body.dailyRentalRate
        }
    }, {new: true, useFindAndModify: false});
   
    res.send(Rental);
    console.log('Update successfull');
   
}

// Delete a Rental
const deleteRental = async (req, res) => {
    const Rental = await Rental.findByIdAndRemove(req.params.id, { useFindAndModify: false});
   
    res.send(Rental);
    console.log('Delete operation successfull');
}






module.exports = {
    listRentals : listRentals,
    createRental : createRental,
    listRental : listRental
    // updateRental: updateRental,
    // deleteRental : deleteRental
}