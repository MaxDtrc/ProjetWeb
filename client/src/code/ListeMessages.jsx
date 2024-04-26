import { useState } from "react";
import Message from "./Message.jsx";

function ListeMessages(props) {
  return (
    <>
      {[...props.lstMessages].reverse().map((msg) => (
        <Message
          text={msg.text}
          auteur={msg.auteur}
          date={msg.date}
          setPage={props.setPage}
        />
      ))}
    </>
  );
}

export default ListeMessages;
