import { useState } from "react";

//Composant permettant d'ajouter un nouveau message
function NouveauMessage(props) {
  const [newMessage, setNewMessage] = useState(""); //Contenu du message en cours de saisie

  //Fonction permettant de demander l'ajout du message
  const addMessage = (e) => {
    console.log("Message: Demande d'ajout du message")
    props.ajouterMessage(newMessage);
  };

  //Affichage du formulaire : contenu et bouton de validation
  return (
    <form id="zone_nv_msg">
      <input
        placeholder="Nouveau message ..."
        onChange={(e) => setNewMessage(e.target.value)}
        id="nv_msg"
      />
      <button
        type="submit"
        onClick={(e) => {
          e.preventDefault();
          addMessage();
          document.getElementById("nv_msg").value = "";
        }}
        title="Envoyer"
      >
        <i className="bi bi-send"></i>
      </button>
      {props.replyMessage.length > 0 ? (
        <div id="reply_nv_msg">
          En réponse à {props.replyNomAuteur}
          <button
            onClick={(e) => {
              e.preventDefault();
              props.setReplyAuteur("");
              props.setReplyMessage("");
            }}
          >
            Annuler
          </button>
        </div>
      ) : null}
    </form>
  );
}

export default NouveauMessage;
