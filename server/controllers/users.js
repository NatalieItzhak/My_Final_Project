const User = require('../models/users.model');

const signIn = async (req, res) => {
    // Check if this user already exisits
    let user = await User.findOne({ email: req.body.email });
    if (user) {
        return res.status(400).send('That user already exisits!');
    } else {
        // Insert the new user if they do not exist yet
        user = new User({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        });
    try {
        await user.save();
        const token = await user.generateAuthToken(); 
        res.json({ "success": user, token: token });
        res.send(user);
    } catch (e) {
        res.json({ "error": e.message });
}}};


    const login = async (req, res) => {

        try {
            const user = await User.findByCredentials(
                req.body.email,
                req.body.password
            );
            const token = await user.generateAuthToken();
            res.json({ "success": user});
            res.send({ user, token });
        } catch (error) {
            res.status(400).json('Error:' + error);
        }
    };
    

    const logout = async (req, res) => {
        try {
            req.user.tokens = req.user.tokens.filter((token) => {
                return token.token !== req.token;
            })

            await req.user.save();
            res.send("Logout")
        } catch (e) {
            res.status(500).send("failed to logout");
        }
    }

    const deleteUser = async (req, res) => {
        try {
            await req.user.remove();
            res.send(req.user);
        } catch (e) {
            res.status(500).send();
        }
    }

    const updateUser = async (req, res) => {
        const updates = Object.keys(req.body);
        const allowedUpdates = ['Name', 'email', 'password'];
        const isValidOperation = updates.every((update) =>
            allowedUpdates.includes(update));

        if (!isValidOperation) {
            return res.status(400).send("Invalid update")
        }

        try {
            updates.forEach((update) =>
                req.user[update] = req.body[update]);
            await req.user.save();
            res.send(req.user);
        } catch (e) {
            res.status(400).send(e);
        }
    }

    module.exports = {
        signIn,
        login,
        updateUser,
        deleteUser,  
        logout,
    }
