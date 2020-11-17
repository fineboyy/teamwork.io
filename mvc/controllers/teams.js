const mongoose = require('mongoose');
const passport = require('passport');

const User = mongoose.model('User');
const Task = mongoose.model('Task');
const Team = mongoose.model('Team')



const createTeam = function ({ body, payload }, res) {

    User.findById(payload._id, (err, user) => {
        if (err) { return res.json(err) }

        if (!user) { return res.json({ message: "The User was not found. Are you sure you are logged in?" }) }

        const team = new Team()

        team.name = body.team_name
        team.creatorId = payload._id
        team.members.push(payload._id)

        let promise = new Promise(function (resolve, reject) {
            team.save((err, newTeam) => {
                if (err) { reject(err); return res.json(err) }

                user.teams.push(newTeam._id)

                user.save((err) => {
                    if (err) { reject(err); return res.json(err) }

                    resolve(newTeam)
                })
            })
        })

        promise.then((newTeam) => {
            return res.json(newTeam)
        })
    })
}


module.exports = {
    createTeam,
}