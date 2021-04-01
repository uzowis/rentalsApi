const config = require('config');
const Joi = require("joi");
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

// Create the Schema for the collection
const userSchema = mongoose.Schema({
    name: { type: String, required: true, minlength: 3, maxlength: 50},
    password: { type: String, required: true, minlength: 3, maxlength : 1024},
    email: { type: String, required: true, unique: true, minlength: 5, maxlength: 255},
    isAdmin : {type : Boolean, default: false}
});

// generate Authentication Token
userSchema.methods.generateAuthToken = async function () {
    const token = await jwt.sign({_id : this._id, email: this.email, isAdmin: this.isAdmin}, config.get('jwtPrivateKey'));
    return token;
}


// create a model using the schema
const User = mongoose.model('User', userSchema);

// Validate Api calls Using JOi
function validate(request) {
    const schema = Joi.object({
        name: Joi.string().required().min(3),
        password: Joi.string().required().min(3).max(1024),
        email: Joi.string().required().email().min(5).max(255),
        isAdmin: Joi.boolean()
    });

    return schema.validate(request);
}


// Export the model
module.exports = {User, validate};