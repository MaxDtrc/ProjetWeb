const uri = "mongodb://127.0.0.1:27017";
const {BSON} = require("bson")
const { text } = require('stream/consumers');

class Canaux {

  constructor(db) {
    this.db = db
  }

  //Fonction de création d'un canal
  create(id_auteur, titre, isPrivate) {
    return new Promise((resolve, reject) => {
      console.log("Canaux: ajout du canal à la bdd ...")

      //On ajoute le canal
      this.db.collection("canaux").insertOne({
        "id_auteur": id_auteur,
        "isPrivate": isPrivate,
        "titre": titre,
        "date": new Date(),
        "liste_messages": []
      })
      .then(res => {
          console.log("Canaux: canal ajouté à la bdd")
          resolve();
        }
      )
      .catch(err => {
        console.log("Canaux: echec lors de l'ajout du canal à la bdd")
        reject();
      })
    });
  }

  //Fonction d'obtention d'un canal
  get(id_canal) {
    return new Promise((resolve, reject) => {
      console.log("Canaux: obtention du canal ...")

      this.db.collection("canaux").findOne({
        _id : new BSON.ObjectId(id_canal)
      })
      .then(res => {
        if(res){
          //Canal trouvé
          console.log("Canaux: canal trouvé")
          resolve(res);
        }
        else{
          //Canal pas trouvé
          console.log("Canaux: canal inexistant")
          reject();
        }
      })
      .catch(err => {
        console.log("Canaux: erreur lors de l'obtention du canal")
        reject();
      })
    });
  }

  //Fonction permettant de renvoyer tous les canaux
  getAll(){
    return new Promise((resolve, reject) => {
      console.log("Canaux: obtention de la liste des canaux ...")

      const c = this.db.collection("canaux").find() //Obtention de la liste des canaux

      if(c){
        //Canaux trouvés
        console.log("Canaux: liste des canaux obtenue")
        resolve(c.toArray())
      }
      else{
        //Erreur
        console.log("Canaux: erreur lors de l'obtention de la liste des canaux")
        reject()
      }
    });
  }

  //Fonction permettant d'ajouter un message au canal
  addMessage(text, id_auteur, reply_auteur, reply_message, reply_id, id_canal){
    return new Promise((resolve, reject) => {
      console.log("Canaux: ajout du message ...")

      this.get(id_canal).then((c) => {
        //Ajout du message à la liste
        c.liste_messages.push({id: c.liste_messages.length, text: text, auteur: id_auteur, reply_auteur: reply_auteur, reply_message: reply_message, reply_id: reply_id, date: new Date()}) // Ajout du message à la liste
        
        //On met à jour le document
        this.db.collection("canaux").updateOne({
          _id : new BSON.ObjectId(id_canal)
        }, {
          $set : c //Update
        })
        .then(res => {
          //Tout a marché
          console.log("Canaux: message ajouté avec succès !")
          resolve(true);
        })
      })
      .catch((err) => {
        //Erreur
        console.log("Canaux: erreur lors de l'ajout du message à la conversation");
        reject();
      })
    })
  }

  //Fonction de suppression d'un message
  deleteMessage(id_canal, id_message){
    return new Promise((resolve, reject) => {
      console.log("Canaux: suppression du message en cours ...")


      this.get(id_canal).then((c) => {
        //On parcours la liste des messages
        for(var i = 0; i < c.liste_messages.length; i++){

          //Si le message est celui à supprimé, on remplace le contenu
          if(c.liste_messages[i].id == id_message){
            c.liste_messages[i].text = "<Message supprimé>"
            c.liste_messages[i].deleted = true; //Message supprimé
          }

          //Si le message répond à celui à supprimer, on remplace le contenu
          if(c.liste_messages[i].reply_id == id_message){
            c.liste_messages[i].reply_message = "<Message supprimé>"
          }
        }

        //Mise à jour du document
        this.db.collection("canaux").updateOne({
          _id : new BSON.ObjectId(id_canal)
        }, {
          $set : c
        })
        .then(res => {
          //Tout a fonctionné
          console.log("Canaux: suppression du message effectuée avec succès")
          resolve(true);
        })
      }).catch((err) => {
        //Erreur suppression
        console.log("Canaux: erreur lors de la suppression du message");
        reject(); 
      })
    })
  }

}

exports.default = Canaux;

