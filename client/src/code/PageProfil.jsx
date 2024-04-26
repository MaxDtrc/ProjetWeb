import { useState } from "react";
import axios from "axios";
axios.defaults.baseURL = "http://localhost:4000";
import ListeMessages from "./ListeMessages";
import momo from "../assets/momo.png";

function PageProfil(props) {
  return (
    <>
      <a
        href=""
        onClick={(e) => {
          e.preventDefault();
          props.setPage("page_canaux");
        }}
      >
        Retour
      </a>
      <img id="profile_photo" src={momo} />
      <p id="profile_username">Laïla</p>
      <p id="profile_note">Salam les amis</p>
      <p>Historique des messages</p>
      <ListeMessages
        lstMessages={[{ text: "salam", auteur: "Laïla", date: "2004" }]}
      />
    </>
  );
}

export default PageProfil;
