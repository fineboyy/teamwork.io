const express = require('express');
const router = express.Router();


const usersCtrl = require('../controllers/users')
const middleware = require('./middleware/middleware')

//Logging in and Registering
router.post('/register', usersCtrl.registerUser)
router.post('/login', usersCtrl.loginUser)

//GET REQUESTS
router.get('/get-user-data/:id', middleware.authorize, usersCtrl.getUserData)

//POST REQUEST
router.post('/create-task', middleware.authorize, usersCtrl.createTask)
router.post('/resolve-task/:id', middleware.authorize, usersCtrl.resolveTask)


module.exports = router;
