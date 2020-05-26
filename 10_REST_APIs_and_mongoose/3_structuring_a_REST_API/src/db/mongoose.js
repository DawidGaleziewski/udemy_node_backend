const mongoose = require('mongoose');
const validator = require('validator');


mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', {
    useNewUrlParser: true,
    useCreateIndex: true
});

const User = mongoose.model('User', {
    name: {
        type: String,
        // validating user name to be required
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        lowersace: true,
        validate(value){
            // using validator library
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

const Task = mongoose.model('Task', {
    description: {
        type: String,
        trim: true,
        required: true,
    },
    complete: {
        type: Boolean,
        default: false
    }
})

const me = new User({
    name: '  Tadek  ',
    email: 'RTASge@gmail.com',
    password: '$secret123!!!'
});

me.save().then((response)=>{
    console.log(response);
}).catch((error)=> {
    console.log(error);
})

const task = new Task({
    description: '        play divinity         ',
});

task.save().then(response=> {
    console.log(response);
}).catch(error=> {
    console.log(error)
})