const express = require('express');
const router = new express.Router();
const Task = require('../models/task');

// TASKS CRUD
router.post('/tasks', async (req, res) => {
    const task = new Task(req.body);

    try {
        await task.save()
        res.status(201).send(task)
    } catch (error) {
        res.status(400).send(error)
    }
})

router.get('/tasks', async (req, res) => {
    try {
        const tasks = await Task.find({});
        res.status(200).send(tasks);
    } catch (error){
        res.status(500).send(error)
    }
})

router.get('/tasks/:id', async (req, res) => {
    const _id = req.params.id;

    try {
        const task = await Task.findById(_id);
        res.status(200).send(task)
    } catch (error) {
        res.status(500).send(error)
    }
})

router.patch('/tasks/:id', async(req, res) => {
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
        const task = await Task.findById(_id);
        updateKeys.forEach(updateKey => {
            task[updateKey] = req.body[updateKey];
        })
        

        await task.save();
        // const task = await Task.findByIdAndUpdate(_id, req.body, {
        //     new: true,
        //     runValidators: true
        // });

        if(!task) {
            res.status(404).send({"error": "no user with this id found"})
        }
        res.status(200).send(task)
    } catch (error) {
        res.status(500).send(error)
    }
})

router.delete('/tasks/:id', async(req, res) => {
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


module.exports = router;