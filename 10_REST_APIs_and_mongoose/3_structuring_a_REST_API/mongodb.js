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

    db.collection('users').deleteMany({age:27})
      .then((result)=> {
        console.log(result)
      }).catch( error=> {
        console.log(error)
      })

    db.collection('users').deleteOne({
      _id: new ObjectID('5eb9b79ff126c03efc8e9d19')
    })
    .then(result=> {
      console.log(result)
    }).catch(error=> {
      console.log(error)
    })
  }
);



