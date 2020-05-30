// User model for database
const mongoose = require('mongoose');
const validator = require('validator');

// Encryption library
const bcrypt = require('bcryptjs');

 // Object passed to model is converted to schema
    // In order to use middleware hooks we want to access the creation of schema
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

//  we describe that we want to do something before the event.
// we pass arguments, event we are watching for and function on what will happen
userSchema.pre('save', async function(next){
    // We want to use normal function as we will use this keyword
    // this is equal to the document we are saving
    const user = this;
    // we call next when we are done in the function. Without next it will run forever

    // We need to update our routes to use mongoose Model.save() method and not the findByIdAndUpdate(). As that old method is ignoring mongoose shema and doing operation directly on db

    // We want to hash the password only if it changed
    // We use the mongoose Model.isModified method to establish this
    if(user.isModified('password')) {
        //  hasing of the password will only happen if password ia changed. We pass the current plain text password and number of rounds of hasing to bcrypt
        user.password = await bcrypt.hash(user.password, 8)
    }

    next();
})

const User = mongoose.model('User', userSchema);

module.exports = User;