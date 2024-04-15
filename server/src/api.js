const express = require("express");
const Users = require("./entities/users.js");
const Canaux = require("./entities/canaux.js");



function init(db) {
    const router = express.Router();
    // On utilise JSON
    router.use(express.json());

    // simple logger for this router's requests
    // all requests to this router will first hit this middleware
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
                res.send(true);
            }else{
                res.send(false);
            }
        }
    })

    router.post('/signin', async (req, res) => {
        const u = await db.collection("users");

        const { login, password } = req.body;
        console.log("login = " + login);

        const c = await u.findOne({
            "username": {$eq: login}
        })

        if(c){
            console.log("existe déjà")
            res.send(false);
        }else{
            console.log("création de l'utilisateur")
            await u.insertOne({"username": login, "password": password})
            res.send(true);
        }
    })

    const users = new Users.default(db);
    router.post("/user/login", async (req, res) => {
        try {
            const { login, password } = req.body;
            // Erreur sur la requête HTTP
            if (!login || !password) {
                res.status(400).json({
                    status: 400,
                    "message": "Requête invalide : login et password nécessaires"
                });
                return;
            }
            if(! await users.exists(login)) {
                res.status(401).json({
                    status: 401,
                    message: "Utilisateur inconnu"
                });
                return;
            }
            let userid = await users.checkpassword(login, password);
            if (userid) {
                // Avec middleware express-session
                req.session.regenerate(function (err) {
                    if (err) {
                        res.status(500).json({
                            status: 500,
                            message: "Erreur interne"
                        });
                    }
                    else {
                        // C'est bon, nouvelle session créée
                        req.session.userid = userid;
                        res.status(200).json({
                            status: 200,
                            message: "Login et mot de passe accepté"
                        });
                    }
                });
                return;
            }
            // Faux login : destruction de la session et erreur
            req.session.destroy((err) => { });
            res.status(403).json({
                status: 403,
                message: "login et/ou le mot de passe invalide(s)"
            });
            return;
        }
        catch (e) {
            // Toute autre erreur
            res.status(500).json({
                status: 500,
                message: "erreur interne",
                details: (e || "Erreur inconnue").toString()
            });
        }
    });

    

    router
        .route("/user/:user_id(\\d+)")
        .get(async (req, res) => {
        try {
            const user = await users.get(req.params.user_id);
            if (!user)
                res.sendStatus(404);
            else
                res.send(user);
        }
        catch (e) {
            res.status(500).send(e);
        }
    })
        .delete((req, res, next) => res.send(`delete user ${req.params.user_id}`));

    router.put("/user", (req, res) => {
        const { login, password, lastname, firstname } = req.body;
        if (!login || !password || !lastname || !firstname) {
            res.status(400).send("Missing fields");
        } else {
            users.create(login, password, lastname, firstname)
                .then((user_id) => res.status(201).send({ id: user_id }))
                .catch((err) => res.status(500).send(err));
        }
    });


    const canaux = new Canaux.default(db);
    router.put("/canal", (req, res) => {
        const {id_auteur, titre} = req.body;
        if (!id_auteur || !titre) {
            res.status(400).send("Champs manquants");
        }else{
            canaux.create(id_auteur, titre)
            .then(() => res.status(201).send(true))
            .catch((err) => res.status(500).send(err));
        }
    })

    router.get("/canal/all"), (req, res) => {
        console.log("getall")
        canaux.getAll()
        .then((canaux) => res.status(201).send(canaux))
        .catch((err) => res.status(500).send(err));
    }

    router.get("/canal/:canal_id(\\d+)", (req, res) => {
        canaux.get(req.params.canal_id)
        .then((canal) => res.status(201).send(canal)) //TODO changer status
        .catch((err) => res.status(500).send(err));
    })

    return router;
}
exports.default = init;

