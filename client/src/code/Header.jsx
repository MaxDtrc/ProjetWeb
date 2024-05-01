import { useState } from "react";
import momo from "../assets/momo.png";
import "./style/header.css";
import axios from "axios";

function Header(props) {

  const logout = () => {
    axios.post("/api/logout").then((res) => {
      props.setConnection(false);
    })
    .catch(err => {console.log(err)});
    
  };

  function searchMessage(e) {
    if (e.target.value.length != 0) {
      props.setRecherche(e.target.value);
      props.setPage("page_recherche");
    } else {
      props.setPage("page_canaux");
    }
  }
  /*<img id="header_logo" src={momo} />*/

  return (
    <div id="header">
      <p id="header_title">Association de Ski franco-marocaine</p>

      <input
        id="header_search_bar"
        onChange={searchMessage}
        placeholder="Chercher un message ..."
      />

      {props.isAdmin ? (
        <button
          id="header_validation"
          onClick={(e) => {
            e.preventDefault();
            props.setPage("page_validation");
          }}
        >
          Page validation
        </button>
      ) : null}
      <button id="header_logout" onClick={logout}>
        Deconnexion
      </button>
    </div>
  );
}

export default Header;
