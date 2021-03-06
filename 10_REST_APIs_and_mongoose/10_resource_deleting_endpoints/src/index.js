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

    const updates = Object.keys(req.body);
    const allowedUpdates = ['name', 'email', 'password', 'age'];
    const isValidOperation = updates.every((update) => {
        return allowedUpdates.includes(update);
    })

    if(!isValidOperation){
        return res.status(400).send({"error":"Invalid operation!"})
    }

    try {
        const user = await User.findByIdAndUpdate(_id, req.body, {
            new: true, 
            runValidators: true 
        });

        if(!user){
            return res.status(404).send()
        }

        res.status(200).send(user);

    } catch (error) {
        res.status(400).send(error)
    }
})

// DELETION
app.delete("/users/:id", async (req,res)=> {
    const _id = req.params.id;
    try {
        const user = await User.findByIdAndDelete(_id);
        if(!user){
            return res.status(404).send({"error" : "no user with this id found"});
        }

        res.status(200).send(user)

    } catch (error){
        res.status(500).send()
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

app.delete('/tasks/:id', async(req, res) => {
    const _id = req.params.id;

    try {
        const task = await Task.findByIdAndDelete(_id);
        if(!task){
            return res.status(400).send({"error": "no task with this id found"});
        }

        res.status(200).send(task);
    } catch(error){
        res.status(500).send(error);
    }
})

app.listen(port, ()=> {
    console.log('Server is up on port ' + port);
});
