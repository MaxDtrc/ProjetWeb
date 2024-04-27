import { useState } from "react";
import "./style/canal.css";
import formaterDate from "./utils";

function Canal(props) {
  function clickCanal(e) {
    e.preventDefault();
    props.openCanal(props.id);
  }

  var date = "";
  if (props.date) {
    date = formaterDate(props.date);
  } else {
    date = "date";
  }

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
            props.setIdProfil(props.id);
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
