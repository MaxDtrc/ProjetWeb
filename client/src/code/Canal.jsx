import { useState } from "react";
import "./style/canal.css";

function Canal(props) {
  function clickCanal(e) {
    e.preventDefault();
    props.openCanal(props.id);
  }

  return (
    <div id="cnl">
      <a href="" id="cnl_titre" onClick={clickCanal}>
        {props.titre ? props.titre : "titre"}
      </a>
      <div id="cnl_info">
        <p id="cnl_auteur">{props.auteur ? props.auteur : "auteur"}</p>
        <p id="cnl_date">{props.date ? props.date : "date"}</p>
      </div>
    </div>
  );
}

export default Canal;
