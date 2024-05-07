import { useState } from "react";
import axios from "axios";
import ListeUtilisateurs from "./ListeUtilisateurs.jsx";
import "./style/users.css";

//Composant affichant la liste des utilisateurs à valider pour les administrateurs
function PageValidation(props) {
  const [lstUtilisateurs, setLstUtilisateurs] = useState([]); //Liste des utilisateurs à valider

  //Fonction de mise à jour du composant
  async function update() {
    console.log("PageValidation: mise à jour de la liste des utilisateurs")
    try {
      const res = await axios.get("/api/user/validation"); // On récupère la liste des Utilisateurs

      console.log("PageValidation: mise à jour de la liste des utilisateurs effectuée avec succès !")
      setLstUtilisateurs(res.data); //Mise à jour de la liste
    } catch (e) {
      //Erreur
      console.log("PageValidation: erreur dans l'obtention de la liste des utilisateurs");
    }
  }

  //Fonction d'acceptation d'un utilisateur
  function accept(id){
    console.log("PageValidation: demande d'acceptation d'un utilisateur ...")
    axios.post("/api/user/validation/" + id)
    .then(res => {
      //Validation effectuée
      console.log("PageValidation: validation effectuée !")
      update(); //Mise à jour
    })
    .catch(err => {
      console.log("PageValidation: erreur lors de la validation de l'utilisateur")
    });
  }

  function deny(id){
    console.log("PageValidation: demande de rejection d'un utilisateur ...")
    axios.delete("/api/user/" + id)
    .then(res => {
      //Rejection effectuée
      console.log("PageValidation: rejection effectuée !")
      update();//Mise à jour
    })
    .catch(err => {
      console.log("PageValidation: erreur lors de la rejection de l'utilisateur")
    });
  }

  //On met à jour la liste si elle est vide
  if (lstUtilisateurs.length == 0) update();

  //Affichage du composant
  return (
    <div id="liste_utilisateurs">
      <a
          id="retour"
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
