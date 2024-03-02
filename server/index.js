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
        res.status(201).json({ token, user_id: genID })
    } catch (e) {
        console.error(e)
    }

})

app.post('/login', async (req, res) => {
    const client = new MongoClient(uri)
    const { email, password } = req.body

    try {
        await client.connect()
        const database = client.db("app-data")
        const users = database.collection("users")

        const user = await users.findOne({ email })

        if (user && await bcrypt.compare(password, user.hashed_password)) {
            const token = jwt.sign({ user_id: user.user_id }, env.TOKEN_SECRET)
            res.status(201).json({ token, user_id: user.user_id})
        } else {
            res.status(400).send('Invalid email or password.')
        }

    } catch (e) {
        console.error(e)
    }

})

app.get('/user', async (req, res) => {
    const client = new MongoClient(uri)
    const userId = req.query.userId
    

    try {
        await client.connect()
        const database = client.db("app-data")
        const users = database.collection("users")

        const userQuery = { user_id: userId }
        const user = await users.findOne(userQuery)
        res.send(user)
    } catch (e) {
        console.error(e)
    } finally {
        await client.close()
    }
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

app.put('/user', async (req, res) => {
    const client = new MongoClient(uri)
    const formData = req.body.formData


    try {
        await client.connect()
        const database = client.db("app-data")
        const users = database.collection("users")

        const userQuery = { user_id: formData.user_id }

        const updateData = {
            $set: {
                first_name: formData.first_name,
                dob_day: formData.dob_day,
                dob_month: formData.dob_month,
                dob_year: formData.dob_year,
                gender_identity: formData.gender_identity,
                gender_interest: formData.gender_interest,
                url: formData.url,
                about: formData.about,
                matches: formData.matches
            },
        }
        
        const insertedUser = await users.updateOne(userQuery, updateData)
        res.send(insertedUser)
    
    } finally {
        await client.close()
    }
})



app.listen(PORT, () => console.log(`Server running on port ${PORT}`))