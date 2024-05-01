import { useState } from "react";
import axios from "axios";

function NouveauMessage(props) {
  const [newMessage, setNewMessage] = useState("");

  const buttonEvt = (e) => {
    props.ajouterMessage(newMessage);
  };

  return (
    <>
      <input onChange={(e) => setNewMessage(e.target.value)} id="nv_msg" />
      <button onClick={buttonEvt} title="Envoyer"><i class="bi bi-send"></i></button>
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
