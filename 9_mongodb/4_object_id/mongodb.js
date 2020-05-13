// CRUD operations
const mongoDB = require("mongodb");

// we grab ObjectID from mongoDB object
const { MongoClient, ObjectID } = require("mongodb");

// creating a object id using mongodb library
const id = new ObjectID();
console.log(id);
// ids: 5eba60bce976d23c9cdf19ca, 5eba608d10dcd01498ea191d are a string representations of binary code. We can see the oryginal by id.id
console.log("binary:", id.id, "binary length:", id.id.length);

//  id info is:
//- 12 bytes total
//- 4 bytes seconds from Unix epoch
//- 5 bytes random value
// - 3 byte counter, starting with random value

// we have methods to get timestamp from the object id
console.log(id.getTimestamp());

const connectionURL = "mongodb://127.0.0.1:27017";
const databaseName = "task-manager";

MongoClient.connect(
  connectionURL,
  { useNewUrlParser: true },
  (error, client) => {
    // using guard clause
    if (error) {
      return console.log("Unable to connect to database");
    }

    const db = client.db(databaseName);

    db.collection("users").insertOne(
      {
        // creating our own object id on node level.
        // If we wont specify it mongo will create one for us
        // Normally we want mongo to create object id
        _id: new ObjectID(),
        name: "Mike",
        age: 27,
      },
      (error, result) => {
        if (error) {
          return console.log("Unable to insert user");
        }

        console.log(result.ops);
      }
    );

    // db.collection("tasks").insertMany(
    //   [
    //     {
    //       description: "go to doctor",
    //       completed: false,
    //     },
    //     {
    //       description: "feed the pet",
    //       completed: true,
    //     },
    //     {
    //       description: "play the game",
    //       completed: true,
    //     },
    //     {
    //       description: "pay flat fee",
    //       completed: false,
    //     },
    //     {
    //       description: "win presidential elections 2020",
    //       completed: false,
    //     },
    //   ],
    //   (error, result) => {
    //     if (error) {
    //       return console.log(error);
    //     }
    //     console.log(result.ops);
    //   }
    // );
  }
);

// IDs in mongo are GUIDs (global unique IDs) and there are generated without need of incrementing and knowing what the last value was, which is the case for normal SQL databses.
//  we can use the mongodb library to generate the id on our own
