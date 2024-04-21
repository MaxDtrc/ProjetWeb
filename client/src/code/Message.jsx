import { useState } from 'react';
import "./style/messages.css"
import momo from "../assets/momo.png"
import reply from "../assets/reply.png"

function Message(props) {
  return (
      <>
        <div id="msg">
          <img id="msg_photo" src={momo}/>
          <p id='msg_auteur'>{props.auteur?props.auteur:"auteur"}</p>
          <p id='msg_contenu'>{props.text?props.text:"texte"}</p>
          <p id='msg_date'>{props.date?props.date:"date"}</p>
          <button id='msg_repondre' title="Répondre" onClick={(e) => console.log("reply")}>
            <img id = "reply_icon" src= {reply}  />
          </button>
        </div>
      </>
   )
  }


export default Message