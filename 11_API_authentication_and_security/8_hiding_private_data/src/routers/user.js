const express = require('express');
const router = new express.Router();
const User = require('../models/user');
const auth = require('../middleware/auth');



router.post('/users', async (req, res) => {
    const user = await new User(req.body);

    try {
        await user.save();
        const token = await user.generateAuthToken();
        res.status(201).send({user, token});
    } catch(error){
        res.status(400).send(error)
    }
});

router.post('/users/login', async(req,res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password);
        const token = await user.generateAuthToken();
        // We want to create a method that will return only data we want to expose. We want to hide list of tokens and the password!
        res.send({user, token});

    } catch (error){
        res.status(400).send();
    }
})

router.post('/users/logout', auth, async(req,res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token)=> {
            return token.token !== req.token;
        })

        await req.user.save();

        res.send();
    } catch (error) {
        res.status(500).send();
    }
})

router.post('/users/logout/all', auth, async(req,res) => {
    try {
        req.user.tokens = [];
        await req.user.save();
        res.send();

    } catch(error){
        res.status(500).send();
    }
})

router.get('/users/me', auth, async (req, res) => {
    res.send(req.user);
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
        const user  = await User.findById(req.params.id);
        updates.forEach((update) => user[update] = req.body[update]); 
        await user.save();

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