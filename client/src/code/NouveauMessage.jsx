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
    <>
      <input onChange={(e) => setNewMessage(e.target.value)} id="nv_msg" />
      <button onClick={addMessage} title="Envoyer"><i className="bi bi-send"></i></button>
      {props.replyMessage.length > 0 ? (
        <>
          <p>En réponse à {props.replyAuteur}</p>
          <button
            onClick={(e) => {
              e.preventDefault();
              props.setReplyAuteur("");
              props.setReplyMessage("");
            }}
          >Annuler</button>
        </>
      ) : null}
    </>
  );
}

export default NouveauMessage;
