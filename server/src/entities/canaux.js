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
        //Ajoute le canal
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
      const canal = this.db.collection("canaux").findOne({
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
      const c = this.db.collection("canaux").find()
      if(c)
        resolve(c.toArray())
      else
        reject()
    });
  }

  addMessage(text, id_auteur, id_canal){
    return new Promise((resolve, reject) => {
      this.get(id_canal).then((canal) => {
        console.log("canal: " + canal)
        resolve()
      }).catch((err) => {
        console.log("err")
      })
        /*
      if(c){
        console.log("canal récupéré")
        console.log(c)
        var lst = c.data.liste_messages
        lst = [...lst, { text: text, auteur: id_auteur, date: "21/03/2023 15:15" }] //TODO date
        console.log("lst modifiée")
        console.log("lst:" + lst)
        this.db.collection("canaux").updateOne(
          {
            "_id": {$eq: id_canal}
          }, {
            $set: res
          }).then((res) => resolve()).catch((err) => reject)
        }else{
          reject()
        }*/
    })
  }

}

exports.default = Canaux;

