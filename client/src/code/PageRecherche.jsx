import { useState } from "react";
import ListeMessages from "./ListeMessages";
import NouveauMessage from "./NouveauMessage";
import {idToName, nameToId} from "./utils.js"
import axios from "axios";

axios.defaults.baseURL = "http://localhost:4000";

function PageRecherche(props) {
  const [lstMessages, setLstMessages] = useState([]);
  const [lastRecherche, setLastRecherche] = useState("");

  async function update() {
    var lst = [];

    var canaux = [];
    console.log("recherche dans le canal " + props.idCanal);
    if (props.idCanal != 0) {
      canaux = [(await axios.get("/api/canal/" + props.idCanal)).data]; // On récupère le canal sur lequel on est
    } else {
      canaux = (await axios.get("/api/canal/")).data; // On récupère tous les canaux
    }

    var idSearchedUser = ""; //Nom de l'utilisateur recherché
    if(props.recherche[0] == "@"){
      idSearchedUser = await nameToId(props.recherche.substring(1));
    }

    for (var i = 0; i < canaux.length; i++) {
      for (var j = 0; j < canaux[i].liste_messages.length; j++) {
        var msg = canaux[i].liste_messages[j];

        if ((props.recherche[0] != "@" && msg.text.includes(props.recherche)) || (props.recherche[0] == "@" && msg.auteur == idSearchedUser)) {
          msg.id_auteur = msg.auteur; //On copie l'id de l'auteur
          msg.auteur = await idToName(msg.auteur);
          msg.auteur = msg.auteur + " dans le canal " + canaux[i].titre;
          if(!msg.reply_auteur || !msg.reply_message){
            msg.reply_auteur = ""; msg.reply_message = "";
          }else{
            msg.reply_auteur = await idToName(msg.reply_auteur)
          }
          lst.push(msg);
        }
      }
    }
    setLastRecherche(props.recherche);
    setLstMessages(lst);
  }

  if (lstMessages.length == 0 || props.recherche != lastRecherche) {
    update();
  }

  function ajouterMessage(msg) {
    axios
      .put("/api/canal/" + props.idCanal, {
        text: msg,
        id_auteur: props.userId,
      })
      .then((res) => {
        update();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <>
      <div id="fil_discussion">
        {lstMessages.length > 0 ? (
          <ListeMessages lstMessages={lstMessages} reply={false} />
        ) : (
          <p>Aucun message trouvé</p>
        )}
      </div>
    </>
  );
}

export default PageRecherche;
