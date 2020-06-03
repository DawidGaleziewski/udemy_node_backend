// User model for database
const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

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
    },

    tokens:[{
        token: {
            type: String,
            required: true
        }
    }]
});

// as we work on instance of a object we want to put the method on Model.methods object
// we can give the method custome method or we can use toJSON which will fire AUTMOATICALLY on the model
userSchema.methods.toJSON = function(){
    const user = this;
    
    //  raw object, removing things like mongoose .save() method
    const userObject = user.toObject();
    console.log(userObject)
    // we remove values we do not want
    delete userObject.password;
    delete userObject.tokens;

    // return modified object that is safe
    return userObject
}

userSchema.methods.generateAuthToken = async function (){
    const user = this;
    const token = jwt.sign({ _id: user._id.toString() }, 'seeYouAroundSpaceCowboy');

    user.tokens = user.tokens.concat({token});
    await user.save();

    return token;
};

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