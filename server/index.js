const env = require('dotenv').config().parsed;
const PORT = 8000;
const { MongoClient } = require('mongodb');
const express = require('express');
const uri = env.MONGO_URI;
const { v4: uuidv4 } = require('uuid');
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

    //Hash password and generate ID
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

        //Sanitize email
        const sanitizedEmail = email.toLowerCase().trim()
        const data = {
            user_id: genID,
            email: sanitizedEmail,
            hashed_password: hashPW
            //matches: []
        }
        const result = await users.insertOne(data);

        const token = jwt.sign(result, sanitizedEmail, {
            expiresIn: '24h'
        })
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
            const token = jwt.sign(user, email, {
                expiresIn: '24h'
                })
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
    //console.log(req.query)
    const userId = req.query.userId
    console.log("userId", userId)
    const data = req.query.data
    //console.log("data", req.query.data)
    
    try {
        await client.connect()
        const database = client.db("app-data")
        const users = database.collection("users")
        
        const user = await users.findOne({ user_id: userId })
        //console.log("ID", userId)
        //console.log("user", user)
        res.send(user)
    } catch (e) {
        console.error(e)
    } finally {
        await client.close()
    }
})

app.put('/addmatch', async (req, res) => {
    const client = new MongoClient(uri)
    const { userId, matchedUserId } = req.body

    try {
        await client.connect()
        const database = client.db("app-data")
        const users = database.collection("users")

        const userQuery = { user_id: userId }
        const updateMatches = {
            $push: {
                matches: {user_id: matchedUserId}
            }
        
        }
        const user = await users.updateOne(userQuery, updateMatches)
        res.send(user)
    } finally {
        await client.close()
    }
})

app.get('/users', async (req, res) => {
    const client = new MongoClient(uri)
    console.log(req.query["userId"])
    const userIds = JSON.parse(req.query.userIds)
    console.log("userIds", userIds)

    
    try {
        await client.connect()
        const database = client.db("app-data")
        const users = database.collection("users")
        
        const pipeline =
        [
            {
                '$match': {
                    'user_id': { 
                        '$in': userIds
                    }
                }
            }
            
        ]
        const foundUsers = await users.aggregate(pipeline).toArray()
        console.log("Found users: ", foundUsers)
        res.send(foundUsers)
        
    } finally {
        await client.close()
    }
})


app.get('/gendered-users', async (req, res) => {
    const client = new MongoClient(uri)
    const gender = req.query.gender
    
    try {
        await client.connect()
        const database = client.db("app-data")
        const users = database.collection("users")

        //Conditional query based on gender preferences
        const genderQuery = {gender_identity: gender}

        const retUsers = await users.find(genderQuery).toArray()

        res.json(retUsers)
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
        res.json(insertedUser)
    
    } finally {
        await client.close()
    }
})

app.get('/messages', async (req, res) => {
    const { userId, correspondingUserId } = req.query
    const client = new MongoClient(uri)
    console.log("userId", userId,"correspondingUserId: ", correspondingUserId)
    try {
        await client.connect()
        const database = client.db("app-data")
        const messages = database.collection("messages")

        const messagesQuery = {
            from_userId: userId, to_userId: correspondingUserId
        }
        const foundMessages = await messages.find(messagesQuery).toArray()
        console.log("foundMessages", foundMessages)
        res.send(foundMessages)
    } finally {
        await client.close()
    }
})



app.get('/test', (req, res) => {
    // Respond with the received query parameters
    res.json({
        receivedQueryParams: req.query
    });
});





app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
