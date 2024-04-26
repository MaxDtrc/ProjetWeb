import { useState } from "react";
import ListeMessages from "./ListeMessages";
import NouveauMessage from "./NouveauMessage";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:4000";

function PageFilDiscussion(props) {
  const [lstMessages, setLstMessages] = useState([]);

  async function update() {
    const canal = await axios.get("/api/canal/" + props.idCanal); // On récupère le canal

    const lst = canal.data.liste_messages; // On récupère la liste des messages du canal
    for (var i = 0; i < lst.length; i++) {
      try {
        const auteur = await axios.get("/api/user/" + lst[i].auteur);
        const pseudo = auteur.data.username;
        lst[i].auteur = pseudo;
      } catch (e) {
        lst[i].auteur = "<Deleted User>";
      }
    }
    setLstMessages(lst);
  }

  if (lstMessages.length == 0) update();

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
        <a
          href=""
          onClick={(e) => {
            props.setIdCanal(0);
            e.preventDefault();
            props.setPage("page_canaux");
          }}
        >
          Retour
        </a>
        <NouveauMessage ajouterMessage={ajouterMessage} />
        {lstMessages.length > 0 ? (
          <ListeMessages setPage={props.setPage} lstMessages={lstMessages} />
        ) : (
          <p>Aucun message trouvé</p>
        )}
      </div>
    </>
  );
}

export default PageFilDiscussion;
