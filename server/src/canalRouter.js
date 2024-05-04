const express = require("express");
const Canaux = require("./entities/canaux.js");

function init(db) {
  const router = express.Router();
  router.use(express.json());

  //Fonctions des canaux
  const canaux = new Canaux.default(db);

  //Route concernant tous les canaux
  router
    .route("/")
    .get(async (req, res) => {
      //Obtention de tous les canaux
      console.log("API: obtention de la liste des canaux")

      canaux
        .getAll()
        .then((c) => {
          console.log("API: canaux obtenus avec succès !")
          res.status(200).send(c);
        })
        .catch(() => {
          console.log("API: erreur dans l'obtention des canaux")
          res.status(500).send(null)
        });
    })
    .put((req, res) => {
      //Ajout d'un nouveau canal
      console.log("API: ajout d'un nouveau canal")

      //Récupération du corps de la requête
      const { id_auteur, titre, isPrivate } = req.body;

      //Champs manquants
      if (!id_auteur || !titre) {
        res.status(400).send("Champs manquants dans la requête");
      } else {
        //Création du canal
        canaux
          .create(id_auteur, titre, isPrivate)
          .then(() => {
            console.log("API: canal ajouté avec succès !")
            res.status(200).send(true)
          })
          .catch(() => {
            console.log("API: erreur dans l'ajout du canal")
            res.status(500).send(false)
          });
      }
    })
    

  //Route concernant un canal particulier
  router
    .route("/:canal_id")
    .get(async (req, res) => {
      //Obtention d'un canal
      console.log("API: obtention du canal " + req.params.canal_id)

      canaux
        .get(req.params.canal_id)
        .then((c) => {
          console.log("API: canal obtenu avec succès !")
          res.status(200).send(c)
        })
        .catch(() => {
          console.log("API: erreur dans l'obtention du canal")
          res.status(500).send(null)
        })
    })
    .put(async (req, res) => {
      //Ajout d'un message au canal
      console.log("API: ajout d'un message ...")
      
      //On récupère le corps de la requête
      const { text, id_auteur, reply_auteur, reply_message, reply_id } = req.body;

      //Champs manquants
      if (!id_auteur || !text) {
        res.status(400).send("Champs manquants dans la requête");
      } else {
        //Ajout du message
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
            console.log("API: message ajouté avec succès !")
            res.status(200).send(true);
          })
          .catch((err) => {
            console.log("API: erreur lors de l'ajout du message")
            res.status(500).send(false);
          });
      }
    });

  //Route concernant un message particulier
  router
    .route("/:canal_id/messages/:message_id")
    .delete((req, res) => {
      //Suppression d'un message
      console.log("API: suppression d'un message ...")

      canaux.deleteMessage(req.params.canal_id, req.params.message_id)
      .then((r) => {
        console.log("API: message supprimé avec succès !")
        res.status(200).send(true)
      })
      .catch((err) => {
        console.log("API: Erreur lors de la suppression du message !")
        res.status(500).send(false)
      });
    })

  return router;
}
exports.default = init;
