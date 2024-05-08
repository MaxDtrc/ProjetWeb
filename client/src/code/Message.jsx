import { useState } from "react";
import "./style/messages.css";
import def from "../assets/default.png";
import {formaterDate, idToName} from "./utils";

//Composant permettant d'afficher un message
function Message(props) {
  
  //Formatage de la date
  var date = props.date ? formaterDate(props.date) : "datenotfound";

  //Affichage du message: auteur, texte, date, réponse
  return (
    <>
      <div id="msg">
        <img id="msg_photo" src={props.photo} />

        <div id="msg_info">
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
          { props.idCanal && props.canal ?
            <a
              id="msg_canal"
              href=""
              onClick={(e) => {
                e.preventDefault();
                props.openCanal(props.idCanal, props.canalDeleted)
              }}
            >
              {" (" + props.canal + ")"}
            </a> : null
          }
        </div>
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
          props.reply && !props.deleted ?
          <button
            id="msg_repondre"
            title="Répondre"
            onClick={(e) => {
              props.setReplyNomAuteur(props.auteur)
              props.setReplyAuteur(props.id_auteur);
              props.setReplyMessage(props.text);
              props.setReplyId(props.id)
            }}
          >
            <i id="reply_icon" className="bi bi-reply"></i>

          </button> : null
        }
        {
          props.reply && !props.deleted && (props.admin || props.id_auteur == props.id_user) ?
          <button
            id="msg_delete"
            title="supprimer"
            onClick={(e) => {
              props.deleteMessage(props.id);
            }}
          >
            <i id="delete_icon" className="bi bi-trash"></i>

          </button> : null
        }
      </div>
    </>
  );
}

export default Message;
