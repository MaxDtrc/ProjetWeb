import { useState } from "react";
import "./style/informations.css";
import {formaterDate} from "./utils";
import def from "../assets/default.png";
import reply from "../assets/reply.png";

function Information(props) {
  var date = "";
  if (props.date) {
    date = formaterDate(props.date);
  } else {
    date = "date";
  }

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
