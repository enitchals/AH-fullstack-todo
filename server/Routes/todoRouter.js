const express = require('express');
const router = express.Router();
const ToDo = require('../Models/ToDoModel');
const User = require('../Models/UserModel');


//MIDDLEWARE TO ENSURE LOGIN
function protected(req, res, next){
    console.log("PROTECTED MIDDLEWARE REQ.SESSION:\n", req.session);
    if (req.session && req.session.user){
        next();
    } else {
        res.status(401).json({message: 'nope!'});
    }
}

router.use(protected);

router.get('/all', (req, res) => {
    const username = req.session.user;
    User.findOne({username})
        .populate('todos')
        .then(user => {
            res.status(200).json({todos: user.todos})
        })
        .catch(err => console.log(err));
})

router.post('/new', (req, res) => {
    const {title, body} = req.body;
    const username = req.session.user;
    const newToDo = new ToDo({title, body});
    newToDo
        .save()
        .then(todo => {
            res.status(201).json(todo);
            User.findOne({username})
                .then(user => {
                    user.todos.push(todo._id);
                    user.save();
                })
                .catch(err => console.log(err));
        })
        .catch(err => console.log(err));
})

module.exports = router;