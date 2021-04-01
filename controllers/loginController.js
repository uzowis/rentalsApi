const {User} = require('../models/User');
const bcrypt = require('bcrypt');
const Joi = require('joi');
const jsonwebtoken = require('jsonwebtoken');

// validate login details
function validateUser(request) {
    const schema = Joi.object({
        email : Joi.string().required().email().min(5).max(255),
        password : Joi.string().required().min(3).max(1024)
    });
    return schema.validate(request);
}

 const loginUser = async (req, res) =>{
    const {error} = validateUser(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const user = await User.findOne({email: req.body.email});
    if(!user) return res.status(400).send('Wrong Username or Password!');

    const isPassword = await bcrypt.compare(req.body.password, user.password);
    if(!isPassword) return res.status(400).send("Wrong Username or Password!");

    res.send("Hurray! you're Logged in");
    console.log("Login Success");


}

exports.loginUser = loginUser;