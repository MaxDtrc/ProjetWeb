import { useState } from "react";
import Information from "./Information.jsx";
import "./style/informations.css";
import axios from "axios";
axios.defaults.baseURL = "http://localhost:4000";

function LeftSide() {
  const [infos, setInfos] = useState([]);

  async function update() {
    //Obtention des utilisateurs et des canaux
    const canaux = (await axios.get("/api/canal/")).data;
    const users = (await axios.get("api/user")).data;

    //Création de la liste
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

    //Ajout des infos
    var indexUsers = 0
    var indexCanaux = 0;
    while(listeInfos.length<5 && (indexUsers < users.length || indexCanaux < canaux.length)) {
      if (indexCanaux >= canaux.length || users[indexUsers].date > canaux[indexCanaux].date) {
        const u = users[indexUsers];
        if(u.validation){
          listeInfos.push({text: u.username + " a rejoint l'association !", date: u.date});
        }   
        indexUsers++; 
      } else {
        const c = canaux[indexCanaux];
        var name = (await axios.get("/api/user/" + c.id_auteur.toString())).data.username;
        listeInfos.push({text: name + " a ouvert le canal : " + c.titre, date: c.date});
        indexCanaux++;
      }
    }

    //Update de la liste
    setInfos(listeInfos);
  }

  if(infos.length == 0){
    update();
  }

  return (
    <div id="left_side">
      {infos.map((inf) => (
        <Information
          text={inf.text}
          date={inf.date}
        />
      ))}
    </div>
  );
}

export default LeftSide;
