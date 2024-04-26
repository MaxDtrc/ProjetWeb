import { useState } from "react";
import ListeMessages from "./ListeMessages";
import NouveauMessage from "./NouveauMessage";
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

    for (var i = 0; i < canaux.length; i++) {
      for (var j = 0; j < canaux[i].liste_messages.length; j++) {
        var msg = canaux[i].liste_messages[j];
        if (msg.text.includes(props.recherche)) {
          try {
            const auteur = await axios.get("/api/user/" + msg.auteur);
            const pseudo =
              auteur.data.username + " dans le canal " + canaux[i].titre;
            msg.auteur = pseudo;
          } catch (e) {
            msg.auteur = "<Deleted User>";
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
          <ListeMessages lstMessages={lstMessages} />
        ) : (
          <p>Aucun message trouvé</p>
        )}
      </div>
    </>
  );
}

export default PageRecherche;
