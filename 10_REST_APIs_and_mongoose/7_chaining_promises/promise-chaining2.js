const mongoose = require('mongoose');
const express = require('express');

const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', {
    useNewUrlParser: true,
    useCreateIndex: true
})

const Task = require('./src/models/task');


app.post('/chain/tasks/:id', (req, res) => {
    const taskID = req.params.id;

    Task.deleteOne({_id: taskID}).then((task)=> {
        if(!task){
            res.status(400);
            return res.send(task);
        }

        return Task.countDocuments({complete: false})
    }).then(numberOfTasks => {
        res.status(200);
        res.send('Prending tasks: ' + numberOfTasks);
    }).catch(error => {
        res.status(500)
        res.send(error)
    })

    
})


app.listen('3000', ()=> {
    console.log('Running on port 3000')
})