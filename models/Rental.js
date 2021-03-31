const mongoose = require('mongoose');
const Joi = require('joi');

// const {customerSchema} = require('./Customer');
// const {movieSchema} = require('./Movie');


// create rental schema
const rentalSchema = mongoose.Schema({
    customer : { 
        type: new mongoose.Schema({
            name: { type: String, required: true, trim: true, minlength : 5, maxlength : 255 },
            phone: { type: String, required: true, minlength : 10, maxlength : 50 },
            isGold : Boolean

        }),
        required: true
    },
    
    movie : { 
        type: new mongoose.Schema({
            title: { type: String, required: true, trim: true, minlength : 5, maxlength : 255 },
            genre: { type: String, required: true, minlength : 3, maxlength : 255 },
            dailyRentalRate: { type: Number, min: 0, max: 255},
            

        }),
        required: true
    },

    dateRented : {type : Date, required: true, default: Date.now},
    dateReturned : Date,
    rentalFee : {type: Number, min: 0 , max: 255}


});

const Rental = mongoose.model('Rental', rentalSchema);

// Validate Rentals
function validateRental(request) {
    const schema = Joi.object({
        customerId : Joi.string().required(),
        movieId : Joi.string().required()
    });

    return schema.validate(request);
    
}

module.exports = {
    validate : validateRental,
    Rental : Rental
}