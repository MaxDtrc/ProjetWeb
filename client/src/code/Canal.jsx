import { useState } from "react";
import "./style/canal.css";
import {formaterDate} from "./utils";

//Composant représentant un canal de discussion, permet d'accéder au fil de discussion associé
function Canal(props) {

  //Ouverture du canal de discussion
  function clickCanal(e) {
    e.preventDefault();
    console.log("Canal: Ouverture du canal d'id " + props.id)
    props.openCanal(props.id);
  }

  //Formatage de la date
  var date = props.date ? formaterDate(props.date) : "datenotfound";

  //Affichage du canal: titre, auteur et date de création
  return (
    <div id="cnl">
      <a href="" id="cnl_titre" onClick={clickCanal}>
        {props.titre ? props.titre : "titre"}
      </a>
      <div id="cnl_info">
        <a
          id="cnl_auteur"
          href=""
          onClick={(e) => {
            e.preventDefault();
            props.setIdProfil(props.id_auteur);
            props.setPage("page_profil");
          }}
        >
          {props.auteur ? props.auteur : "auteur"}
        </a>
        <p id="cnl_date">{date}</p>
      </div>
    </div>
  );
}

export default Canal;
