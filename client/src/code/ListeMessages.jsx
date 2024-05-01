import { useState } from "react";
import Message from "./Message.jsx";

function ListeMessages(props) {

  var i = 0;

  return (
    <>
      {[...props.lstMessages].reverse().map((msg) => (
        <Message
          key={i++}
          text={msg.text}
          id_auteur={msg.id_auteur}
          auteur={msg.auteur}
          date={msg.date}
          reply_auteur={msg.reply_auteur}
          reply_message={msg.reply_message}
          setPage={props.setPage}
          setReplyAuteur={props.setReplyAuteur}
          setReplyMessage={props.setReplyMessage}
          reply={props.reply}
          setIdProfil={props.setIdProfil}
        />
      ))}
    </>
  );
}

export default ListeMessages;
