const express = require('express')
const cookieParser = require('cookie-Parser')
const router = express.Router();
const bcrypt = require('bcryptjs')
require('../DB/conn')
const User = require('../models/userSchema');
const authenticate = require('../middleware/authenticate');

router.use(cookieParser());

router.post('/register', async (req, res) => {

    const { name, email, phone, work, password } = req.body;

    if (!name || !email || !phone || !work || !password) {
        return res.status(422).json({ error: "Fill all the informations" })
    }

    try {

        const userExist = await User.findOne({ email })

        if (userExist) {
            return res.status(422).json({ error: "Email already exists" })
        } else {
            const user = new User({ name, email, phone, work, password })
            await user.save();
            res.status(201).json({ message: "user registered successfully" })
        }

    } catch (err) {
        res.json({ error: "internal server error occured" })
    }
})

router.post('/login', async (req, res) => {

    try {

        let token;

        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(422).json({ error: "Fill all the informations" })
        }

        const findUser = await User.findOne({ email })

        if (!findUser) {

            res.status(422).json({ message: "user not found" })

        } else {

            const isMatch = await bcrypt.compare(password, findUser.password)

            token = await findUser.generateAuthToken();

            res.cookie("jwtToken", token, {
                expires: new Date(Date.now() + 258920000),
                httpOnly: true,
            })

            if (!isMatch) {
                res.status(422).json({ message: "user not found" })
            } else {
                res.status(201).json({ message: "user login successfully" })
            }

        }

    } catch (err) {
        res.json({ error: "internal server error occured" })
    }
})

router.get('/about', authenticate, (req, res) => {
    res.send(req.rootUser)
})

router.get('/getData', authenticate, (req, res) => {
    res.send(req.rootUser)
})

router.post('/contact', authenticate, async (req, res) => {
    try {

        const { name, email, phone, message } = req.body;

        if (!name || !email || !phone || !message) {
            return res.json("fill all the informations")
        }

        const userContact = await User.findOne({ _id: req.userID });

        if (userContact) {
            const userMessage = await userContact.addMessage(name, email, phone, message);
            await userContact.save()
            res.json({ "message": "user contacted successfully" })
        }

    } catch (error) {
        console.log(error);
    }
})

router.get('/logout', (req, res) => {
    res.clearCookie('jwtToken', { path: "/" })
    res.status(200).send('user logout')
})

module.exports = router;