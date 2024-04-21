import { useState } from "react";
import ListeMessages from "./ListeMessages";
import NouveauMessage from "./NouveauMessage";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:4000";

function PageFilDiscussion(props) {
  /*const [lstMessages, setLstMessages] = useState([
    { text: "oui", auteur: "Laila", date: "21/03/2023 15:15" },
    { text: "non", auteur: "Maxime", date: "21/03/2023 15:15" },
    { text: "peut etre.", auteur: "Vincent", date: "21/03/2023 15:15" },
    { text: "Vous parlez trop", auteur: "Laura", date: "21/03/2023 15:15" },
  ]);*/

  const [lstMessages, setLstMessages] = useState([]);

  async function update(){
    const canal = await axios.get("/api/canal/" + props.idCanal); // On récupère le canal
    const lst = canal.data.liste_messages; // On récupère la liste des messages du canal
    for(var i=0; i<lst.length; i++){
      const auteur = await axios.get("/api/user/" + lst[i].auteur);
      const pseudo = auteur.data.username;
      lst[i].auteur = pseudo;
    }
    setLstMessages(lst);
  }

  function ajouterMessage(msg){
    axios.put("/api/canal/" + props.idCanal, {text: msg, auteur: "662404d3f52a681a818e71c2"})
    .then(res => {update()})
    .catch(err => {console.log(err)});
  }

  return (
    <>
    <div id="fil_discussion">
      <a
        href=""
        onClick={(e) => {
          e.preventDefault();
          props.setPage("page_canaux");
        }}
      >
        Retour
      </a>
      <NouveauMessage ajouterMessage={ajouterMessage}/>
      <ListeMessages lstMessages={lstMessages} />
    </div>
    </>
  );
  
}

export default PageFilDiscussion;
