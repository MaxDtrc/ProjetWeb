const uri = "mongodb://127.0.0.1:27017";

const { text } = require('stream/consumers');

class Canaux {

  constructor(db) {
    this.db = db
  }

  create(id_auteur, titre) {
    return new Promise((resolve, reject) => {
      const u = this.db.collection("users").findOne({
        "_id": {$eq: id_auteur}
      })

      if(!u){
        console.log("L'utilisateur n'existe pas")
        reject();
      }else{
        //Ajout le canal
        this.db.collection("canaux").insertOne({
          "id_auteur": id_auteur,
          "titre": titre,
          "date": "2024", //TODO mettre la date
          "liste_messages": []
        })
        resolve();
      }
    });
  }

  get(id_canal) {
    return new Promise((resolve, reject) => {
      canal = this.db.collection("canaux").findOne({
        "_id": {$eq: id_canal}
      })

      if(!canal){
        console.log("Le canal recherché n'existe pas")
        reject();
      }else{
        resolve(canal)
      }
    });
  }

  getAll(){
    return new Promise((resolve, reject) => {
      canal = this.db.collection("canaux")

      if(!canal){
        console.log("Le canal recherché n'existe pas")
        reject();
      }else{
        resolve(canal)
      }
    });
  }
}

exports.default = Canaux;

