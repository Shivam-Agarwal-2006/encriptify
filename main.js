const express = require('express')
const app = express()
const cors = require('cors')
app.use(cors())
const bodyParser = require('body-parser')
app.use(bodyParser.json())
const port = 3000
const { MongoClient } = require('mongodb');
const url = `mongodb+srv://shivamagarwal23012006:NFndjrr3nEMxG0hX@cluster0.ydriafv.mongodb.net/private-conversation?retryWrites=true&w=majority&appName=cluster0;`
const client = new MongoClient(url);
const dbName = 'private-conversation';
client.connect();

app.get('/', async (req, res) => {
    const key = req.query.key;
    const db = client.db(dbName);
    const collection = db.collection('maps');
    const result = await collection.findOne({ key: key });
    if (result) {
        res.send(result);
    } else {
        res.status(404).send({ message: 'Map not found' });
    }
})
app.post('/', async (req, res) => {
    const obj = req.body;
    const db = client.db(dbName);
    const collection = db.collection('maps');
    const findResult = await collection.insertOne(obj)
    res.send({ result: "success" })
})

app.listen(port, () => {
    console.log(`Example app listening on http://localhost:${port}`)
})