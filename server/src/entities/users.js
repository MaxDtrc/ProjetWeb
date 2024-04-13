const uri = "mongodb://127.0.0.1:27017";

const { text } = require('stream/consumers');

class Users {

  constructor(db) {
    this.db = db
  }

  create(username, password, lastname, firstname) {
    return new Promise((resolve, reject) => {
      const user = this.db.collection("users").findOne({
        "username": {$eq: username}
      })

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

  checkpassword(login, password) {
    return new Promise((resolve, reject) => {
      let userid = 1; // À remplacer par une requête bd
      if(false) {
        //erreur
        reject();
      } else {
        resolve(userid);
      }
    });
  }

}

exports.default = Users;

