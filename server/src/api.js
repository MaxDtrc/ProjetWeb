const express = require("express");
const session = require("express-session");
const Users = require("./entities/users.js");
const Canaux = require("./entities/canaux.js");

function init(db) {
  const router = express.Router();

  // On utilise JSON
  router.use(express.json());

  router.use((req, res, next) => {
    console.log("API: method %s, path %s", req.method, req.path);
    console.log("Body", req.body);
    console.log("currentSession = " + req.session.userId)
    next();
  });

  const users = new Users.default(db);
  router.post("/login", async (req, res) => {
    const { login, password } = req.body;

    users
      .login(login, password)
      .then((u) => {
        if (!u) {
          res.status(500).send("Utilisateur inexistant");
        } else {
          req.session.userId = u._id.toString();
          req.session.isAdmin = u.admin;
          req.session.validation = u.validation;
          res.send(u);
        }
      })
      .catch((err) => {
        res.status(500).send("Erreur lors de la connexion");
      });
  });

  router.post("/signin", (req, res) => {
    const { login, password } = req.body;
    console.log("api : création de l'utilisateur");
    users
      .create(login, password)
      .then((u) => {
        if (!u) {
          res.status(500).send("Utilisateur inexistant");
        } else {
          req.session.userId = u;
          req.session.isAdmin = false;
          req.session.validation = false;
          res.send(u);
        }
      })
      .catch((err) => {
        res.status(500).send("Erreur lors de la connexion");
      });
  });

  router.post("/logout", (req, res) => {
    delete req.session.userId;
    delete req.session.isAdmin;
    delete req.session.validation;
    res.send(true);
  })

  router.get("/session", (req, res) => {
    res.send({id: req.session.userId, isAdmin: req.session.isAdmin, validation: req.session.validation})
  })

  const canaux = new Canaux.default(db);

  router
    .route("/canal")
    .put((req, res) => {
      const { id_auteur, titre } = req.body;
      if (!id_auteur || !titre) {
        res.status(400).send("Champs manquants");
      } else {
        canaux
          .create(id_auteur, titre)
          .then(() => res.status(201).send(true))
          .catch((err) => res.status(500).send(false));
      }
    })
    .get(async (req, res) => {
      canaux
        .getAll()
        .then((c) => {
          res.status(201).send(c);
        })
        .catch((err) => res.status(500).send(false));
    });

  router.route("/canal/:canal_id/messages/:message_id")
  .delete((req, res) => {
    canaux.deleteMessage(req.params.canal_id, req.params.message_id)
    .then((r) => res.send(true))
    .catch((err) => res.status(500).send(false));
  })

  router
    .route("/canal/:canal_id")
    .get(async (req, res) => {
      canaux
        .get(req.params.canal_id)
        .then((c) => res.status(201).send(c)) //TODO changer status
        .catch((err) => res.status(500).send(false));
    })
    .put(async (req, res) => {
      const { text, id_auteur, reply_auteur, reply_message, reply_id } = req.body;
      console.log(reply_auteur, reply_message, reply_id);
      if (!id_auteur || !text) {
        res.status(400).send("Champs manquants");
      } else {
        canaux
          .addMessage(
            text,
            id_auteur,
            reply_auteur,
            reply_message,
            reply_id,
            req.params.canal_id
          )
          .then(() => {
            res.status(201).send(true);
          })
          .catch((err) => {
            res.status(500).send(false);
          });
      }
    });

  router.route("/user").get(async (req, res) => {
    users
      .getAll()
      .then((u) => {
        res.status(201).send(u);
      })
      .catch((err) =>
        res.status(500).send("Erreur dans l'obtention des utilisateurs")
      );
  });

  router.route("/user/validation").get(async (req, res) => {
    users
      .getLstEnAttente()
      .then((lst) => {
        res.send(lst);
      })
      .catch((err) => res.status(500).send(false));
  });
  router.route("/user/validation/:user_id").post(async (req, res) => {
    users
      .accept(req.params.user_id)
      .then((v) => {
        req.session.validation = true;
        res.send(true);
      })
      .catch((err) => {
        res.send(false);
      });
  });

  router.route("/user/status/:user_id").post(async (req, res)=> {
    users.changeStatus(req.params.user_id, req.body.status)
    .then((u) => {
      res.send(true);
    })
    .catch((err)=>{
      res.send(false);
    });
  });

  router.route("/user/admin/:user_id").post(async(req,res)=>{
    users.setAdmin(req.params.user_id, req.body.b)
    .then((res2)=> {
      res.send(true);
    })
    .catch((err) => res.status(500).send(false));
  });

  /* 
  router.route("/user/message/:user_id").get((req, res) => {
    canaux.getAll().then((canaux) => {
        lst = []
        for(var i = 0; i < canaux.length; i++){
            const c = canaux[i];
            for(var j = 0; j < c.liste_messages.length; c++){
                if(c[j].auteur == req.params.user_id){
                    lst.push(c[j]);
                }
            }
        }
        res.send(lst);
    }).catch(err => {
        console.log(err);
        res.status(500).send("Problème dans l'obtention des messages de l'utilisateur")
    });
  });
  */

  router
    .route("/user/:user_id")
    .get(async (req, res) => {
      users
        .get(req.params.user_id) //Recherche de l'utilisateur
        .then((u) => {
          res.status(201).send(u);
        })
        .catch((err) => res.status(500).send(false));
    })
    .delete(async (req, res) => {
      console.log("suppression de " + req.params.user_id);
      users
        .delete(req.params.user_id)
        .then((u) => {
          console.log("utilisateur supprimée");
          res.send(true);
        })
        .catch((err) => {
          res.send(false);
        });
    });

  return router;
}
exports.default = init;
