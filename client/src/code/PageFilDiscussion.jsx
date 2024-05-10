import { useEffect, useState } from "react";
import ListeMessages from "./ListeMessages";
import NouveauMessage from "./NouveauMessage";
import {getListeMessages, idToName, idToPhoto} from "./utils.js"
import axios from "axios";

//Composant permettant d'afficher un fil de discussion
function PageFilDiscussion(props) {
  const [lstMessages, setLstMessages] = useState([]); //Liste des messages affichés
  const [replyId, setReplyId] = useState(""); //Id local du message auquel on répond
  const [replyAuteur, setReplyAuteur] = useState(""); //Id de l'auteur auquel on répond
  const [replyNomAuteur, setReplyNomAuteur] = useState(""); //Nom de l'auteur auquel on répond
  const [replyMessage, setReplyMessage] = useState(""); //Texte du message auquel on répond

  //Fonction de mise à jour de la liste des messages
  async function update() {
    console.log("PageFilDiscussion: mise à jour de la liste des messages ...")

    //Obtention de la liste des messages
    const lst = await getListeMessages(props.idCanal, (msg) => {return true}, false);

    //Mise à jour
    console.log("PageFilDiscussion: mise à jour effectuée !")
    await setLstMessages(lst);
  }

  //On met en bas après un refresh
  useEffect(() => {
    if(lstMessages != 0 && replyAuteur == ""){
      var scrollableDiv = document.getElementById("msg_scrollview");
      scrollableDiv.scrollTop = scrollableDiv.scrollHeight;
    }
  })

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
      <a
        id="retour"
        href=""
        onClick={(e) => {
          props.setIdCanal(0);
          e.preventDefault();
          props.setPage("page_canaux");
        }}
      >
        Retour
      </a>
      <div id="fil_discussion">
        <p id="msg_title">{props.nomCanal}</p>
        {lstMessages.length > 0 ? (
        <div id="msg_scrollview">
          <ListeMessages
            id_user={props.userId}
            admin={props.admin}
            setPage={props.setPage}
            lstMessages={lstMessages}
            setReplyAuteur={setReplyAuteur}
            setReplyMessage={setReplyMessage}
            setReplyNomAuteur={setReplyNomAuteur}
            setReplyId={setReplyId}
            deleteMessage={deleteMessage}
            setIdProfil={props.setIdProfil}
            reply={true}
          />
        </div>
        ) : (
          <p>Aucun message trouvé</p>
        )}
        {
          !props.canalDeleted ?
            <NouveauMessage
              ajouterMessage={ajouterMessage}
              replyAuteur={replyAuteur}
              replyMessage={replyMessage}
              replyNomAuteur={replyNomAuteur}
              setReplyAuteur={setReplyAuteur}
              setReplyMessage={setReplyMessage}
            /> : null 
        }
      </div>
    </>
  );
}

export default PageFilDiscussion;
