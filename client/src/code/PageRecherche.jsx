import { useState } from "react";
import ListeMessages from "./ListeMessages";
import {idToName, nameToId} from "./utils.js"
import axios from "axios";

//Composant permettant d'afficher la page de recherche
function PageRecherche(props) {
  const [lstMessages, setLstMessages] = useState([]); //Liste des messages à afficher
  const [lastRecherche, setLastRecherche] = useState(""); //Dernière recherche effectuée

  //Fonction de mise à jour
  async function update() {
    console.log("PageRecherche: mise à jour de la liste des messages ...")

    var lst = []; //Création de la liste des messages
    var canaux = []; //Création de la liste des canaux

    try{
      if (props.idCanal != 0) {
        //On est dans un canal, on ne recherche que les messages de ces canaux
        canaux = [(await axios.get("/api/canal/" + props.idCanal)).data]; // On récupère le canal sur lequel on est
      } else {
        //On recherche les messages de tous les canaux
        canaux = (await axios.get("/api/canal/")).data; // On récupère tous les canaux
      }
    }
    catch(e){
      //Erreur
      console.log("PageRecherche: Erreur lors de l'obtention des canaux")
      return;
    }
    
    var idSearchedUser = ""; //Nom de l'utilisateur recherché

    //On recherche un utilisateur en commençant la recherche par "@"
    if(props.recherche[0] == "@"){
      idSearchedUser = await nameToId(props.recherche.substring(1)); //Récupération de l'id à partir du nom
    }

    //Construction de la liste
    for (var i = 0; i < canaux.length; i++) {
      for (var j = 0; j < canaux[i].liste_messages.length; j++) {

        var msg = canaux[i].liste_messages[j]; //Récupération du message

        if ((props.recherche[0] != "@" && msg.text.toLowerCase().includes(props.recherche.toLowerCase()) && !msg.deleted) || (props.recherche[0] == "@" && msg.auteur == idSearchedUser)) {
          //Le message correspond aux critères de recherche
          msg.id_auteur = msg.auteur; //On copie l'id de l'auteur
          msg.auteur = await idToName(msg.auteur); //On remplace l'id de l'auteur par son nom
          msg.auteur = msg.auteur + " dans le canal " + canaux[i].titre; //Ajout de l'information du canal au nom de l'auteur
          
          //Informations s'il s'agit d'une réponse
          if(!msg.reply_auteur || !msg.reply_message){
            msg.reply_auteur = ""; msg.reply_message = "";
          }else{
            msg.reply_auteur = await idToName(msg.reply_auteur)
          }

          //On ajoute le message à la liste
          lst.push(msg);
        }
      }
    }

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
          <ListeMessages lstMessages={lstMessages} reply={false} />
        ) : (
          <p>Aucun message trouvé</p>
        )}
      </div>
    </>
  );
}

export default PageRecherche;
