import { useState } from "react";
import ListeMessages from "./ListeMessages";
import {idToName, nameToId, idToPhoto, getListeMessages, stringToDate} from "./utils.js"
import axios from "axios";
import "./style/messages.css"

//Composant permettant d'afficher la page de recherche
function PageRecherche(props) {
  const [lstMessages, setLstMessages] = useState([]); //Liste des messages à afficher
  const [lastRecherche, setLastRecherche] = useState(""); //Dernière recherche effectuée

  //Fonction de mise à jour
  async function update() {
    console.log("PageRecherche: mise à jour de la liste des messages ...")

    //Nom de l'utilisateur recherché (recherche prefixée par @)
    var idSearchedUser = props.recherche[0] == "@" ? await nameToId(props.recherche.substring(1)) : ""; 

    //Intervalle de dates recherché (recherche au format "[dd/mm/aaaa-dd/mm/aaaa])
    var dateDebut = props.recherche[0] == "[" ? stringToDate(props.recherche.split("-")[0].substring(1)) : null
    var dateFin = props.recherche[0] == "[" ? stringToDate(props.recherche.split("-")[1].slice(0, -1)) : null

    //Condition de filtrage des messages
    const cond = (msg => {
      return (props.recherche[0] != "@" && props.recherche[0] != "[" && msg.text.toLowerCase().includes(props.recherche.toLowerCase()) && !msg.deleted) 
          || (props.recherche[0] == "[" && new Date(msg.date) >= dateDebut && new Date(msg.date) <= dateFin)
          || (props.recherche[0] == "@" && msg.auteur == idSearchedUser)
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
        <div id="recherche_scrollview">
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
      </div>
    </>
  );
}

export default PageRecherche;
