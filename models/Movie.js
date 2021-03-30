const mongoose = require('mongoose');
const Joi = require('joi');
const { genreSchema }= require('./Genre');


// Create movie Schema
const movieSchema = mongoose.Schema({
    title : { type: String, required: true},
    qtyInStock : {type: Number, min: 0, required: true},
    genre : { type: genreSchema, required: true},
    dailyRentalRate : {type : Number, required: true, min: 0}
});

const Movie = mongoose.model('Movie', movieSchema);

// Validate user input using JOi
function validate(request) {
    const schema = Joi.object({
        title : Joi.string().required().min(2),
        genreId: Joi.string().required(),
        dailyRentalRate: Joi.number().required().min(0),
        qtyInStock: Joi.number().required().min(0)

    });
    return schema.validate(request);
    
}

module.exports = {Movie, validate};