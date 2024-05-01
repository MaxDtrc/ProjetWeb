import { useState } from "react";
import axios from "axios";
import ListeUtilisateurs from "./ListeUtilisateurs.jsx";
import "./style/users.css";

function PageValidation(props) {
  const [lstUtilisateurs, setLstUtilisateurs] = useState([]);

  async function update() {
    console.log("màj")
    try {
      const res = await axios.get("/api/user/validation"); // On récupère la liste des Utilisateurs
      setLstUtilisateurs(res.data); //Mise à jour de la liste
    } catch (e) {
      console.log("Erreur dans l'obtention de la liste des utilisateurs");
    }
  }

  function accept(id){
    axios.post("/api/user/validation/" + id).then(res => {
      update();
    });
  }

  function deny(id){
    axios.delete("/api/user/" + id).then(res => {
      update();
    })
  }

  if (lstUtilisateurs.length == 0) {
    update(); //On met à jour la liste si elle est vide (à l'ouverture de la page)
  }

  return (
    <div id="liste_utilisateurs">
      <a
          href=""
          onClick={(e) => {
            e.preventDefault();
            props.setPage("page_canaux");
          }}
        >
          Retour
      </a>
      <p id="usr_title">Adhérents en attente de validation</p>
      <ListeUtilisateurs lstUtilisateurs={lstUtilisateurs} accept={accept} deny={deny}/>
    </div>
  );
}

export default PageValidation;
