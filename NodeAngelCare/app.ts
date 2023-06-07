import  Express  from "express";
import { MongoClient, ServerApiVersion } from "mongodb";

const app = Express();
const mongoose = require("mongoose");
const urlDB = "mongodb://localhost:27017";
const dbName = "angelCare_db";
const collectionName = "Users";

const client = new MongoClient(urlDB);

mongoose.connect("mongodb://127.0.0.1:27017/angelCare_db", {

  useNewUrlParser: "true",
  useUnifiedTopology: true,

})

mongoose.connection.on("error", (err:any) => {

  console.log("err", err)

})

mongoose.connection.on("connected", (err:any, res:any) => {

  console.log("mongoose is connected")

})

const db = client.db(dbName);
const collection = db.collection(collectionName);



console.log( collection.find().toArray())


// Settings
app.set('port', process.env.PORT || 3000);


app.get("/", (req, res) => {
    res.send("Hello World!");
  }
);

app.listen(3000, () => {
    console.log("Server running on port 3000");
    }
);