import { useState } from "react";
import Utilisateur from "./Utilisateur.jsx";

function ListeUtilisateurs(props) {
  return (
    <>
      {[...props.lstUtilisateurs].reverse().map((usr) => (
        <Utilisateur id={usr._id.toString()} username={usr.username} date={usr.date} accept={props.accept} deny={props.deny}/>
      ))}
    </>
  );
}

export default ListeUtilisateurs;
