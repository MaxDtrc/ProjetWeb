import { useState } from "react";
import ListeMessages from "./ListeMessages";
import NouveauMessage from "./NouveauMessage";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:4000";

function PageFilDiscussion(props) {
  const [lstMessages, setLstMessages] = useState([
    { text: "oui", auteur: "Laila", date: "21/03/2023 15:15" },
    { text: "non", auteur: "Maxime", date: "21/03/2023 15:15" },
    { text: "peut etre.", auteur: "Vincent", date: "21/03/2023 15:15" },
    { text: "Vous parlez trop", auteur: "Laura", date: "21/03/2023 15:15" },
  ]);

  /*axios.get('/api/message').then(res => {
        const msg = res.data;
        console.log(msg);
        setLstMessages([...lstMessages, msg])
    })*/

  function addToList(message) {
    setLstMessages([...lstMessages, message]);
  }

  return (
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
      <NouveauMessage />
      <ListeMessages lstMessages={lstMessages} />
    </div>
  );
}

export default PageFilDiscussion;
