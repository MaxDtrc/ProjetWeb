const express = require("express");
const Users = require("./entities/users.js");

function init(db) {
  const router = express.Router();
  router.use(express.json());

  //Fonctions des utilisateurs
  const users = new Users.default(db);

  //Route concernant tous les utilisateurs
  router
    .route("/")
    .get(async (req, res) => {
      //Obtention de tous les utilisateurs
      console.log("API: obtention des utilisateurs")

      users
        .getAll()
        .then((u) => {
          console.log("API: obtention des utilisateurs effectuée avec succès !")
          res.status(200).send(u);
        })
        .catch((err) => {
          //Erreur
          console.log("Erreur dans l'obtention des utilisateurs")
          res.status(500).send(false);
        })
    });



  //Route de connexion
  router
    .post("/login", async (req, res) => {
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

  

  router
    .route("/signin")
    .post((req, res) => {
      //Création d'un nouvel utilisateur
      console.log("API: Création de l'utilisateur ...");

      //Récupération du corps de la requête
      const { login, password } = req.body;
      
      users
        .create(login, password)
        .then((u) => {
          if (!u) {
            //Utilisateur non renvoyé
            console.log("API: Erreur lors de la création de l'utilisateur")
            res.status(500).send(null);
          } else {
            //Paramétrage de la session
            req.session.userId = u;
            req.session.isAdmin = false;
            req.session.validation = false;
            
            console.log("API: création de l'utilisateur effectuée avec succès !")
            res.status(200).send(u);
          }
        })
        .catch((err) => {
          console.log("API: erreur lors de l'inscription de l'utilisateur")
          res.status(500).send(null);
      });
    });



  //Route de déconnexion: supprime les valeurs de la session
  router
    .route("/logout")
    .post((req, res) => {
      delete req.session.userId;
      delete req.session.isAdmin;
      delete req.session.validation;

      //On renvoie true pour acquitter la demande
      res.status(200).send(true);
    })



  //Route concernant tous les utilisateurs à valider
  router
    .route("/validation")
    .get(async (req, res) => {
      //Obtention de tous les utilisateurs à valider
      console.log("API: obtention des utilisateurs à valider")

      //Obtention de la liste
      users
        .getLstEnAttente()
        .then((lst) => {
          //Succès
          console.log("API: utilisateurs à valider obtenus avec succès !")
          res.status(200).send(lst);
        })
        .catch((err) => {
          //Erreur
          console.log("API: erreur lors de l'obtention des utilisateurs à valider")
          res.status(500).send(null)
        });
  });



  //Route concernant le statut de validation d'un utilisateur
  router
    .route("/validation/:user_id")
    .post(async (req, res) => {
      //Acceptation d'un utilisateur
      console.log("API: acceptation de l'utilisateur " + req.params.user_id)

      //Mise à jour
      users
        .accept(req.params.user_id)
        .then((v) => {
          //Succès
          console.log("API: utilisateur validé avec succès !")
          req.session.validation = true;
          res.statut(200).send(true);
        })
        .catch((err) => {
          //Erreur
          console.log("API: erreur lors de la validation de l'utilisateur")
          res.statut(500).send(false);
        });
    });



  //Multer (stockage d'images)
  const multer = require('multer');
  const upload = multer({ dest: 'uploads/' });
  const fs = require('fs');

  //Route concernant les photos de profil
  router
  .post('/photo/:user_id', upload.single('image'), async (req, res) => {
    try {
      console.log("API: insertion de l'image dans la base de données ...")

      //On vérifie que l'image a été envoyée
      if (!req.file){
        res.status(400).send("Image manquante dans la requête");
      }

      //On récupère les données de l'image
      fs.readFile(req.file.path, async (err, data) => {
        if(err){
          console.log("API: Erreur dans la lecture de l'image")
          res.status(500).send("Image illisible")
        }

        //On vérifie si l'utilisateur a déjà stocké une photo
        const u = (await db.collection('images').find({
          user_id: req.params.user_id
        }));

        //Si c'est le cas, on la supprime
        if(u){
          await db.collection('images').deleteOne({
            user_id: req.params.user_id
          })
        }

        //On insère l'image dans la base de données
        await db.collection('images').insertOne({
          image: data,
          user_id: req.params.user_id
        })

        console.log("API: Photo insérée avec succès !");

        /* NE MARCHE PAS POUR L'INSTANT
        //On supprime le fichier temporaire
        fs.unlink(req.file.path, (err) => {
            if (err) {
              console.error("API: Erreur lors de la suppression du fichier temporaire (photo)");
          }
        });
        */

        //On renvoie un ok
        res.status(200).send(true);
      })
    }
    catch(err){
      //Erreur
      console.log("API: Erreur lors de l'insertion de la photo")
      res.status(500).send(false);
    }
  })

  //Get de la photo
  router.get("/photo/:user_id", (req, res) => {
    console.log("API: Obtention de la photo ...")

    //On cherche la photo
    db.collection("images").findOne({
      user_id: {$eq: req.params.user_id}
    })
    .then((r) => {
        if(r){
          console.log("API: photo obtenue avec succès !")
          res.set('Content-Type', 'image/png'); 
          res.send(r.image.buffer); //Envoi de la photo
        }else{
          console.log("API: photo introuvable")
          res.status(500).send(null)
        }
      }
    )
    .catch(err => {
      //Erreur
      console.log("API: erreur dans le get de la photo")
      res.status(500).send(null)
    })
  })

  //Route concernant la phrase de statut des utilisateurs
  router
    .route("/status/:user_id")
    .post(async (req, res)=> {
      //Modification du statut
      console.log("API: modification de la phrase de statut ...")

      //Obtention du corps de la requête
      const {s} = req.body;

      //Mise à jour
      users.changeStatus(req.params.user_id, s)
      .then((u) => {
        //Succès
        console.log("API: statut mis à jour avec succès !")
        res.status(200).send(true);
      })
      .catch((err)=>{
        //Erreur
        console.log("API: erreur lors de la mise à jour du statut")
        res.status(500).send(false);
      });
    });



  //Route concernant le statut d'administrateur des utilisateurs
  router
    .route("/admin/:user_id")
    .post(async(req, res)=>{
      //Mise à jour du statut d'administrateur
      console.log("API: mise à jour du statut d'admin de l'utilisateur")

      //Obtention du corps de la requête
      const {b} = req.body;

      //Mise à jour
      users.setAdmin(req.params.user_id, b)
      .then(()=> {
        //Succès
        console.log("API: mise à jour du statut d'admin avec succès !")
        res.status(200).send(true);
      })
      .catch((err) => {
        //Erreur
        console.log("API: erreur lors de la mise à jour du statut d'admin")
        res.status(500).send(false)
      });
    });



    //Route concernant un utilisateur particulier
  router
    .route("/:user_id")
    .get(async (req, res) => {
      //Obtention d'un utilisateur
      console.log("API: obtention de l'utilisateur " + req.params.user_id)

      users
        .get(req.params.user_id) //Recherche de l'utilisateur
        .then((u) => {
          //Succès
          console.log("API: utilisateur obtenu avec succès")
          res.status(200).send(u);
        })
        .catch((err) => {
          //Erreur
          console.log("API: erreur dans l'obtention de l'utilisateur")
          res.status(500).send(null)
        });
    })
    .delete(async (req, res) => {
      //Suppression de l'utilisateur
      console.log("API: suppression de l'utilisateur " + req.params.user_id);

      //Suppression
      users
        .delete(req.params.user_id)
        .then((u) => {
          //Succès
          console.log("API: utilisateur supprimé avec succès !");
          res.status(200).send(true);
        })
        .catch((err) => {
          //Erreur
          console.log("API: Erreur lors de la suppression de l'utilisateur")
          res.status(500).send(false);
        });
    });


  return router;
}

exports.default = init;
