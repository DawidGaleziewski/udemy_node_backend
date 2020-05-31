const jwt = require('jsonwebtoken');
const User = require('../models/user');

const auth = async (req, res, next) => {
    // in postman to test this we need to go to headers and in keys setup key: Authorization, value: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZWQyYjVmZmYzZTAyYjFkNDQzYzYyMTciLCJpYXQiOjE1OTA5MjQzOTB9.4k6SYmVtb0hESW5-8tDCa_Ugb_koLZvWmaofQTVAdpk
    try {
        // The value we want is in header keys
        // We have a method on req to get the specific header
        // We are removing bearer. This has a added advantage, if there is no such keyword in the token, replace will throw a error going to catch
        const token = req.header('Authorization').replace('Bearer ', '');
        // as we have embeeded the user _id in the token we can use it to find the user in the db
        const decoded = jwt.verify(token, 'seeYouAroundSpaceCowboy');

        // we search for a user that not only matches the id in the token. But also has this token stored in the database
        const user = await User.findOne({_id: decoded._id, 'tokens.token': token})
        console.log(decoded, user);

        // it is a problem if we cannot find such user therefore we want to throw a error
        if(!user) {
            throw new Error();
        }

        // if nothing has failed above we can assume user authentication worked and we can go to the route handler
        //  in adition, we do not want to query the db for user second time in the route. so we can store the user on the request and pass it to the route handler
        req.user = user;
        next();
    } catch(error){
        res.status(401).send({error: 'Please authenticate'});
    }
    
}

module.exports = auth;