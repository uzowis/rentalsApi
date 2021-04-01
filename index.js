const config = require('config');
const mongoose = require('mongoose');
const express = require('express');
const app = express();
const genreRoutes = require('./routes/genreRoutes');
const customerRoutes = require('./routes/customerRoutes');
const moviesRoutes = require('./routes/moviesRoutes');
const rentalRoutes = require('./routes/rentalRoutes');
const usersRoutes = require('./routes/usersRoutes');

// connect to db
mongoose.connect(config.get('db'))
    .then(() =>console.log('Successfully connected to database'))
    .catch(err => console.error('Couldnt connect to mongodb...', err));


// Middlewares 
app.use(express.json());
app.use('/api/genres/', genreRoutes);
app.use('/api/customers/', customerRoutes);
app.use('/api/movies/', moviesRoutes);
app.use('/api/rentals/', rentalRoutes);
app.use('/api/users/', usersRoutes);


const port = process.env.PORT || 3000 ;
app.listen(port, () =>{
    console.log(`Listening to port ${port} ..........`);
});