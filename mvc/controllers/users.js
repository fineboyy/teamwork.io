const mongoose = require('mongoose');
const passport = require('passport');

const User = mongoose.model('User');
const Task = mongoose.model('Task');




//Logging In and Registering
//==========================================================================
const registerUser = function ({body}, res ) {
    if (!Object.values(body).every((val) => val)) {
        return res.send('All fields are required')
    }
    if (body.password !== body.password_confirm) {
        return res.send({ msessage: "Passwords don't match." })
    }

    const user = new User();

    user.firstname = body.first_name.trim()
    user.lastname = body.last_name.trim()
    user.name = body.first_name.trim() + " " + body.last_name.trim()
    user.email = body.email
    user.setPassword(body.password)

    user.save((err, newUser) => {
        if (err) {
            if (err.errmsg && err.errmsg.includes("duplicate key error") && err.errmsg.includes("email")) {
                return res.json({ message: "The provided email is already registered" })
            }
            return res.json({ message: "Something went wrong." })
        } else {
            const token = user.getJwt();
            res.status(201).json({ token })
        }
    })

}

const loginUser = function(req, res) {
    let body = req.body
    if(!body.email || !body.password) {
        return res.status(400).json({message:  "All fields are required"})
    }

    passport.authenticate("local", (err, user, info) => {
        if(!user) { return res.json({message: 'Please check your login credentials again. Either the email or password is incorrect'}) }
        if(err) {return res.status(404).json(err)}
        if(user) {
            const token = user.getJwt();
            res.status(201).json({token})
        } else {
            res.status(401).json(info)
        }
    })(req, res);
}


//==========================================================================
const getUserData = function({params}, res) {
    console.log(params.id)
    User.findById(params.id, "-salt -password", {lean: true}, (err, user) => {
        if(err) { return res.json(err) }
        if(!user) {return res.json({message: 'The user you\'re looking for does not exist'})}

        return res.json(user)
    })
}




const createTask = function({body, payload}, res) {
    const task = new Task()

    task.creatorName = body.creatorName
    task.creatorId = body.creatorId
    task.title = body.title
    task.assignedTo = body.assignedTo
    task.date = body.date
    task.content = body.content
    task.isCompleted = false

    let userId = payload._id

    User.findById(userId, (err, user) => { 
        if(err) { return res.json({err}) }
        user.tasks.push(task)

        user.save((err) => {
            if(err) { return res.json({err})}
            return res.json({message: 'Task Created', task: task})
        })
    })
}

const resolveTask = function({payload, params}, res) {
    
    User.findOne({'_id': payload._id}).then(user => {
        let resolved_task = user.tasks.id(params.id)
        resolved_task['isCompleted'] = 'isCompleted'
        resolved_task['isCompleted'] = !resolved_task['isCompleted']
        user.save()

        return res.json(resolved_task)
    }).catch(err => {
        return res.json(err)
    })
}

module.exports = {
    registerUser,
    loginUser,
    getUserData,
    createTask,
    resolveTask,
}