const express = require('express');
const router = express.Router();
const userController = require('../controllers/auth');

router
    .post('/signin', (req, res) => {
        userController.signIn(req, res);
    }).post('/login', async (req, res) => {
        userController.login(req, res);
    })

module.exports = router;