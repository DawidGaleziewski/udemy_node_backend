require('./src/db/mongoose');
const User = require('./src/models/user');

// 5ec9570be3cca124dcf68ce2

User.findByIdAndUpdate("5ec9570be3cca124dcf68ce2", { age:1 }).then(user => {
    console.log(user);
    return User.countDocuments({age : 0})
}).then((result)=> {
    console.log(result)
}).catch(e => {
    console.log(e)
})