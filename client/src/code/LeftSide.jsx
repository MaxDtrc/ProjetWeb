import { useState } from "react";
import Information from "./Information.jsx";
import "./style/informations.css";
import axios from "axios";
import { idToName } from "./utils.js";

//Composant gérant la barre de notifications à gauche de l'écran
function LeftSide() {
  const [infos, setInfos] = useState([]); //Liste des notifications à afficher

  //Fonction de mise à jour de l'affichage
  async function update() {
    
    //Obtention des canaux
    var canaux;
    try {
      canaux = (await axios.get("/api/canal/")).data;
      console.log("LeftSide: Liste des canaux obtenue")
    }
    catch(e){
      console.log("LeftSide: Erreur dans l'obtention de la liste des canaux")
      return;
    }
    
    //Obtention de la liste des utilisateurs
    var users;
    try {
      users = (await axios.get("api/user")).data;
      console.log("LeftSide: Liste des utilisateurs obtenue")
    }
    catch(e){
      console.log("LeftSide: Erreur dans l'obtention de la liste des utilisateurs")
      return;
    }
    

    //Création de la liste des informations
    var listeInfos = [];

    //Tri des canaux
    canaux.sort((a, b) => {
      var dateA = new Date(a.date);
      var dateB = new Date(b.date);
      return dateB - dateA;
    });

    //Tri des utilisateurs
    users.sort((a, b) => {
      var dateA = new Date(a.date);
      var dateB = new Date(b.date);
      return dateB - dateA;
    });

    //Ajout des dernières infos (jusqu'à 5 maximum)
    var indexUsers = 0
    var indexCanaux = 0;
    const nb_infos = 5;
    while(listeInfos.length < nb_infos && (indexUsers < users.length || indexCanaux < canaux.length)) {
      if (indexCanaux >= canaux.length || users[indexUsers].date > canaux[indexCanaux].date) {
        const u = users[indexUsers]; //Obtention de l'utilisateur
        if(u.validation){ //L'utilisateur a bien été validé
          listeInfos.push({text: u.username + " a rejoint l'association !", date: u.date});
        }   
        indexUsers++; 
      } else {
        const c = canaux[indexCanaux]; //Obtention du canal
        var name = (await idToName(c.id_auteur.toString())) //Obtention du nom de l'auteur
        listeInfos.push({text: name + " a ouvert le canal : " + c.titre, date: c.date});
        indexCanaux++;
      }
    }

    //Mise à jour de la liste des informations (et refresh du composant)
    console.log("LeftSide: liste des notifications mise à jour !")
    setInfos(listeInfos);
  }

  //Si la liste est vide, on appelle la fonction d'update
  if(infos.length == 0){
    update();
  }

  var i = 0; //Identifiant pour les clefs des éléments de la liste

  //Affichage du composant
  return (
    <>
      <div id="left_side">
        <div id="info_top">
          <p id="info_title">Notifications</p>
          <button
              id="info_refresh"
              title="Rafraichir"
              onClick={(e) => {
                update();
              }}
            >
              <i id="refresh_icon" className="bi bi-arrow-clockwise"></i>
          </button>
        </div>
        {infos.map((inf) => (
          <Information
            key={i++}
            text={inf.text}
            date={inf.date}
          />
        ))}
      </div>
    </>
  );
}

export default LeftSide;
