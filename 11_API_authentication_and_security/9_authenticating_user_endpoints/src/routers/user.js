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

// We no longer need to fetch users by id. We do not want anybody to fetch other users by their id
// router.get('/users/:id', async (req, res) => {
//     const _id = req.params.id;

//     try {
//         const user = await User.findById(_id);
//         if(!user){
//             return res.status(400).send(`No user found with id: ${_id}`)
//         }

//         res.status(200).send(user)
//     } catch(error) {
//         res.status(500).send(error)
//     }

// })

// We want to only allow updating current user and not user by id
router.patch('/users/me', auth,  async (req,res) => {
    // const _id = req.params.id;

    const updates = Object.keys(req.body);
    const allowedUpdates = ['name', 'email', 'password', 'age'];
    const isValidOperation = updates.every((update) => {
        return allowedUpdates.includes(update);
    })

    if(!isValidOperation){
        return res.status(400).send({"error":"Invalid operation!"})
    }

    try {
        updates.forEach((update) => req.user[update] = req.body[update]); 
        await req.user.save();
        res.status(200).send(req.user);

    } catch (error) {
        res.status(400).send(error)
    }
})

// We want to authenticate deleting account and we can do it simply by using auth middleware
// We also no longer want to delete user by his id. User should be only able to delete himself by his id
router.delete("/users/me", auth, async (req,res)=> {
    // const _id = req.params.id;
    // we have the access to user current if that is added to request in auth middleware with the whole user object
    // const _id= req.user._id
    try {
        // We do not need to do another db query as we have the user already from the middleware on req param
        // const user = await User.findByIdAndDelete(_id);

        // We dont need to check for user and error control as we just dis it in the auth middleware
        // if(!user){
        //     return res.status(404).send({"error" : "no user with this id found"});
        // }

        // We can delete the user accessing him on the request param.
        await req.user.remove();

        res.status(200).send(req.user)

    } catch (error){
        res.status(500).send()
    }
})

module.exports = router;