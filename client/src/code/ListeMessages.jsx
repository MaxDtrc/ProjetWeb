import { useState } from "react";
import Message from "./Message.jsx";

//Composant permettant d'afficher une liste de messages
function ListeMessages(props) {

  var i = 0; //Identifiant pour les clefs des éléments de la liste

  //Affichage de la liste des messages
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
          photo={msg.photo}
        />
      ))}
    </>
  );
}

export default ListeMessages;
