const jwt = require('jsonwebtoken');

const token = req.header('x-auth-token');

if(!token) return res.status(401).send('No token Provided');
