const Joi = require('joi');
const Genre = require('../models/Genre');

// Validate Api calls Using JOi
function validate(request) {
    const schema = Joi.object({
        name: Joi.string().required().min(3)
    });

    return schema.validate(request);
}

// List genres
const listGenres = async (req, res) =>{
    const genres = await Genre.find().select('name -_id').sort({name: -1});
    console.log(genres);
    res.send(genres);
    
}

// create a genre
const createGenre = async (req, res) =>{
    const {error} = validate(req.body);
    if(error) return res.status(404).send(error.details[0].message);

    const genre = new Genre(req.body);
    await genre.save();
    res.send(genre);

    console.log(`${req.body.name} Genre added successfully`);
    //res.send(genres);
}

// List a single genre
const listGenre = async (req, res) =>{
    const result = await Genre.findOne({_id : req.params.id});
    if(!result) return res.status(404).send('The ID does not exist');
    res.send(result);
}

// Update a genre
const updateGenre = async (req, res) => {
    const {error} = validate(req.body);
    if(error) return res.status(404).send(error.details[0].message);

    const genre = await Genre.findByIdAndUpdate(req.params.id, {
        $set : {
            name: req.body.name
        }
    }, {new: true, useFindAndModify: false});
   
    res.send(genre);
    console.log('Update successfull');
   
}

// Delete a genre
const deleteGenre = async (req, res) => {
    const genre = await Genre.findByIdAndRemove(req.params.id, { useFindAndModify: false});
   
    res.send(genre);
    console.log('Delete operation successfull');
}






module.exports = {
    listGenres : listGenres,
    createGenre : createGenre,
    listGenre : listGenre,
    updateGenre: updateGenre,
    deleteGenre : deleteGenre
}