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
        const anotherElectronicsCollection = database.collection('electronicscollection2');
        const customerInfo = database.collection('customersinfo');
        const customerInfo2 = database.collection('customersinfo2')


        app.get('/electronicscollection', async(req,res) =>{
            const cursor = electronicsCollection.find({});
            const electronics = await cursor.toArray();
            res.send(electronics);
        });

        app.get('/customersinfo', async(req,res) =>{
            const email = req.query.email;
            const query = {email: email}
            const cursor = customerInfo.find(query);
            const orders = await cursor.toArray();
            res.json(orders);
        });

        app.post('/customersinfo', async(req,res) =>{
            const info = req.body;
            const result = await customerInfo.insertOne(info);
            res.json(result);
        });

        app.delete('/customersinfo/:id', async(req,res) =>{
            const id = req.params.id;
            const query = {_id: ObjectId(id)};
            const result = await customerInfo.deleteOne(query);
            res.json(result);
        });

        app.get('/electronicscollection/:id',async(req,res) =>{
            const id = req.params.id;
            const query = {_id: ObjectId(id)};
            const electronic = await electronicsCollection.findOne(query);
            res.json(electronic);
        });

        app.delete('/electronicscollection/:id', async(req,res) => {
            const id = req.params.id;
            const query = {_id: ObjectId(id)};
            const result = await electronicsCollection.deleteOne(query);
            res.json(result);
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