const express = require('express');
const auth = require('../middleware/auth');
const router = express.Router();
const userController = require('../controllers/users');

router
    .post('/signup', (req, res) => {
        userController.signIn(req, res);
    }).post('/login', async (req, res) => {
        userController.login(req, res);
    }).delete('/user', auth, (req, res) => {
        userController.deleteUser(req, res);
    }).get('/user', auth, (req, res) => {
        res.send(req.user);
    }).post('/logout', auth, (req, res) => {
        userController.logout(req, res);
    }).put('/user', auth, (req, res) => { 
        userController.updateUser(req, res);
    })

module.exports = router;