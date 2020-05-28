const express = require('express');
require('./db/mongoose');
const User = require('./models/user');
const Task = require('./models/task');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// USERS CRUD
// REFACTORINGG TO USE ASYNC/AWAIT
app.post('/users', async (req, res) => {
    const user = await new User(req.body);
    
    // We can use standard try catch for error handling
    try {
        await user.save();
        res.status(201).send(user);
    } catch(error){
        res.status(400).send(error)
    }

});

app.get('/users', async (req, res) => {
    
    try {
        const users = await User.find({});
        res.status(200).send(users)
    } catch(error){
        res.status(500).send(error)
    }
})

app.get('/users/:id', async (req, res) => {
    const _id = req.params.id;
    try {
        const user = await User.findById(_id);
        if(!user){
            return res.status(400).send(`No user found with id: ${_id}`)
        }

        res.status(200).send(user)
    } catch(error) {
        res.status(500).send(error)
    }

})

app.patch('/users/:id', async (req,res) => {
    const _id = req.params.id;

    // Testing for allowed values
    const updates = Object.keys(req.body);
    const allowedUpdates = ['name', 'email', 'password', 'age'];
    const isValidOperation = updates.every((update) => {
        return allowedUpdates.includes(update);
    })

    if(!isValidOperation){
        return res.status(400).send({"error":"Invalid operation!"})
    }

    try {
        // Update data for user weill be in the body
        // 3rd param is settings
        const user = await User.findByIdAndUpdate(_id, req.body, {
            new: true, //returns newly updated user
            runValidators: true // run existing validators
        });

        // Handle the scenario where user for update could not be found
        if(!user){
            return res.status(404).send()
        }

        res.status(200).send(user);

    } catch (error) {
        //  We can have server issues or validation issues here
        res.status(400).send(error)
    }
})

// TASKS CRUD
app.post('/tasks', async (req, res) => {
    const task = new Task(req.body);

    try {
        await task.save()
        res.status(201).send(task)
    } catch (error) {
        res.status(400).send(error)
    }
})

app.get('/tasks', async (req, res) => {
    try {
        const tasks = await Task.find({});
        res.status(200).send(tasks);
    } catch (error){
        res.status(500).send(error)
    }
})

app.get('/tasks/:id', async (req, res) => {
    const _id = req.params.id;

    try {
        const task = await Task.findById(_id);
        res.status(200).send(task)
    } catch (error) {
        res.status(500).send(error)
    }
})

app.patch('/tasks/:id', async(req, res) => {
    const _id = req.params.id;
    const updateKeys = Object.keys(req.body);
    const validUpdates = ["complete", "description"];
    const isUpdateValid = updateKeys.every(update =>{
        return validUpdates.includes(update)
    } );

    if(!isUpdateValid){
        return res.status(400).send({"error" : "One or more of updated files is invalid"})
    }

    try {
        const task = await Task.findByIdAndUpdate(_id, req.body, {
            new: true,
            runValidators: true
        });
        res.status(200).send(task)
    } catch (error) {
        res.status(500).send(error)
    }
})

app.listen(port, ()=> {
    console.log('Server is up on port ' + port);
});
