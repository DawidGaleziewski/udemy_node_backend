// User model for database
const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const userSchema = new mongoose.Schema({
   
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        lowersace: true,
        unique: true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('Email is invalid!')
            }
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 7,
        validate(value){
            if(value.toLowerCase().includes('password')){
                throw new Error('Please do not use keyword "password" in your password. You derp')
            }
        }
    },
    age: {
        type: Number,
        default: 0,
        validate(value){
            if(value < 0){
                throw new Error('Age must be a positive number')
            }
        }
    }
});

userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({email})
    if(!user){
        throw new Error('Unable to login');
    }

    const isMath = await bcrypt.compare(password, user.password);
    if(!isMath){
        throw new Error("Unable to login");
    }

    return user;
}

userSchema.pre('save', async function(next){
    const user = this;
    if(user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }

    next();
})

const User = mongoose.model('User', userSchema);

module.exports = User;