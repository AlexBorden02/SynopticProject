const { MongoClient } = require("mongodb");
const mongoose = require('mongoose')
const bodyParser = require('body-parser');
const express = require('express')
const app = express()
const cors = require('cors');
const port = 4000
const authRoutes = require('./routes/auth');
const dataRoutes = require('./routes/data');
const { config } = require("dotenv");

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(cors());
app.use(bodyParser.json());

config({ // Bringing in the .env for the DB password
    path: __dirname + "/.env"
});

// Declaring routes for the api
app.use('/api', authRoutes);
app.use('/data', dataRoutes);

const DBurl = `mongodb+srv://admin:${process.env.DBPASSWORD}@cluster0.7aila.mongodb.net/` // db connection string

MongoClient.connect(DBurl, {useNewUrlParser: true, useUnifiedTopology: true}, (err, database)  => {
    if(err) throw err
    global.db = database
});

mongoose
    .connect(`mongodb+srv://admin:${process.env.DBPASSWORD}@cluster0.7aila.mongodb.net/credentials?retryWrites=true&w=majority`, {
        useNewUrlParser: true,
        useUnifiedTopology: true
}).then(() => console.log("Connected"))

app.listen(port, () => {
    console.log(`app listening at http://localhost:${port}`)
});

