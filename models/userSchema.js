const mongoose = require('mongoose');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    phone: {
        type: Number,
        required: true,
    },
    work: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now
    },
    messages: [
        {
            name: {
                type: String,
                required: true,
            },
            email: {
                type: String,
                required: true,
            },
            phone: {
                type: Number,
                required: true,
            },
            message: {
                type: String,
                required: true,
            },
        }
    ],
    tokens: [
        {
            token: {
                type: String,
                required: true,
            }
        }
    ]
})

userSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
})

userSchema.methods.generateAuthToken = async function () {
    try {
        let token = jwt.sign({ _id: this._id }, process.env.SECRET);
        this.tokens = this.tokens.concat({ token: token });
        await this.save();
        return token;
    } catch (error) {
        console.log(error);
    }
}

userSchema.methods.addMessage = async function (name, email, phone, message) {
    try {

        this.messages = this.messages.concat({ name, email, phone, message })
        await this.save();
        return this.messages;
    } catch (error) {
        console.log(error);
    }
}

module.exports = mongoose.model('USER', userSchema)