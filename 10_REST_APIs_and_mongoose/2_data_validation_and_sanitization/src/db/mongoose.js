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
        required: true
    },
    email: {
        type: String,
        required: true,
        validate(value){
            // using validator library
            if(!validator.isEmail(value)){
                throw new Error('Email is invalid!')
            }
        }
    },
    age: {
        type: Number,
        // Mongoose gives us only few validators but lets us set up our own custome validators
        // It is best to use existing, well tested validators like npm validator
        validate(value){
            if(value < 0){
                throw new Error('Age must be a positive number')
            }
        }
    }
});

const Task = mongoose.model('Task', {
    description: {
        type: String
    },
    complete: {
        type: Boolean
    }
})

const me = new User({
    name: 'George',
    email: 'george@gmail.com',
    age: 27
});

me.save().then((response)=>{
    console.log(response);
}).catch((error)=> {
    console.log(error);
})

// const task = new Task({
//     description: 'clean the flat',
//     complete: false
// });

// task.save().then(response=> {
//     console.log(response);
// }).catch(error=> {
//     console.log(error)
// })