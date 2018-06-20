const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    todos: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "ToDo"
    }]
});

userSchema.pre('save', function(next){
    bcrypt.hash(this.password, 12, (err, hash) => {
        if(err) return next(err);
        this.password = hash;
        next();
    })
})

userSchema.methods.validatePassword = function(guess){
    return bcrypt.compare(guess, this.password);
}

module.exports = mongoose.model('User', userSchema);