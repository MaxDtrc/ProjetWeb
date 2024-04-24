const express = require("express");
const session = require('express-session');
const Users = require("./entities/users.js");
const Canaux = require("./entities/canaux.js");



function init(db) {
    const router = express.Router();

    // On utilise JSON
    router.use(express.json());

    router.use((req, res, next) => {
        console.log('API: method %s, path %s', req.method, req.path);
        console.log('Body', req.body);
        next();
    });


    router.get('/message/get', async (req, res) => {
        await client.connect();
        const bdd = await client.db("base1").collection("collec1");
        const c = await bdd.findOne({
            "auteur" : {$eq: 1704}
        });

        res.json(c);
    })

    router.post('/message/add', async (req, res) => {
        await client.connect();
        const bdd = await client.db("base1").collection("collec1");
        
        const msg = req.body;
        await bdd.insertOne(msg);

        res.send(true);
    })


    router.post('/login', async (req, res) => {
        const u = await db.collection("users");

        const { login, password } = req.body;
        console.log("login = " + login);

        const c = await u.findOne({
            "username": {$eq: login}
        })

        if(!c){
            res.send(false);
        }else{
            if(c.password == password){
                res.send(c._id.toString());
            }else{
                res.send(null);
            }
        }
    })

    router.post('/signin', async (req, res) => {
        const u = await db.collection("users");

        const { login, password } = req.body;
        console.log("login = " + login);

        var c = await u.findOne({
            "username": {$eq: login}
        })

        if(c){
            res.send(null);
        }else{
            await u.insertOne({"username": login, "password": password})
            c = await u.findOne({
                "username": {$eq: login}
            })
            res.send(c._id.toString());
        }
    })
    
    const canaux = new Canaux.default(db);


    
    router.route("/canal")
    .put((req, res) => {
        const {id_auteur, titre} = req.body;
        if (!id_auteur || !titre) {
            res.status(400).send("Champs manquants");
        }else{
            canaux.create(id_auteur, titre)
            .then(() => res.status(201).send(true))
            .catch((err) => res.status(500).send(err));
        }
    })
    .get(async (req, res) => {
        canaux.getAll()
        .then((c) => {
            res.status(201).send(c)
        })
        .catch((err) => res.status(500).send(err));
    })

    router.route("/canal/:canal_id").get(async (req, res) => {
        canaux.get(req.params.canal_id)
        .then((c) => res.status(201).send(c)) //TODO changer status
        .catch((err) => res.status(500).send(err));
    }).put(async (req, res) => {
        const {text, id_auteur} = req.body;
        if (!id_auteur || !text) {
            res.status(400).send("Champs manquants");
        } else {
            canaux.addMessage(text, id_auteur, req.params.canal_id)
            .then(() => {res.status(201).send(true)})
            .catch((err) => {res.status(500).send(err)});
            
        }
    })

    

    const users = new Users.default(db);
    router.route("/user/:user_id").get(async (req, res) => {
        users.get(req.params.user_id) //Recherche de l'utilisateur
        .then((u) => {
            res.status(201).send(u)
        })
        .catch((err) => res.status(500).send(err));
    })

    

    return router;
}
exports.default = init;

