import { useState } from "react";
import Message from "./Message.jsx";

function ListeMessages(props) {

  var i = 0;

  return (
    <>
      {[...props.lstMessages].reverse().map((msg) => (
        <Message
          key={i++}
          id_user={props.id_user}
          admin={props.admin}
          id={msg.id}
          text={msg.text}
          id_auteur={msg.id_auteur}
          auteur={msg.auteur}
          date={msg.date}
          reply_auteur={msg.reply_auteur}
          reply_message={msg.reply_message}
          setPage={props.setPage}
          setReplyAuteur={props.setReplyAuteur}
          setReplyMessage={props.setReplyMessage}
          setReplyId={props.setReplyId}
          deleteMessage={props.deleteMessage}
          deleted={msg.deleted}
          reply={props.reply}
          setIdProfil={props.setIdProfil}
        />
      ))}
    </>
  );
}

export default ListeMessages;
