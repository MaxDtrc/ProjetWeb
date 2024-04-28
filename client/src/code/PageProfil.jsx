import { useState } from "react";
import axios from "axios";
import { idToName } from "./utils";
axios.defaults.baseURL = "http://localhost:4000";
import ListeMessages from "./ListeMessages";
import def from "../assets/default.png";

import "./style/profil.css"

function PageProfil(props) {

  const[username, setUsername] = useState("")

  async function infoUser(){
    setUsername(await idToName(props.idProfil))
  }

  if(username.length == 0){
    infoUser();
  }
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


      

      <div id="user">
      <img id="profile_photo" src={def} />
      <p id="profile_username">{username}</p>
      <p id="date"></p>
      </div>


      <p>Note de l'utilisateur</p>
      <p id="profile_note">Salam les amis</p>


      <p>Messages envoyés par l'utilisateur : 6</p>


    </>
  );
}

export default PageProfil;
