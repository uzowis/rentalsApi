const Joi = require('joi');
const { request } = require('express');
const mongoose = require('mongoose');

// Create the Schema for the collection
const genreSchema = mongoose.Schema({
    name: { type: String, required: true, minlength: 3}
});

// create a model using the schema
const Genre = mongoose.model('Genre', genreSchema);

// Validate Api calls Using JOi
function validate(request) {
    const schema = Joi.object({
        name: Joi.string().required().min(3)
    });

    return schema.validate(request);
}


// Export the model
module.exports = {Genre, validate, genreSchema};