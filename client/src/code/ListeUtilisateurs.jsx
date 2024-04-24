import { useState } from "react";
import Utilisateur from "./Utilisateur.jsx";

function ListeUtilisateurs(props) {
  return (
    <>
      {[...props.lstUtilisateurs].reverse().map((usr) => (
        <Utilisateur username={usr.username} date={usr.date} />
      ))}
    </>
  );
}

export default ListeUtilisateurs;
