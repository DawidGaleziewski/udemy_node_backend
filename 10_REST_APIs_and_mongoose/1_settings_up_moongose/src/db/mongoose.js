const mongoose = require('mongoose');

// mongoose uses mongo db behind the scenes, so all info regarding mongo is relevant here
// just like with mongo first arg is the url of the db, second is options.
// unlike mongo we specify the name of database here
mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', {
    useNewUrlParser: true,
    useCreateIndex: true // ensures indexes are created on new docs for quicker use
});

// first arg is name of the model, second is the definition
const User = mongoose.model('User', {
    // here we setup each value properties like datatype
    name: {
        // we use constructor functions from javascript as a type
        type: String
    },
    age: {
        type: Number
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

// Once defined we can use the instances of the model
const me = new User({
    name: 'Nabuhodonozor',
    // age: 'sadasd' // if we use wrong value like string we get returned a error
    age: 27
});

// we do operations by methods on the object
// save that updates the db returns promise just like native mongo
me.save().then((response)=>{
    // response here is me variable.
    // mongoose  will add new property __v which is the version of the docs
    console.log(response);
}).catch((error)=> {
    console.log(error);
})

// TASK
const task = new Task({
    description: 'clean the flat',
    complete: false
});

task.save().then(response=> {
    console.log(response);
}).catch(error=> {
    console.log(error)
})