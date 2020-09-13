const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const crypto = require('crypto');

const taskSchema = new mongoose.Schema({
    creatorName: String,
    creatorId: String,
    assignedTo: String,
    title: String,
    content: String,
    date: String,
    isCompleted: Boolean,

})

const userSchema = new mongoose.Schema({
    firstname: String,
    lastname: String,
    name: {
        type: String,
        required: true
    },
    salt: String,
    password: String,
    email: String,
    tasks: [taskSchema]
})

userSchema.methods.setPassword = function(password){
    this.salt = crypto.randomBytes(64).toString('hex');
    this.password = crypto.pbkdf2Sync(password, this.salt, 1000, 64, "sha512").toString('hex');
}

userSchema.methods.validatePassword = function (password){
    const hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, "sha512").toString('hex');
    return hash === this.password;
}

userSchema.methods.getJwt = function () {
    return jwt.sign({
        _id: this._id,
        email: this.email,
        name: this.name
    }, process.env.JWT_SECRET);
}

mongoose.model('User', userSchema)
mongoose.model('Task', taskSchema)