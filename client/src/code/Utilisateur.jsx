import { useState } from "react";
import "./style/users.css";

import check from "../assets/check.png";
import cross from "../assets/cross.png";

function Utilisateur(props) {
  return (
    <div id="usr">
      <p id="usr_name">{props.username ? props.username : "nom"}</p>
      <button
        id="accept"
        title="Répondre"
        onClick={(e) => console.log("reply")}
      >
        <img id="accept_icon" src={check} />
      </button>
      <button id="deny" title="Répondre" onClick={(e) => console.log("reply")}>
        <img id="deny_icon" src={cross} />
      </button>
      <p id="usr_date">{props.date ? props.date : "date"}</p>
    </div>
  );
}

export default Utilisateur;
