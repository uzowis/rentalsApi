const Joi = require('joi');
// const Genre = require('../models/Genre');
const genres = [
    {id : 1, name: 'action'},
    {id : 2, name: 'Horrow'},
    {id : 3, name: 'Comedy'},
    {id : 4, name: 'Drama'},
    {id : 5, name: 'Grifty'}
];

// Validate Api calls Using JOi
function validate(request) {
    const schema = Joi.object({
        name: Joi.string().required().min(3)
    });

    return schema.validate(request);
}

// List genres
const listGenres = (req, res) =>{
    res.send(genres);
}

// create a genre
const createGenre = (req, res) =>{
    const {error} = validate(req.body);
    if(error) return res.status(404).send(error.details[0].message);
    const genre = {id : genres.length + 1, name: req.body.name};
    genres.push(genre);

    console.log(`${req.body.name} Genre added successfully`);
    res.send(genres);
}

// List a single genre
const listGenre = (req, res) =>{
    const result = genres.find(g => g.id === parseInt(req.params.id));
    if(!result) return res.status(404).send('The ID does not exist');
    res.send(result);
}

// Update a genre
const updateGenre = (req, res) => {
    const result = genres.find(g => g.id === parseInt(req.params.id));
    if(!result) return res.status(404).send('The ID does not exist');

    const {error} = validate(req.body);
    if(error) return res.status(404).send(error.details[0].message);

    result.name = req.body.name;
    console.log('Update successfull');
    res.send(genres);
}

// Delete a genre
const deleteGenre = (req, res) => {
    const result = genres.find(g => g.id === parseInt(req.params.id));
    if(!result) return res.status(404).send('The ID does not exist');

    const index = genres.indexOf(result);
    genres.splice(index, 1)
    console.log(`${result.name} Genre deleted`);
    res.send(genres);
}






module.exports = {
    listGenres : listGenres,
    createGenre : createGenre,
    listGenre : listGenre,
    updateGenre: updateGenre,
    deleteGenre : deleteGenre
}