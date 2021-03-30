const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/genreproject')
    .then(() =>console.log('Successfully connected to database'))
    .catch(err => console.error('Couldnt connect to mongodb...', err));

// Create the Schema for the collection
const genreSchema = mongoose.Schema({
    name: { type: String, required: true, minlength: 3}
});

// create a model using the schema
const Genre = mongoose.model('Genre', genreSchema);


// Export the model
module.exports = Genre;