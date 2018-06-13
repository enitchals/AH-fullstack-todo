const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const cors = require('cors');

const User = require('./UserModel');
const port = 8000;

mongoose.connect('mongodb://localhost/after-hours').then(() => {
    console.log(`Connected to Mongo\n`);
});

const sessionOptions = {
    secret: 'CS10 is awesome',
    cookie: {
        maxAge: 1000*60*120
    },
    httpOnly: true,
    secure: false,
    resave: true,
    saveUninitialized: false,
    name: 'cs10 demo',
};

//SET UP SERVER
const server = express();
server.use(express.json());
server.use(cors({origin: 'http://localhost:3000', credentials: true}));
server.use(session(sessionOptions));

// MIDDLEWARE
function protected(req, res, next){
    if (req.session && req.session.username){
        next();
    } else {
        res.status(401).json({message: 'nope!'});
    }
}

// REGISTER NEW USER
server.post('/register', (req, res) => {
    const {username, password} = req.body;
    User.create({username, password})
        .then(user => {
            res.status(201).json(user);
        })
        .catch(err => {
            res.status(500).json({error: err.message});
        })
})

// LOG IN
server.post('/login', (req, res) => {
    const { username, password } = req.body;
    User.findOne({username})
        .then(user => {
            if(user){
                user
                    .validatePassword(password)
                    .then(match => {
                        if (match){
                            req.session.username = user.username;
                            res.session.username = user.username;
                            res.send('have a cookie!');
                        } else {
                            res.status(401).send('invalid login');
                        }
                    })
                    .catch(err => {
                        res.send('error checking credentials');
                    })
            }
        })
        .catch(err => {
            res.send({error: err.message});
        });
});

// GET DATA
server.get('/', protected, (req, res) => {
    res.status(200).json({message: `welcome back, ${req.session.username}`})
})

server.listen(port, () => {
    console.log(`server on port ${port}`);
})