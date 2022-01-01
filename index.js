const express = require('express');
const { MongoClient } = require('mongodb');
const ObjectId = require('mongodb').ObjectId;

require('dotenv').config();
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;


app.use(cors());
app.use(express.json());



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.h4bqr.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function run(){
    try{
        await client.connect();
        const database = client.db('Team_12');
        const electronicsCollection = database.collection('electronicscollection');


        app.get('/electronicscollection', async(req,res) =>{
            const cursor = electronicsCollection.find({});
            const electronics = await cursor.toArray();
            res.send(electronics);
        });

    }
    finally{

    }
}
run().catch(console.dir);

app.get('/', (req,res) =>{
    res.send('Team 12 is running');
});

app.listen(port, () =>{
    console.log("Server is running at port",port);
})