import  Express  from "express";
import { MongoClient, ServerApiVersion } from "mongodb";

const app = Express();
const urlDB = "mongodb+srv://jefersonmujica:<Mujica0413.>@cluster0.luvml6n.mongodb.net/?retryWrites=true&w=majority";
const clientDB = new MongoClient(urlDB,{
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true
    }
});

async function run() {
    try {
      // Connect the client to the server	(optional starting in v4.7)
        await clientDB.connect();
      // Send a ping to confirm a successful connection
        await clientDB.db("angelCareDB").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
      // Ensures that the client will close when you finish/error
        await clientDB.close();
    }
}
console.log("Connecting to MongoDB...")
console.log("*****************")
run().catch(console.dir);
// console.log("*****************")


app.get("/", (req, res) => {
    res.send("Hello World!");
    }
);

app.listen(3000, () => {
    console.log("Server running on port 3000");
    }
);