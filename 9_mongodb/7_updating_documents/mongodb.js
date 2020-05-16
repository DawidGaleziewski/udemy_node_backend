// CRUD operations
const mongoDB = require("mongodb");

const { MongoClient, ObjectID } = require("mongodb");

const connectionURL = "mongodb://127.0.0.1:27017";
const databaseName = "task-manager";

MongoClient.connect(
  connectionURL,
  { useNewUrlParser: true },
  (error, client) => {
    if (error) {
      return console.log("Unable to connect to database");
    }

    const db = client.db(databaseName);
    // Updating one by document - we use promisses but we can also do this with callbacks
    //  with callbacks we would provide the 3rd argument. If we dont do this what returns from this method is a promise
    db.collection('users').updateOne({
      _id: new ObjectID('5eb9a81d94e857478c3f3dec')
    }, {
      // Second param is the update values
      //  we also want to enter what update operation we want.
        // $set wont delete whole object but just set one value
        // $set is a part of UPDATE OPERATORS
      $set: {
        name: 'Constantin'
      }
    }).then((result)=> {
      console.log(result)
    }).catch((error)=> {
      console.log(error)
    })

    // $inc operator

    db.collection('users').updateOne({
      _id: new ObjectID('5eb9a81d94e857478c3f3dec')
    }, {
      //$inc increments the value in database. We can also use negative numbers
      $inc: {
        age: -3
      }
    }).then((result)=> {
      console.log(result)
    }).catch((error)=> {
      console.log(error)
    })

    // UPDATING MANY
    db.collection('users').updateMany({
      name: 'Mike'
    }, { 
      $set: {
        name: "Gunter"
    }}).then(result => {
      console.log(result)
    }).catch(error => {
      console.log(error)
    })


  }
);



