const express = require('express');
const app = express();
const genreRoutes = require('./routes/genreRoutes');

// Middlewares 
app.use(express.json());
app.use('/api/genres/', genreRoutes);


const port = process.env.PORT || 3000 ;
app.listen(port, () =>{
    console.log(`Listening to port ${port} ..........`);
});