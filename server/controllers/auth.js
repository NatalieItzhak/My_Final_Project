const User = require('../models/users.model');
const jwt= require('jsonwebtoken');
JWT_SECRET='NATALIE123456789';

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
            console.log('user created!', user);
            return res.json({ success: true });
            // const token = await user.generateAuthToken(); 
            // res.json({ "success": user, token: token });

        } catch (e) {
            console.log('create user faild', e)
            return res.status(400).send({ "error": e.message });

        }
    }
};

const login = async (req, res) => {
    // console.log(req.body)
    const { email, password } = req.body
    try {
        const user = await User.findOne({ email: req.body.email  });
        console.log('User exist!!', user);
        if (!user) res.status(400).send('User not found')
        user.comparePassword(password, (err, match) => {
            console.log('compare password in login error', err);
            if (!match || err) return res.status(400).send("Wrong password")
           const token= jwt.sign({_id: user._id}, JWT_SECRET, {
                expiresIn: "1w"
            });
         res.json({token, user});
        })
    } catch (err) {
        console.log("login error", err)
        res.status(400).send('login failed', err);
    }
}

module.exports = {
    signIn,
    login,
    
}
