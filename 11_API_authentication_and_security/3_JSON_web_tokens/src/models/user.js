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
        // We want the email to be unique. Otherwise we would have conflicts
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
    // We want to keep track of the generated tokens so that user can log out and destroy them
    // Tokens is a array...
    tokens:[{
        // ... that stores objects, that have a single key with value that is of type string
        token: {
            type: String,
            required: true
        }
        // ! this is called a subdocument. And just like a document it will get its own ID!
    }]
});

// as we want to access this method on a instance of the user. We add it on methods;
// as we need to access this, we use normal functions
userSchema.methods.generateAuthToken = async function (){
    const user = this;
    // id is a object, so we want to conver it to a string
    const token = jwt.sign({ _id: user._id.toString() }, 'seeYouAroundSpaceCowboy');

    // We want to save the tokens to the database on the user to keep track of them
    user.tokens = user.tokens.concat({token});
    await user.save();

    return token;
};

// statics are accessible on the model, ie User.methodName()
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