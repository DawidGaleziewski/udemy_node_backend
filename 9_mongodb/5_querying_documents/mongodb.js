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

    // Find one accepts two params, object which is used for search criteria and callback
    // if query does not find anything it will return null
    // if multiple documents match search criteria it will just return the first one
    db.collection("users").findOne({ name: "Mike", age: 27 }, (error, user) => {
      if (error) {
        return "Error fetching the data";
      }

      console.log(user);
    });

    // SEARCHING BY ID
    // We cannoit just use object id as it is binary data so this: _id: "5eba59a255cb8107b4dc0ce2" wont work
    //  We need to first convert this string to ObjectID using the mongodb library method
    db.collection("users").findOne(
      { _id: new ObjectID("5eba59a255cb8107b4dc0ce2") },
      (error, user) => {
        if (error) {
          return "Error fetching the data";
        }

        console.log(user);
      }
    );

    // searching for multiple documents
    // find is unique as it will not return a data in callback like findOne or insertOne/many. it will give us a pointer inside a databse called 'cursor'
    // in order to get the data we want we want to use toArrayMethod on the return value. This will accept a callback and behave like findOne
    db.collection("users")
      .find({ name: "Mike" })
      .toArray((error, users) => {
        if (error) {
          return console.log("error fetching users");
        }

        console.log(users);
      });

    // Reason for usage of cursor is that not always we want to get all the data. For example here we get only the number of matches
    db.collection("users")
      .find({ age: 21 })
      .count((error, count) => {
        if (error) {
          return console.log("error");
        }

        console.log("count", count);
      });

    // TASKS
    db.collection("users").findOne(
      {
        _id: new ObjectID("5eba5b075c1586222cdd0e5c"),
      },
      (error, user) => {
        console.log("last user by id: ", user);
      }
    );

    db.collection("tasks")
      .find({ completed: false })
      .toArray((error, result) => {
        console.log("Tashs to do: ", result);
      });
  }
);
