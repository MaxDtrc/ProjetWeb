const uri = "mongodb://127.0.0.1:27017";
const { text } = require('stream/consumers');
const {BSON} = require("bson")

//Classe contenant toute les méthodes de modification des utilisateurs dans la base de donnée
class Users {

  constructor(db) {
    this.db = db
  }

  //Fonction permettant la création d'un nouvel utilisateur
  create(username, password) {
    return new Promise((resolve, reject) => {
      console.log("Users: création d'un nouvel utilisateur ...")

      //On vérifie s'il existe déjà
      this.db.collection("users").findOne({
        "username": {$eq: username}
      })
      .then((user) => {
        if(user){
          console.log("Users: l'utilisateur existe déjà")
          reject();
        }
        else{
          //Ajout de l'utilisateur à la DB

          //Insertion du nouvel utilisateur
          this.db.collection("users").insertOne({
            "username": username,
            "password": password,
            "admin": false,
            "validation": false,
            "profile_picture": null,
            "date": new Date(),
            "status": ""
          }).then((u) => {
            //Tout a fonctionné
            console.log("Users: utilisateur ajouté avec succès !")
            resolve(u.insertedId.toString());
          })
        }
      })
      .catch((err) => {
        //Erreur
        console.log("Users: erreur lors de l'ajout de l'utilisateur à la base de données")
        reject();
      })
    });
  }

  //Fonction d'obtention d'un utilisateur
  get(id_user) {
    return new Promise((resolve, reject) => {
      console.log("Users: obtention de l'utilisateur en cours ...")

      //Recherche de l'utilisateur
      this.db.collection("users").findOne({
        _id : new BSON.ObjectId(id_user)
      })
      .then(res => {
        if(res){
          //utilisateur trouvé
          console.log("Users: utilisateur trouvé avec succès !")
          resolve(res)
        }else{
          //utilisateur non trouvé
          console.log("Users: l'utilisateur n'a pas été trouvé")
          reject()
        }
      })
      .catch(err => {
        //Erreur
        console.log("Users: erreur dans l'obtention de l'utilisateur")
        reject()
      })
    });
  }

  //Fonction permettant d'obtenir la liste de tous les utilisateurs
  getAll(){
    return new Promise((resolve, reject) => {
      console.log("Users: obtention de la liste des utilisateurs")

      //Obtention de la liste
      const u = this.db.collection("users").find()

      if(u){
        console.log("Users: liste des utilisateurs obtenue avec succès !")
        resolve(u.toArray())
      }
      else{
        //Erreur
        console.log("Users: erreur lors de l'obtention de la liste des utilisateurs")
        reject()
      }
    });
  }

  //Fonction de connexion
  login(login, password) {
    return new Promise((resolve, reject) => {
      console.log("Users: demande de connexion ...")

      //Obtention de l'utilisateur
      this.db.collection("users").findOne({
        username : login,
        password : password
      })
      .then(res => {
        if(res){
          //Utilisateur trouvé
          console.log("Users: utilisateur trouvé, connexion autorisée")
          resolve(res);
        }
        else{
          //Utilisateur introuvable
          console.log("Users: connexion non autorisée")
          reject();
        }
      })
      .catch(err => {
        //Erreur
        console.log("Users: erreur lors de la connexion")
        reject()
      })
    });
  }

  //Fonction permettant d'accepter un utilisateur en attente
  accept(id_user){
    return new Promise((resolve, reject) => {
      console.log("Users: acceptation de l'utilisateur en cours ...")

      //Mise à jour
      this.db.collection("users").updateOne({
        _id : new BSON.ObjectId(id_user)
      }, {
        $set : {"validation": true, "date": new Date()}
      })
      .then(res => {
        console.log("Users: utilisateur accepté avec succès !")
        resolve(true)
      })
      .catch(err => {
        //Erreur
        console.log("Users: erreur lors de l'accepation de l'utilisateur")
        reject()
      })
    });
  }

  //Fonction permettant de changer le status de l'utilisateur
  changeStatus(id_user, status){
    return new Promise((resolve, reject) => {
      console.log("Users: mise à jour du statut de l'utilisateur ...")

      //Mise à jour
      console.log("status = " + status)
      this.db.collection("users").updateOne({
        _id : new BSON.ObjectId(id_user)
      }, {
        $set : {"status" : status}
      })
      .then(res=>{
        console.log("Users: statut de l'utilisateur modifié avec succès !")
        resolve(true)
      })
      .catch(err => {
        //Erreur
        console.log("Erreur lors de la mise à jour du statut de l'utilisateur")
        reject()
      })
    });
  }

  //Fonction permettant de changer la photo de profil de l'utilisateur
  changeProfilePicture(id_user, photo){
    return new Promise((resolve, reject) => {
      console.log("Users: mise à jour de la photo de profil ...")
      this.db.collection("users").updateOne({
        _id : new BSON.ObjectId(id_user)
      }, {
        $set : {"profile_picture" : photo}
      })
      .then(res=>{
        console.log("Users: photo mise à jour avec succès !")
        resolve(true)
      })
      .catch(err => {
        //Erreur
        console.log("Users: erreur lors de la mise à jour de la photo")
        reject()
      })
    });
  }

  //Fonction permettant de modifier le statut d'administrateur d'un utilisateur
  setAdmin(id_user, b){
    return new Promise ((resolve, reject) => {
      console.log("Users: modification du statut d'administrateur ...")

      //Mise à jour
      this.db.collection("users").updateOne({
        _id : new BSON.ObjectId(id_user)
      }, {
        $set : {"admin" : b}
      })
      .then(res=>{
        console.log("Users: statut d'administrateur mis à jour avec succès !")
        resolve(true)
      })
      .catch(err => {
        //Erreur
        console.log("Users: erreur lors de la mise à jour du statut d'administrateur ...")
        reject()
      })
    });
  }

  //Fonction permettant de supprimer un utilisateur
  delete(id_user){
    return new Promise((resolve, reject) => {
      console.log("Users: suppression de l'utilisateur ...")

      //Suppression
      this.db.collection("users").deleteOne({
        _id : new BSON.ObjectId(id_user)
      })
      .then(res => {
        console.log("Users: utilisateur supprimé avec succès")
        resolve(res)
      })
      .catch(err => {
        //Erreur
        console.log("Users: erreur lors de la suppression de l'utilisateur")
        reject()
      })
    });
  }

  //Fonction permettant d'obtenir la liste des utilisateurs en attente
  getLstEnAttente(){
    return new Promise((resolve, reject) => {
      console.log("Users: obtention des utilisateurs en attente ...")

      //Obtention de la liste
      const u = this.db.collection("users").find({
        validation: {$eq: false}
      })

      if(u){
        console.log("Users: liste des utilisateurs en attente obtenue avec succès !")
        resolve(u.toArray())
      }else{
        //Erreur
        console.log("Users: erreur lors de l'obtention des utilisateurs en attente")
        reject()
      }
    });
  }
}

exports.default = Users;

