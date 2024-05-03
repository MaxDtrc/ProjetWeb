import { useState } from "react";
import ListeMessages from "./ListeMessages";
import NouveauMessage from "./NouveauMessage";
import {idToName} from "./utils.js"
import axios from "axios";

function PageFilDiscussion(props) {
  const [lstMessages, setLstMessages] = useState([]);

  //Réponses
  const [replyId, setReplyId] = useState("");
  const [replyAuteur, setReplyAuteur] = useState("");
  const [replyMessage, setReplyMessage] = useState("");

  async function update() {
    const canal = await axios.get("/api/canal/" + props.idCanal); // On récupère le canal

    const lst = canal.data.liste_messages; // On récupère la liste des messages du canal
    for (var i = 0; i < lst.length; i++) {
      lst[i].id = i;
      lst[i].id_auteur = lst[i].auteur; //On copie l'id de l'auteur
      lst[i].auteur = await idToName(lst[i].auteur);
      if(!lst[i].reply_auteur || !lst[i].reply_message){
        lst[i].reply_auteur = ""; lst[i].reply_message = "";
      }else{
        lst[i].reply_auteur = await idToName(lst[i].reply_auteur);
      }
    }
    setLstMessages(lst);
  }

  function deleteMessage(id_message){
    axios.delete("/api/canal/" + props.idCanal + "/messages/" + id_message)
    .then(r => {
      console.log("message supprimé")
      update();
    })
    .catch(err => {
      console.log("erreur dans la suppression")
    })
  }

  if (lstMessages.length == 0) update();

  function ajouterMessage(msg) {
    axios
      .put("/api/canal/" + props.idCanal, {
        text: msg,
        id_auteur: props.userId,
        reply_auteur: replyAuteur, //TODO mettre id et pas nom en dur (car ne change pas même si le pseudo change)
        reply_message: replyMessage,
        reply_id: replyId
      })
      .then((res) => {
        setReplyAuteur("")
        setReplyMessage("") 
        update();
      })
      .catch((err) => {
        console.log(err);
      });
  }

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
