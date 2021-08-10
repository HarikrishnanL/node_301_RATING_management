const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();
const morgan = require('morgan');
const swaggerUI = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');

//import database 
const db = require("./src/app/config/database");

// importing routes 
const Rating = require('./src/app/routes/rating');

const options = {
    definition:{
        openapi:"3.0.0",
        info:{
            title:"Library API",
            version:"1.0.0",
            description:"Rating Management API"
        },
        servers:[
            {
                url:"http://localhost:5004"
            }
        ]
    },
    apis:["./src/app/routes/*.js"]
};

const specs = swaggerJsDoc(options);

const app = express();
app.use(morgan("dev"));
app.use(express.json());

app.use('/api-docs',swaggerUI.serve,swaggerUI.setup(specs))

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


app.use((error, req, res, next) => {
    console.log(error);
    const status = error.statusCode || 500;
    const message = error.message;
    const data = error.data;

    res.status(status).json({ message: message, data: data });
});

app.get("*", (req, res) => {
    res.status(404).send("Invalid Endpoint")
});

module.exports = app;