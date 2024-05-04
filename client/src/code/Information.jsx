import { useState } from "react";
import "./style/informations.css";
import {formaterDate} from "./utils";
import def from "../assets/default.png";
import reply from "../assets/reply.png";

//Composant affichant une notification: l'arrivée d'un nouvel adhérent ou la création d'un nouveau canal
function Information(props) {
  
  //Formatage de la date
  var date = props.date ? formaterDate(props.date) : "datenotfound";

  //Affichage de la notification: contenu et date
  return (
    <>
      <div id="info">
        <p id="info_contenu">{props.text ? props.text : "texte"}</p>
        <p id="info_date">{date}</p>
      </div>
    </>
  );
}

export default Information;
