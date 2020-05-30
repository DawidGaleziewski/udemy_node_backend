const express = require('express');
const router = new express.Router();
const User = require('../models/user');



router.post('/users', async (req, res) => {
    const user = await new User(req.body);

    try {
        await user.save(); // We need to use save() method for mongoose to triger its middleware
        res.status(201).send(user);
    } catch(error){
        res.status(400).send(error)
    }
});

router.get('/users', async (req, res) => {
    
    try {
        const users = await User.find({});
        res.status(200).send(users)
    } catch(error){
        res.status(500).send(error)
    }
})

router.get('/users/:id', async (req, res) => {
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

router.patch('/users/:id', async (req,res) => {
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
        
        // Find by id and update passes mongoose. Performing operation directly on db
    
            // const user = await User.findByIdAndUpdate(_id, req.body, {
            //     new: true, 
            //     runValidators: true 
            // });
        // We want to do this in more mongoose way:
        const user  = await User.findById(req.params.id);
        updates.forEach((update) => user[update] = req.body[update]); // We are updating each value individually here

        // Here is where our middleware is executed
        await user.save();

        // NOW MIDDLEWARE IS RUNNING

        if(!user){
            return res.status(404).send()
        }

        res.status(200).send(user);

    } catch (error) {
        res.status(400).send(error)
    }
})

router.delete("/users/:id", async (req,res)=> {
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

module.exports = router;