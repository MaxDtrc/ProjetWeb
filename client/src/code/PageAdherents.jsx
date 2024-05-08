import { useState } from "react";
import axios from "axios";
import ListeUtilisateurs from "./ListeUtilisateurs.jsx";
import "./style/users.css";

//Composant affichant la liste des utilisateurs à valider pour les administrateurs
function PageAdherents(props) {
  const [lstAValider, setLstAValider] = useState([]); //Liste des utilisateurs à valider
  const [lstAdherents, setLstAdherents] = useState([]); //Liste des utilisateurs à valider

  //Fonction de mise à jour du composant
  async function update() {
    console.log("PageAdherents: mise à jour de la liste des utilisateurs")

    var lstEnAttente = [] //Liste des utilisateurs en attente
    var lstValide = [] //Liste des utilisateurs inscrits

    try {
      const res = (await axios.get("/api/user/")).data; // On récupère la liste des Utilisateurs
      for(var i = 0; i < res.length; i++){
        if(res[i].validation)
          lstValide.push(res[i])
        else
          lstEnAttente.push(res[i])
      }

      console.log("PageAdherents: mise à jour de la liste des utilisateurs effectuée avec succès !")
      setLstAValider(lstEnAttente) //Mise à jour de la liste des utilisateurs en attente
      setLstAdherents(lstValide) //Mise à jour de la liste des adhérents
    } catch (e) {
      //Erreur
      console.log("PageAdherents: erreur dans l'obtention de la liste des utilisateurs");
    }
  }

  //Fonction d'acceptation d'un utilisateur
  function accept(id){
    console.log("PageAdherents: demande d'acceptation d'un utilisateur ...")
    axios.post("/api/user/validation/" + id)
    .then(res => {
      //Validation effectuée
      console.log("PageAdherents: validation effectuée !")
      update(); //Mise à jour
    })
    .catch(err => {
      console.log("PageAdherents: erreur lors de la validation de l'utilisateur")
    });
  }

  function deny(id){
    console.log("PageAdherents: demande de rejection d'un utilisateur ...")
    axios.delete("/api/user/" + id)
    .then(res => {
      //Rejection effectuée
      console.log("PageAdherents: rejection effectuée !")
      update();//Mise à jour
    })
    .catch(err => {
      console.log("PageAdherents: erreur lors de la rejection de l'utilisateur")
    });
  }

  //On met à jour la liste si elle est vide
  if (lstAValider.length == 0 && lstAdherents.length == 0) update();

  //Affichage du composant
  return (
    <>
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
      {
        lstAValider.length != 0 ?
        <div id="liste_en_attente">
          <p id="usr_title">Adhérents en attente de validation</p>
          <ListeUtilisateurs lstUtilisateurs={lstAValider} accept={accept} deny={deny} valide={false}/>
        </div> : null
      }
      <div id="liste_adherents">
      <p id="usr_title">Liste des adhérents</p>
      <ListeUtilisateurs valide={true} lstUtilisateurs={lstAdherents} />
      </div>
    </>
  );
}

export default PageAdherents;
