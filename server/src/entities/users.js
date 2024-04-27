const uri = "mongodb://127.0.0.1:27017";
const { text } = require('stream/consumers');
const {BSON} = require("bson")

class Users {

  constructor(db) {
    this.db = db
  }

  create(username, password) {
    return new Promise((resolve, reject) => {
      this.db.collection("users").findOne({
        "username": {$eq: username}
      })
      .then((user) => {
        if(user){
          console.log("L'utilisateur existe déjà")
          reject();
        }else{
          //Ajout de l'utilisateur à la DB
          this.db.collection("users").insertOne({
            "username": username,
            "password": password,
            "admin": false,
            "validation": false,
            "date": new Date()
          }).then((u) => {
            resolve(u.insertedId.toString());
          })
        }
        
      })
      .catch((err) => {
        console.log("erreur dans le finbd")
        reject(err);
      })
    });
  }

  get(id_user) {
    return new Promise((resolve, reject) => {
      console.log("obtention de l'utilisateur " + id_user)
      this.db.collection("users").findOne({
        _id : new BSON.ObjectId(id_user)
      })
      .then(res => {
        console.log(res)
        if(!res)
          reject()
        else
          resolve(res)
      })
      .catch(err => {
        reject()
      })
    });
  }

  getAll(){
    return new Promise((resolve, reject) => {
      const u = this.db.collection("users").find()
      if(u)
        resolve(u.toArray())
      else
        reject()
    });
  }


  login(login, password) {
    return new Promise((resolve, reject) => {
      this.db.collection("users").findOne({
        username : login,
        password : password
      })
      .then(res => {
        if(!res)
          reject()
        else
          resolve(res)
      })
      .catch(err => {
        reject()
      })
    });
  }

  accept(id_user){
    return new Promise((resolve, reject) => {
      this.db.collection("users").updateOne({
        _id : new BSON.ObjectId(id_user)
      }, {
        $set : {"validation": true} //Update
      })
      .then(res => {
        resolve(true)
      })
      .catch(err => {
        reject()
      })
    });
  }

  delete(id_user){
    return new Promise((resolve, reject) => {
      this.db.collection("users").deleteOne({
        _id : new BSON.ObjectId(id_user)
      })
      .then(res => {
        resolve(res)
      })
      .catch(err => {
        reject()
      })
    });
  }

  getLstEnAttente(){
    return new Promise((resolve, reject) => {
      const u = this.db.collection("users").find({
        validation: {$eq: false}
      })
      if(u)
        resolve(u.toArray())
      else
        reject()
    });
  }

  



}

exports.default = Users;

