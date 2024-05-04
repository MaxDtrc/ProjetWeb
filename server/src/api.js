const express = require("express");

function init(db) {
  //Création du routeur
  const router = express.Router();

  //Ajout du middleware json
  router.use(express.json());

  //Affichage d'un log générique
  router.use((req, res, next) => {
    console.log("API: method %s, path %s", req.method, req.path);
    console.log("Body", req.body);
    next();
  });

  //Routage des requêtes vers les utilisateurs
  const userRouter = require('./userRouter.js');
  router.use('/user', userRouter.default(db));

  //Routage des requêtes vers les canaux
  const canalRouter = require('./canalRouter.js');
  router.use('/canal', canalRouter.default(db));

  //Requête d'obtention de la session
  router.get("/session", (req, res) => {
    res.send({id: req.session.userId, isAdmin: req.session.isAdmin, validation: req.session.validation})
  })


  return router;
}
exports.default = init;
