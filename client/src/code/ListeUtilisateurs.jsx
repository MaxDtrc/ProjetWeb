import { useState } from "react";
import Utilisateur from "./Utilisateur.jsx";

//Composant permettant d'afficher une liste d'utilisateurs à valider
function ListeUtilisateurs(props) {

  var i = 0; //Identifiant pour les clefs des éléments de la liste

  //Affichage de la liste des utilisateurs
  return (
    <>
      {[...props.lstUtilisateurs].reverse().map((usr) => (
        <Utilisateur key={i++} id={usr._id.toString()} username={usr.username} date={usr.date} accept={props.accept} deny={props.deny}/>
      ))}
    </>
  );
}

export default ListeUtilisateurs;
