const express = require('express');
const router = new express.Router();
const User = require('../models/user');
//  Importing auth middleware
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
        res.send({user, token});

    } catch (error){
        res.status(400).send();
    }
})

// We simply pass the middleware to the route handler as a argument
// we do not want to show this endpoint to everybody as giving them info on other user would be bad. But we want to use it for other purposes
router.get('/users/me', auth, async (req, res) => {
    // try {
    //     const users = await User.find({});
    //     res.status(200).send(users)
    // } catch(error){
    //     res.status(500).send(error)
    // }
    // we know the user will be authenticated when it comes to this point. And as we save the data on auth we can simply pass it back here
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