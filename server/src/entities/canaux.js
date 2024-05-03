const uri = "mongodb://127.0.0.1:27017";
const {BSON} = require("bson")
const { text } = require('stream/consumers');

class Canaux {

  constructor(db) {
    this.db = db
  }

  create(id_auteur, titre, isPrivate) {
    return new Promise((resolve, reject) => {
      const u = this.db.collection("users").findOne({
        "_id": {$eq: id_auteur}
      })

      if(!u){
        console.log("L'utilisateur n'existe pas")
        reject();
      }else{
        //Ajoute le canal
        this.db.collection("canaux").insertOne({
          "id_auteur": id_auteur,
          "isPrivate": isPrivate,
          "titre": titre,
          "date": new Date(),
          "liste_messages": []
        })
        resolve();
      }
    });
  }

  get(id_canal) {
    return new Promise((resolve, reject) => {
      this.db.collection("canaux").findOne({
        _id : new BSON.ObjectId(id_canal)
      })
      .then(res => {
        if(!res)
          reject()
        else
          resolve(res)
      })
    });
  }

  getAll(){
    return new Promise((resolve, reject) => {
      const c = this.db.collection("canaux").find()
      if(c)
        resolve(c.toArray())
      else
        reject()
    });
  }

  addMessage(text, id_auteur, reply_auteur, reply_message, reply_id, id_canal){
    return new Promise((resolve, reject) => {
      this.get(id_canal).then((c) => {
        c.liste_messages.push({id: c.liste_messages.length, text: text, auteur: id_auteur, reply_auteur: reply_auteur, reply_message: reply_message, reply_id: reply_id, date: new Date()}) // Ajout du message à la liste
        this.db.collection("canaux").updateOne({
          _id : new BSON.ObjectId(id_canal)
        }, {
          $set : c //Update
        }).then(res => {
          resolve(true); //Tout a marché
        }).catch(err => {
          console.log(err);
          reject(); //Erreur update
        })
      }).catch((err) => {
        console.log(err);
        reject(); //Erreur obtention
      })
    })
  }

  deleteMessage(id_canal, id_message){
    return new Promise((resolve, reject) => {
      this.get(id_canal).then((c) => {
        for(var i = 0; i < c.liste_messages.length; i++){
          if(c.liste_messages[i].id == id_message){
            c.liste_messages[i].text = "<Message supprimé>"
            c.liste_messages[i].deleted = true;
          }
          if(c.liste_messages[i].reply_id == id_message){
            c.liste_messages[i].reply_message = "<Message supprimé>"
          }
        }
        this.db.collection("canaux").updateOne({
          _id : new BSON.ObjectId(id_canal)
        }, {
          $set : c //Update
        }).then(res => {
          resolve(true); //Tout a marché
        }).catch(err => {
          console.log(err);
          reject(); //Erreur update
        })
      }).catch((err) => {
        console.log(err);
        reject(); //Erreur obtention
      })
    })
  }

}

exports.default = Canaux;

