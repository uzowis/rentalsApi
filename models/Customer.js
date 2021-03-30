const Joi = require("joi");
const mongoose = require('mongoose');

// Create the Schema for the collection
const customerSchema = mongoose.Schema({
    name: { type: String, required: true, minlength: 3},
    phone: { type: String, required: true, minlength: 10},
    email: { type: String, required: true, unique: true, minlength: 3}
});

// create a model using the schema
const Customer = mongoose.model('Customer', customerSchema);

// Validate Api calls Using JOi
function validate(request) {
    const schema = Joi.object({
        name: Joi.string().required().min(3),
        phone: Joi.number().required().min(10),
        email: Joi.string().required().email()
    });

    return schema.validate(request);
}


// Export the model
module.exports = {Customer, validate};