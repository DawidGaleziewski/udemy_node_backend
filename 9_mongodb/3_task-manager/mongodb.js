// CRUD operations
const mongoDB = require('mongodb');
const MongoClient = mongoDB.MongoClient;

// we use the mongo db protocol
const connectionURL = 'mongodb://127.0.0.1:27017';

// we decide what db name we will use
const databaseName = 'task-manager';

// connecting to database
// connect accepts:
// - connect address
// -settings object - useNewParser (old parser is depricated)
// -callback as connecting to db is asyn operation
MongoClient.connect(connectionURL, {useNewUrlParser: true}, (error, client) => {
    // using guard clause
    if(error){
        return console.log('Unable to connect to database');
    }

    //  once connection is opened it will hand for as long as we let it
    //  We have a pool of connections and there can be much more than just one open connection
    console.log('Connected correctly')

    // we do not need to create a database. Simply by picking it and using it mongoDB will create it for us
    //  we want to get a referance to specific database we want to manipulate from client.db
    const db = client.db(databaseName);

    // now we want to specify which collection we want to use
    // secondly what kind of data we want to insert
    // now we should see the new data in robo 3t
    db.collection('users').insertOne({
        name: 'Mike',
        age: 27
    }, (error, result)=> {
        // second argument in insertOne is a callback on completion
        if(error){
            return console.log('Unable to insert user');
        }

        // ops i probably the only thing we will need on resault. It contains resault of what was inserted into db
        console.log(result.ops)
    });

    // inser many documents
    db.collection('users').insertMany([
        {
            name: 'Jenny',
            age: 21
        },{
            name: "Gunter",
            age: 51
        }
    ], (error, result) => {
        if (error){
            return console.log('Error inserting to database')
        }

        console.log(result.ops)
    })

});


