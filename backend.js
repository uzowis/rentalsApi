// This app is an api endpoint for CRUD operations

const express = require('express');
const app = express();
const Joi = require('joi');

app.use(express.json());

const courses = [
    {id : 1, name : "course1"},
    {id : 2, name : "course2"},
    {id : 3, name : "course3"},
    {id : 4, name : "course4"},

];  

// Input Validation using JOI
function validateInput(input) {
    const schema = Joi.object({
        name : Joi.string().min(3).required()
    });
    return schema.validate(input);
    
}

// use a defined or environment port
const port = process.env.PORT || 3000 ;
app.listen(port);
console.log(`Listening to port ${port}`);

// api to fetch all courses
app.get('/api/courses', (req, res) => {
    res.send(courses);
});

// fetch a particular course
app.get('/api/courses/:id', (req, res) => {
    const result = courses.find(c => c.id ===parseInt(req.params.id));
    if(!result) return res.status(404).send("There was no record found for the ID"); 
    res.send(result);
});

// Create a new course using post
app.post('/api/courses', (req, res) => {
    const {error} = validateInput(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    
    const course = {id : courses.length + 1, name : req.body.name};
    courses.push(course);
    console.log("New course added successfully");
    res.send(courses);
});

// update a course using Put
app.put('/api/courses/:id', (req, res) => {
    const result = courses.find(c => c.id ===parseInt(req.params.id));
    if(!result) return res.status(404).send("There was no record found for the ID"); 
    res.send(result);
});