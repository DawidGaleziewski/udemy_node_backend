const mongoose = require('mongoose');
const User  = require('./src/models/user');
const Task = require("./src/models/task");

mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', {useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true });


const updateAgeAndCount = async (id, age) => {
    // It is easy as that to chain promisses with async/await
     const user = await User.findByIdAndUpdate(id, {age: age});
     const userCount = await User.countDocuments({age});
    return {user, userCount}
}

updateAgeAndCount('5ec9570be3cca124dcf68ce2', 21).then(data => {
    console.log(data)
}).catch(error => {
    console.log(error)
});

const deleteTaskAndCount = async (id)=> {
   const deletedTask = await Task.findByIdAndDelete(id);
    const remainingIncompleteTasks = await Task.countDocuments({complete: false});

    console.log(deletedTask)
    return deletedTask;
}

deleteTaskAndCount('5ecd671c8dc82328f06a8221').then(data=> {
    console.log(data);
}).catch(error => {
    console.log(error)
})