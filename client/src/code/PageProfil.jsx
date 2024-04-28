import { useState } from "react";
import axios from "axios";
import { idToName } from "./utils";
axios.defaults.baseURL = "http://localhost:4000";
import ListeMessages from "./ListeMessages";
import def from "../assets/default.png";
import { formaterDate } from "./utils";
import modifier from "../assets/modifier.png"

import "./style/profil.css"

function PageProfil(props) {

  const[userData, setUserData] = useState(null)

  async function infoUser(){
    const user = (await axios.get("/api/user/" + props.idProfil)).data
    setUserData({username : user.username, date : formaterDate(user.date)})
  }

  if(userData == null){
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
      <p id="profile_username">{userData ? userData.username : "auteurnotfound"} ADMIN </p>
      <p id="date">joined date : {userData ? userData.date : "datenotfound"}</p>
      </div>


      <p>Note de l'utilisateur</p>
      <p id="profile_note">Salam les amis</p>
      <img id="modif_icon" src={modifier}></img>


      <p>Messages envoyés par l'utilisateur : 6</p>


    </>
  );
}

export default PageProfil;
