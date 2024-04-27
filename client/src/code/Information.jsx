import { useState } from "react";
import "./style/informations.css";
import def from "../assets/default.png";
import reply from "../assets/reply.png";

function Information(props) {
  return (
    <>
      <div id="info">
        <p id="info_contenu">{props.text ? props.text : "texte"}</p>
        <p id="info_date">{props.date ? props.date : "date"}</p>
      </div>
    </>
  );
}

export default Information;
