import { useState } from "react";
import "./style/messages.css";
import def from "../assets/default.png";
import {formaterDate} from "./utils";

function Message(props) {
  var date = "";
  if (props.date) {
    date = formaterDate(props.date);
  } else {
    date = "date";
  }

  return (
    <>
      <div id="msg">
        <img id="msg_photo" src={def} />
        <a
          id="msg_auteur"
          href=""
          onClick={(e) => {
            e.preventDefault();
            props.setIdProfil(props.id_auteur)
            props.setPage("page_profil");
          }}
        >
          {props.auteur ? props.auteur : "auteur"}
        </a>
        { props.reply_auteur && props.reply_message.length > 0 ?
          <div id="msg_reply_box">
            <i id="reply_icon_box" className="bi bi-reply"></i>
            <p id="msg_reply_author"><span id="auteur">{props.reply_auteur}</span> à écrit:</p>
            <p id="msg_reply">{props.reply_message}</p>
          </div> : null
        }
        <p id="msg_contenu">{props.text ? props.text : "texte"}</p>
        <p id="msg_date">{date}</p>
        {
          props.reply ?
          <button
            id="msg_repondre"
            title="Répondre"
            onClick={(e) => {
              props.setReplyAuteur(props.id_auteur);
              props.setReplyMessage(props.text);
            }}
          >
            <i id="reply_icon" class="bi bi-reply"></i>

          </button> : null
        }
      </div>
    </>
  );
}

export default Message;
