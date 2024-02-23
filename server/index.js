const env = require('dotenv').config().parsed;
const PORT = 8000;
const { MongoClient } = require('mongodb');
const express = require('express');
const uri = env.MONGO_URI;

const app = express();

app.get('/', (req, res) => {
    res.send('Hello!')
})

app.post('/register', (req, res) => {
    res.send('Hello!')
})

app.get('/users', async (req, res) => {
    const client = new MongoClient(uri)

    try {
        await client.connect()
        const database = client.db("app-data")
        const users = database.collection("users")

        const retUsers = await users.find().toArray()
        res.send(retUsers)
    } catch (e) {
        console.error(e)
    } finally {
        await client.close()
    }
})

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))