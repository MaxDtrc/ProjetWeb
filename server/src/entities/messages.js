const uri = "mongodb://127.0.0.1:27017";

const { text } = require('stream/consumers');

class Messages {

  constructor(db) {
    this.db = db
  }

  create(id_canal, id_auteur, text) {
    return new Promise((resolve, reject) => {
      const u = this.db.collection("users").findOne({
        "_id": {$eq: id_auteur}
      })

      if(!u){
        console.log("L'utilisateur n'existe pas")
        reject();
      }else{
        //Ajout du message à la base de données

        
        this.db.collection("messages").insertOne({
          "id_auteur": id_auteur,
          "text": text,
          "date": "2024" //TODO mettre la date
        })
        resolve();
      }

      if(u) {
        console.log("L'utilisateur existe déjà")
        reject();
      } else {
        //Ajout de l'utilisateur à la DB
        this.db.collection("users").insertOne({
          "username": username,
          "password": password,
          "lastname": lastname,
          "firstname": firstname
        })

        //On récupère l'identifiant pour le renvoyer
        const user = this.db.collection.findOne({
          "username": {$eq: username}
        })

        resolve(user._id);
      }
    });
  }

  get(userid) {
    return new Promise((resolve, reject) => {
      const user = {
         login: "pikachu",
         password: "1234",
         lastname: "chu",
         firstname: "pika"
      }; // À remplacer par une requête bd

      if(false) {
        //erreur
        reject();
      } else {
        if(userid == 1) {
          resolve(user);
        } else {
          resolve(null);
        }
      }
    });
  }

  async exists(login) {
    const c = await db.collection("collec1").findOne( login )
    return new Promise((resolve, reject) => {
      if(c) {
        //erreur
        reject();
      } else {
        resolve(true);
      }
    });
  }


}

exports.default = Messages;

