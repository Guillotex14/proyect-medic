import mongoose from "mongoose";

import { connect, connection } from "mongoose";
import { MONGO_URI } from "./config";


export async function mongoConnection() {
    try {
        await connect(MONGO_URI);
        console.log('>>> DB is connected');
    } catch (error) {

        console.log('Something went wrong!');
        console.log(error);
    }
}

connection.on('connected', () => {
    console.log('Mongoose is connected', connection.db.databaseName);
});

connection.on('error', (err) => {
    console.log('Mongoose connection error', err);
});

connection.on('disconnected', () => {
    console.log('Mongoose is disconnected');
});



// const uri = "mongodb+srv://jefersonmujica:SkibCc1nKFNmcfb1@cluster0.luvml6n.mongodb.net/?retryWrites=true&w=majority";

// async function connect() {
//     try {
//         await mongoose.connect(uri);
//         console.log('>>> DB is connected');
//     } catch (error) {
//         console.log('Something went wrong!');
//         console.log(error);
//     }

// }

export default connect;

// // import { MongoClient, ServerApiVersion } from "mongodb";

// const express = require("express");
// const mongoose = require("mongoose");
// const {MongoClient, ServerApiVersion} = require("mongodb");
// const urlDB = "mongodb://0.0.0.0:27017";
// const dbName = "angelCare_db";
// const collectionName = "Users";
// const app = express();
// const client = new MongoClient(urlDB);

// const uri = "mongodb+srv://jefersonmujica:SkibCc1nKFNmcfb1@cluster0.luvml6n.mongodb.net/?retryWrites=true&w=majority";



// const client_cloud = new MongoClient(uri);
// async function run() {
//     try {
//       // Connect the client to the server	(optional starting in v4.7)
//         await client_cloud.connect();
//       // Send a ping to confirm a successful connection
//         await client_cloud.db("admin").command({ ping: 1 });
//         console.log("Pinged your deployment. You successfully connected to MongoDB!");
//         const db = client_cloud.db('angelCareDB');
//         const collection = db.collection('Users');

//         // Find the first document in the collection
//         const first = await collection.findOne();
//         console.log(first);

//     } finally {
//       // Ensures that the client will close when you finish/error
//     //   await client.close();
//     }
// }

// run().catch(console.dir);

// // mongoose.connect(uri, {

// //     useNewUrlParser: "true",
// //     useUnifiedTopology: true,

// // })

// // mongoose.connection.on("error", (err) => {

// //     console.log("err", err)

// // })

// // mongoose.connection.on("connected", (err, res) => {

// //     console.log("mongoose is connected")

// // })

// // const db = client.db(dbName);
// // const collection = db.collection(collectionName);

// // collection.find().toArray((err, documents) => {
// //     console.log(documents)
// //     if (err) {
// //         console.error('Error al obtener los documentos:', err);
// //         return; 
// //     }
// //     documents.forEach((document) => {
// //         console.log(document); 
// //     });
// // });


// // Settings
// app.set('port', process.env.PORT || 3000);


// app.get("/", (_req: any, res: { send: (arg0: string) => void; }) => {
//     res.send("Hello World!");
// });

// app.listen(3000, () => {
//     console.log("Server running on port 3000");
//     }
// );