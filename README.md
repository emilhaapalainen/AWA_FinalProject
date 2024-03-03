# Advanced Web Applications project
Tinder clone using MongoDB, Express.js, React.js, Node.Js

## Disclaimer
The project closely follows AniaKubow's "Ultimate Tinder Clone" tutorial video, which is available at: https://www.youtube.com/watch?v=Q70IMS-Qnjk

# Installation
## Server
1. Fork the repository
2. Navigate to server directory
3. Install dependencies with ```npm install```
4. Project uses environmental variables for storing mongoDB URI, create a .env file inside the root of the server directory, add the line ```MONGO_URI = ""``` and add your MongoDB cluster connection string. You need to create a MongoDB Cloud account.
5. Start server with ```npm run start:backend```

## Client
1. Navigate to client (dating-app) directory
2. ```npm install``` for dependencies
3. ```npm run start:frontend```
4. Client lives in localhost:3000
