import { useState } from 'react';
import "./style/messages.css"
import momo from "../assets/momo.png"

function Message(props) {
    return (
      <div id="msg">
        <img id="msg_photo" src={momo}/>
        <p id='msg_auteur'>{props.auteur?props.auteur:"auteur"}</p>
        <p id='msg_contenu'>{props.text?props.text:"texte"}</p>
        <p id='msg_date'>{props.date?props.date:"date"}</p>
      </div>
    )
  }


export default Message