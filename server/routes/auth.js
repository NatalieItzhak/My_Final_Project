const express = require('express');
const router = express.Router();
const userController = require('../controllers/auth');

const ExpressFormidable = require('express-formidable');


router
    .post('/signin', (req, res) => {
        userController.signIn(req, res);
    }).post('/login', (req, res) => {
        userController.login(req, res)
    }).post('/hotel',ExpressFormidable(), (req, res) => {
        userController.create(req, res);
    }).get('/viewhotels', (req, res)=>{
        userController.hotels(req, res);
    }).get('/hotel/img/:hotelId', (req, res) =>{
        userController.image(req, res);
    })
module.exports = router;