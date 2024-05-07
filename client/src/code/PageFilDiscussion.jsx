import { useState } from "react";
import ListeMessages from "./ListeMessages";
import NouveauMessage from "./NouveauMessage";
import {idToName, idToPhoto} from "./utils.js"
import axios from "axios";

//Composant permettant d'afficher un fil de discussion
function PageFilDiscussion(props) {
  const [lstMessages, setLstMessages] = useState([]); //Liste des messages affichés
  const [replyId, setReplyId] = useState(""); //Id local du message auquel on répond
  const [replyAuteur, setReplyAuteur] = useState(""); //Id de l'auteur auquel on répond
  const [replyMessage, setReplyMessage] = useState(""); //Texte du message auquel on répond

  //Fonction de mise à jour de la liste des messages
  async function update() {
    console.log("PageFilDiscussion: mise à jour de la liste des messages ...")
    var canal;
    try {
      canal = await axios.get("/api/canal/" + props.idCanal); // On récupère le canal
    }
    catch(e){
      //Erreur pendant la requête d'obtention au serveur
      console.log("PageFilDiscussion: erreur lors de l'obtention du canal")
      return;
    }
    
    const lst = canal.data.liste_messages; // On récupère la liste des messages du canal
    for (var i = 0; i < lst.length; i++) {
      lst[i].id = i; //On ajoute l'id local du message (correspondant à son placement dans la liste)
      lst[i].id_auteur = lst[i].auteur; //On copie l'id de l'auteur
      lst[i].auteur = await idToName(lst[i].auteur); //On remplace l'id de l'auteur par son nom
      if(!lst[i].reply_auteur || !lst[i].reply_message){ 
        lst[i].reply_auteur = ""; lst[i].reply_message = ""; //Si le message n'est en réponse à aucun, on rempli des champs vides
      }else{
        lst[i].reply_auteur = await idToName(lst[i].reply_auteur); //On remplace l'id de l'auteur du message d'origine par son nom
      }
      const photo = await idToPhoto(lst[i].id_auteur)
      console.log("photo = " + photo)
      lst[i].photo = photo;
    }

    //Mise à jour de la liste
    console.log("PageFilDiscussion: mise à jour effectuée !")
    setLstMessages(lst);
  }

  //Fonction de suppression d'un message
  function deleteMessage(id_message){
    console.log("PageFilDiscussion: demande de supression du message " + id_message)
    axios.delete("/api/canal/" + props.idCanal + "/messages/" + id_message)
    .then(r => {
      //Supression du message effectuée
      console.log("PageFilDiscussion: suppression du message effectuée")
      update(); //Mise à jour de la liste
    })
    .catch(err => {
      //Erreur
      console.log("PageFilDiscussion: erreur lors de la suppression du message")
    })
  }

  //Si la liste des messages est vide, on appelle la fonction de mise à jour
  if (lstMessages.length == 0) update();

  //Fonctiond d'ajout de message
  function ajouterMessage(msg) {
    console.log("PageFilDiscussion: demande d'ajout du message")
    axios
      .put("/api/canal/" + props.idCanal, {
        text: msg,
        id_auteur: props.userId,
        reply_auteur: replyAuteur,
        reply_message: replyMessage,
        reply_id: replyId
      })
      .then((res) => {
        console.log("PageFilDiscussion: ajout du message effectué")
        setReplyAuteur("") //On vide l'id de l'auteur auquel on répondait
        setReplyMessage("") //On vide le contenu du message auquel on répondait
        setReplyId(-1) //On vide l'id du message auquel on répondait
        update(); //Mise à jour de la liste
      })
      .catch((err) => {
        //Erreur
        console.log("PageFilDiscussion: erreur lors de l'ajout du message")
        console.log(err);
      });
  }

  //Affichage du composant: formulaire de nouveau message + liste des messages
  return (
    <>
      <div id="fil_discussion">
        <a
          href=""
          onClick={(e) => {
            props.setIdCanal(0);
            e.preventDefault();
            props.setPage("page_canaux");
          }}
        >
          Retour
        </a>
        <NouveauMessage
          ajouterMessage={ajouterMessage}
          replyAuteur={replyAuteur}
          replyMessage={replyMessage}
          setReplyAuteur={setReplyAuteur}
          setReplyMessage={setReplyMessage}
        />
        {lstMessages.length > 0 ? (
          <ListeMessages
            id_user={props.userId}
            admin={props.admin}
            setPage={props.setPage}
            lstMessages={lstMessages}
            setReplyAuteur={setReplyAuteur}
            setReplyMessage={setReplyMessage}
            setReplyId={setReplyId}
            deleteMessage={deleteMessage}
            setIdProfil={props.setIdProfil}
            reply={true}
          />
        ) : (
          <p>Aucun message trouvé</p>
        )}
      </div>
    </>
  );
}

export default PageFilDiscussion;
