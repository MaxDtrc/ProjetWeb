import { useState } from "react";
import axios from "axios";

//Composant permettant de créer un nouveau canal
function NouveauCanal(props) {
  const [newCanal, setNewCanal] = useState(""); //Nom du nouveau canal en cours de saisie

  //Fonction de création du canal
  const createCanal = (e) => {
    console.log("NouveauCanal: demande de création du nouveau canal")
    axios
      .put("/api/canal", { //Requête d'ajout du nouveau canal
        titre: newCanal,
        id_auteur: props.userId,
        isPrivate: props.isAdmin ? document.getElementById("private").checked : false
      })
      .then((res) => {
        if (res.data) {
          //Canal ajouté, on refresh la liste
          console.log("NouveauCanal: Canal ajouté avec succès");
          props.update();
        }
      })
      .catch(err => {
        //Erreur lors de l'ajout du nouveau canal
        console.log("NouveauCanal: Erreur lors de la création du canal")
      });
  };

  //Affichage du composant: champ pour le titre, bouton de validation et case pour le définir comme privé
  return (
    <form>
      <input onChange={(e) => setNewCanal(e.target.value)} id="nv_cnl" placeholder="Nouveau canal ..."/>
      <button
        type="submit"
        id="creer_canal"
        onClick={(e) => {
          e.preventDefault();
          createCanal();
          document.getElementById("nv_cnl").value = ""
        }}
      >
        <p className="text">Créer le canal</p>
      </button>
      {props.isAdmin ? (
        <>
          <label htmlFor="private"> Privé: </label>
          <input id="private" type="checkbox"></input>
        </>
      ) : null}
    </form>
  );
}

export default NouveauCanal;
