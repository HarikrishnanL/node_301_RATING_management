const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();
const morgan = require('morgan');

//import database 
const db = require("./src/app/config/database");

// importing routes 
const Rating = require('./src/app/routes/rating');

const app = express();
app.use(morgan("dev"));
app.use(express.json());

app.set('port', process.env.port);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

db.authenticate()
    .then(() => {
        console.log("Database Handshake successfull");
    }).catch((error) => {
        console.log("Database Handshake failed with error :" + error);
    });

app.use(cors());

app.get("/", (req, res) => {
    res.json({ message: "Welcome to rating service microservices" });
});

app.get("/rating-management", (req, res) => {
    res.json({ message: "Welcome to rating service microservices" });
});

app.use("/rating-management", Rating);

app.get("*", (req, res) => {
    res.status(404).send("Invalid Endpoint")
});

module.exports = app;