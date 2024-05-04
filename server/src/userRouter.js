const express = require("express");
const Users = require("./entities/users.js");

function init(db) {
  const router = express.Router();

  //Fonctions des utilisateurs
  const users = new Users.default(db);

  router.use(express.json());
  
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

  router.route("/").get(async (req, res) => {
    users
      .getAll()
      .then((u) => {
        res.status(201).send(u);
      })
      .catch((err) =>
        res.status(500).send("Erreur dans l'obtention des utilisateurs")
      );
  });

  router.route("/validation").get(async (req, res) => {
    users
      .getLstEnAttente()
      .then((lst) => {
        res.send(lst);
      })
      .catch((err) => res.status(500).send(false));
  });
  router.route("/validation/:user_id").post(async (req, res) => {
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

  router.route("/photo/:user_id").post(async (req, res) => {
    const {photo} = req.body;
    users
      .changeProfilePicture(req.params.user_id, req.body.photo)
      .then((v) => {
        res.send(true);
      })
      .catch((err) => {
        res.send(false);
      });
  });



  router.route("/status/:user_id").post(async (req, res)=> {
    users.changeStatus(req.params.user_id, req.body.status)
    .then((u) => {
      res.send(true);
    })
    .catch((err)=>{
      res.send(false);
    });
  });

  router.route("/admin/:user_id").post(async(req,res)=>{
    users.setAdmin(req.params.user_id, req.body.b)
    .then((res2)=> {
      res.send(true);
    })
    .catch((err) => res.status(500).send(false));
  });


  router
    .route("/:user_id")
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
