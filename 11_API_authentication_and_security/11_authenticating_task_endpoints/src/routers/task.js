const express = require('express');
const router = new express.Router();
const Task = require('../models/task');
const auth = require('../middleware/auth')

// TASKS CRUD
router.post('/tasks', auth, async (req, res) => {
    const task = new Task({
        ...req.body,
        owner: req.user._id
    })

    try {
        await task.save()
        res.status(201).send(task)
    } catch (error) {
        res.status(400).send(error)
    }
})

router.get('/tasks', auth, async (req, res) => {
    try {
        const tasks = await Task.find({owner: req.user._id});
        res.status(200).send(tasks);
    } catch (error){
        res.status(500).send(error)
    }
})

router.get('/tasks/:id', auth, async (req, res) => {
    const _id = req.params.id;

    try {
        // We want to find task by two fields, its id and user id to make sure users cant see tasks that not their
        // const task = await Task.findById(_id);

        // We can only find the task now if it has relation to the user that created it
        const task = await Task.findOne({_id, owner: req.user._id});

        if(!task){
            return res.status(404).send();
        }
        
        console.log(task)
        res.status(200).send(task)
    } catch (error) {
        res.status(500).send(error)
    }
})

router.patch('/tasks/:id',auth, async(req, res) => {
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
        const task = await Task.findOne({_id, owner: req.user._id});
        if(!task) {
            res.status(404).send({"error": "no user with this id found"})
        }
        updateKeys.forEach(updateKey => {
            task[updateKey] = req.body[updateKey];
        })
        await task.save();
        res.status(200).send(task)
    } catch (error) {
        res.status(500).send(error)
    }
})

router.delete('/tasks/:id', auth, async(req, res) => {
    const _id = req.params.id;

    try {
        // const task = await Task.findByIdAndDelete(_id);
        // const task = await Task.findOne({_id, owner: req.user._id })
        const task = await Task.findOneAndDelete({_id, owner: req.user._id})
        if(!task){
            return res.status(400).send({"error": "no task with this id found"});
        }

        // task.remove();

        res.status(200).send(task);
    } catch(error){
        res.status(500).send(error);
    }
})


module.exports = router;