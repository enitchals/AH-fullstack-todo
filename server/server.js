const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const cors = require('cors');
const todosRouter = require('../server/Routes/todoRouter');
const User = require('./Models/UserModel');
const ToDo = require('./Models/ToDoModel')
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
    store: new MongoStore({
        url: 'mongodb://localhost/after-hours',
        ttl: 600
    })
};


//SET UP SERVER
const server = express();
server.use(express.json());
server.use(session(sessionOptions));
server.use('/api/todo', todosRouter);
server.use(cors({origin: 'http://localhost:3000', methods: ['GET', 'POST'], credentials: true}));


// MIDDLEWARE
function protected(req, res, next){
    console.log("PROTECTED MIDDLEWARE REQ.SESSION:\n", req.session);
    if (req.session && req.session.user){
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
    console.log("LOGIN REQUEST.SESSION\n", req.session);
    const { username, password } = req.body;
    User.findOne({username})
        .then(user => {
            if(user){
                user
                    .validatePassword(password)
                    .then(match => {
                        if (match){
                            req.session.user = user.username;
                            res.send('have a cookie!');
                            console.log("SHOULD HAVE REQ.SESSION.USER NOW \n", req.session);
                        } else {
                            res.status(401).send('invalid login');
                        }
                    })
                    .catch(err => {
                        res.send({error: err.message});
                    })
            }
        })
        .catch(err => {
            res.send({error: err.message});
        });
});

// GET DATA
server.get('/', protected, (req, res) => {
    console.log("REQ PASSED TO GET REQUEST:", req.session);
    res.status(200).json({message: `welcome back, ${req.session.user}`})
})

server.listen(port, () => {
    console.log(`server on port ${port}`);
})