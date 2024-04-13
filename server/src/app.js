const path = require('path');
const api = require('./api.js');

//BDD
const {MongoClient} = require('mongodb');
const uri = "mongodb://127.0.0.1:27017";
const client = new MongoClient(uri);

//Connection à la bdd
client.connect();
const db = client.db("organizasso")

// Détermine le répertoire de base
const basedir = path.normalize(path.dirname(__dirname));
console.debug(`Base directory: ${basedir}`);

//Middlewares express
express = require('express');
const app = express()
const session = require("express-session");
const cors = require("cors");
const corsOptions = {
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
};
app.use(cors(corsOptions));

app.use(session({
    secret: "technoweb rocks",
    resave: true,
    saveUninitialized: false
}));

//Definition de l'api
app.use('/api', api.default(db));

// Démarre le serveur
app.on('close', () => {
    client.close; //Fermeture de la liaison à la base de données
});

exports.default = app;

