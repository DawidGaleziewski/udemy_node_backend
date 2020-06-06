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

// VIRTUAL PROPERTY - this is relationship. It is not something that lives in the db!
// We use virtual method for this.
// First param is the name on which we will store the data. Second is the settings of the data
userSchema.virtual('tasks', {
    ref: 'Task',
    // id is the field on User that is related to other data
    localField: '_id',
    // foreignField is the name of the other thing, task, that will create the relationship
    foreignField: 'owner'
})

userSchema.methods.toJSON = function(){
    const user = this;
    const userObject = user.toObject();
    console.log(userObject)
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