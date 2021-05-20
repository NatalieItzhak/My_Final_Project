const User = require('../models/users.model');
const jwt = require('jsonwebtoken');
JWT_SECRET = 'NATALIE123456789';
const Hotel = require('../models/hotel.model');
const fs = require('fs');
const { response } = require('express');
const { exec } = require('child_process');


const signIn = async (req, res) => {
    console.log(req.body)
    let user = await User.findOne({ email: req.body.email });
    if (user) {
        return res.status(400).send('That user already exists!');
    } else {
        user = new User({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        });
        try {
            await user.save();
            const token = await user.generateAuthToken();
            res.json({ "success": user, token: token });
            console.log('user created!', user);
            return res.json({ success: true });

        } catch (e) {
            console.log('create user faild', e)
            return res.status(400).send({ "error": e.message });

        }
    }
};

const login = async (req, res) => {
    const { email, password } = req.body
    try {
        const user = await User.findOne({ email: req.body.email });
        console.log('User exist!!', user);
        if (!user) res.status(400).send('User not found')
        user.comparePassword(password, (err, match) => {
            console.log('compare password in login error', err);
            if (!match || err) return res.status(400).send("Wrong password")
            const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
                expiresIn: "1w"
            });
            res.json({ token, user });
        })
    } catch (err) {
        console.log("login error", err)
        res.status(400).send('login failed', err);
    }
};
const create = async (req, response) => {
    // hotel.seller = req.user._id;
    try {
        let files = req.files;
        let fields = req.fields;
        const hotel = new Hotel(fields);
        if (files.image) {
            hotel.image.data = fs.readFileSync(files.image.path);
            hotel.image.contentType = files.image.type;
        }
        hotel.save((err, result) => {
            if (err) {
                console.log('Save err', err)
                response.status(400).send('Error saving')
            }
            response.json(result)
        })
    } catch (err) {
        console.log(err);
        res.status(400).json({
            err: err.message
        });
    }
};
const hotels = async (req, response) => {
    const all = await Hotel.find({})
        .limit(10)
        .select("-image.data")
        .exec();
    console.log(all)
    response.json(all)
}

const image = async (req, response) => {
    const hotel = await Hotel.findById(req.params.hotelId).exec();
    if (hotel && hotel.image && hotel.image.data !== null) {
        response.set('Content-Type', hotel.image.contentType)
        return response.send(hotel.image.data);
    }
};

// const sellerHotels = async (req, response) => {
//     const all = await Hotel.find({ seller: req.user._id })
//         .select('-image.data')
//         .populate('seller', '_id name')
//         .exec();
//     console.log(all)
//     response.send(all)
// }

module.exports = {
    signIn,
    login,
    create,
    hotels,
    image,
    // sellerHotels
}
