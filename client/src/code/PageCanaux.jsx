import { useState } from "react";
import NouveauCanal from "./NouveauCanal";
import ListeCanaux from "./ListeCanaux";
import axios from "axios";
import {idToName} from "./utils.js"

//Composant gérant l'affichage de la page de sélection des canaux
function PageCanaux(props) {
  const [lstCanaux, setLstCanaux] = useState([]); //Liste des canaux à afficher

  //Fonction de mise à jour de la liste
  async function update() {
    console.log("PageCanaux: mise à jour de la liste des canaux ...")
    try {
      var lst = [] //Création de la liste
      const res = await axios.get("/api/canal"); // On récupère la liste des canaux

      for (var i = 0; i < res.data.length; i++) {
        if(props.admin || (!res.data[i].isPrivate && !res.data[i].deleted)){ //Si le canal est publique ou qu'on est admin, on l'affiche
          res.data[i].auteur = (await idToName(res.data[i].id_auteur)); //On remplace l'id par le nom dans le resultat
          res.data[i].titre += (res.data[i].isPrivate ? " (privé) " : "") + (res.data[i].deleted ? " (supprimé) " : "") //On indique si le canal est privé/supprimé
          lst.push(res.data[i]) //Ajout du canal à la liste à afficher
        }
      }

      //Mise à jour de la liste
      console.log("PageCanaux: mise à jour effectuée !")
      setLstCanaux(lst); 
    } catch (e) {
      //Erreur lors de la création de la liste
      console.log("PageCanaux: erreur lors de la mise à jour de la liste des canaux");
    }
  }

  //On met à jour la liste si elle est vide
  if (lstCanaux.length == 0) update(); 
    
  //Fonction d'ouverture d'un canal
  function openCanal(id, deleted) {
    props.setIdCanal(id); //On change l'id du canal ouvert
    props.setCanalDeleted(deleted); //On indique si le canal est supprimé ou non
    props.setPage("fil_discussion"); //On change la page sur laquelle on est
  }

  function deleteCanal(id){
    axios.delete("/api/canal/" + id)
    .then( res => {
      console.log("PageCanaux: canal supprimé avec succès");
      update();
    })
    .catch(err => {
      //Erreur
      console.log("PageCanaux: erreur dans la suppression du canal")
    })
  }

  //Affichage du composant: formulaire de création d'un canal et liste des canaux
  return (
    <div id="liste_canaux">
      <NouveauCanal userId={props.userId} update={update} isAdmin = {props.admin}/>
      <ListeCanaux
        lstCanaux={lstCanaux}
        userId={props.userId}
        admin={props.admin}
        openCanal={openCanal}
        setPage={props.setPage}
        setIdProfil={props.setIdProfil}
        deleteCanal={deleteCanal}
      />
    </div>
  );
}

export default PageCanaux;
