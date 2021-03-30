const Joi = require('joi');
const {Movie, validate} = require('../models/Movie');
const {Genre} = require('../models/Genre');

// List movies
const listMovies = async (req, res) =>{
    const movies = await Movie.find().select('title genre').sort({title: -1});
    console.log(movies);
    res.send(movies);
    
}

// create a Movie
const createMovie = async (req, res) =>{
    const {error} = validate(req.body);
    if(error) return res.status(404).send(error.details[0].message);
    
    const genre = await Genre.findById(req.body.genreId);
    if(!genre) return res.status(400).send('Genre does not exit');

    const movie = new Movie({
        title : req.body.title,
        genre : {
            _id : genre._id,
            name : genre.name
        },
        qtyInStock : req.body.qtyInStock,
        dailyRentalRate : req.body.dailyRentalRate
    });
    
    try{
    await movie.save();
    res.send(movie);
    console.log(`${req.body.name} Movie added successfully`);
    }
    catch(ex){
        console.log(ex.message);
        res.send(ex.message);
    }
    
    //res.send(movies);
}

// List a single Movie
const listMovie = async (req, res) =>{
    const result = await Movie.findOne({_id : req.params.id});
    if(!result) return res.status(404).send('The ID does not exist');
    res.send(result);
}

// Update a Movie
const updateMovie = async (req, res) => {
    const {error} = validate(req.body);
    if(error) return res.status(404).send(error.details[0].message);

    const movie = await Movie.findByIdAndUpdate(req.params.id, {
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
   
    res.send(movie);
    console.log('Update successfull');
   
}

// Delete a Movie
const deleteMovie = async (req, res) => {
    const movie = await Movie.findByIdAndRemove(req.params.id, { useFindAndModify: false});
   
    res.send(movie);
    console.log('Delete operation successfull');
}






module.exports = {
    listMovies : listMovies,
    createMovie : createMovie,
    listMovie : listMovie,
    updateMovie: updateMovie,
    deleteMovie : deleteMovie
}