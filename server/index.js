const env = require('dotenv').config().parsed;
const PORT = 8000;
const { MongoClient } = require('mongodb');
const express = require('express');
const uri = env.MONGO_URI;
const { v1: uuidv4 } = require('uuid');
const app = express();
const jwt = require('jsonwebtoken');
const cors = require('cors');
const bcrypt = require('bcrypt');

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello!')
})

app.post('/register', async (req, res) => {
    const client = new MongoClient(uri)
    const { email, password } = req.body

    const genID = uuidv4()
    const hashPW = await bcrypt.hash(password, 10)

    try {
        await client.connect()
        const database = client.db("app-data")
        const users = database.collection("users")

        const oldUser = await users.findOne({ email })
        if (oldUser) {
            res.status(400).send('User already exists.')
        }
        
        const sanitizedEmail = email.toLowerCase()
        const data = {
            user_id: genID,
            email: sanitizedEmail,
            hashed_password: hashPW
        }
        const result = await users.insertOne(data);

        const token = jwt.sign({ user_id: genID }, env.TOKEN_SECRET)
        res.status(201).json({ token, user_id: genID, email: sanitizedEmail})
    } catch (e) {
        console.error(e)
    }

})

app.post('/login', async (req, res) => {
    const client = new MongoClient(uri)
    const { email, password } = req.body

    
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