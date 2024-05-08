import { useState } from "react";
import ListeMessages from "./ListeMessages";
import {idToName, nameToId, idToPhoto, getListeMessages} from "./utils.js"
import axios from "axios";

//Composant permettant d'afficher la page de recherche
function PageRecherche(props) {
  const [lstMessages, setLstMessages] = useState([]); //Liste des messages à afficher
  const [lastRecherche, setLastRecherche] = useState(""); //Dernière recherche effectuée

  //Fonction de mise à jour
  async function update() {
    console.log("PageRecherche: mise à jour de la liste des messages ...")

    //Nom de l'utilisateur recherché
    var idSearchedUser = ""; 
    if(props.recherche[0] == "@"){
      idSearchedUser = await nameToId(props.recherche.substring(1)); //Récupération de l'id à partir du nom
    }

    //Condition de filtrage des messages
    const cond = (msg => {
      return (props.recherche[0] != "@" && msg.text.toLowerCase().includes(props.recherche.toLowerCase()) && !msg.deleted) || (props.recherche[0] == "@" && msg.auteur == idSearchedUser)
    })
    
    //Obtention de la liste des messages
    const lst = await getListeMessages(props.idCanal, cond, true);

    //Mise à jour de la dernière recherche effectuée
    setLastRecherche(props.recherche);

    //Mise à jour de la liste des messages
    setLstMessages(lst);
  }

  //On met à jour si la liste est vide ou que le contenu de la recherche a changé
  if (lstMessages.length == 0 || props.recherche != lastRecherche) {
    update();
  }

  //Affichage du composant (liste des messages correspondants à la recherche)
  return (
    <>
      <div id="fil_discussion">
        {lstMessages.length > 0 ? (
          <ListeMessages
            openCanal={props.openCanal}
            setPage={props.setPage}
            lstMessages={[...lstMessages].reverse()}
            reply={false}
            setIdProfil={props.setIdProfil}
          />
        ) : (
          <p>Aucun message trouvé</p>
        )}
      </div>
    </>
  );
}

export default PageRecherche;
