const mongoose = require('mongoose');
// We could eaither make each user store ids of tasks. Or we can store id of a user that created the task, inside the task
const Task = mongoose.model('Task', {
    description: {
        type: String,
        trim: true,
        required: true,
    },
    complete: {
        type: Boolean,
        default: false
    },
    owner: {
        //  we want to set the type to or mongoose objectid
        type: mongoose.Schema.Types.ObjectId,
        // we want all tasks to have a owner
        required: true,
        // ref will allow us to use helper methods in relations to User model
        // Name has to be the same as in const User = mongoose.model('User', userSchema); in user model
        ref: 'User'
    }
})

module.exports = Task;