//BDD
const {MongoClient} = require('mongodb');
const uri = "mongodb://127.0.0.1:27017";
const client = new MongoClient(uri);

//Connection à la bdd
client.connect();
const db = client.db("organizasso")

//Middlewares express
express = require('express');
const app = express()

//Cors
const cors = require("cors");
const corsOptions = {
    origin: 'http://localhost:5173',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
};
app.use(cors(corsOptions));

//express session
const session = require('express-session');

app.use(session({
  secret: 'vive_les_tajines',
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: false, 
    maxAge: 1000 * 30 * 60 //Session enregistrée pour 30min
  }
}));

//Path - Détermine le répertoire de base
const path = require('path');
const basedir = path.normalize(path.dirname(__dirname));
console.debug(`Base directory: ${basedir}`);

//API
const api = require('./api.js');


//Definition de l'api
app.use('/api', api.default(db));

// Démarre le serveur
app.on('close', () => {
    client.close; //Fermeture de la liaison à la base de données
});

exports.default = app;

