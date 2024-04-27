import { useState } from "react";
import "./style/messages.css";
import def from "../assets/default.png";
import reply from "../assets/reply.png";
import formaterDate from "./utils";

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
            props.setPage("page_profil");
          }}
        >
          {props.auteur ? props.auteur : "auteur"}
        </a>
        <p id="msg_contenu">{props.text ? props.text : "texte"}</p>
        <p id="msg_date">{date}</p>
        <button
          id="msg_repondre"
          title="Répondre"
          onClick={(e) => console.log("reply")}
        >
          <img id="reply_icon" src={reply} />
        </button>
      </div>
    </>
  );
}

export default Message;
