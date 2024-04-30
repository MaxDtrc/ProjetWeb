import { useState } from "react";
import axios from "axios";
axios.defaults.baseURL = "http://localhost:4000";
import def from "../assets/default.png";
import { formaterDate } from "./utils";

import "./style/profil.css"

function PageProfil(props) {

  const [status, setStatus] = useState('');
  const[userData, setUserData] = useState(null)
  const [entrainDeModif, setEntrainDeModif] = useState(false)

  async function infoUser(){
    const user = (await axios.get("/api/user/" + props.idProfil)).data
    setUserData({username : user.username, date : formaterDate(user.date), isAdmin: user.admin, status: user.status});
  }


  function switchModif(){
    setEntrainDeModif(!entrainDeModif);
  }

  function changeStatus(){
    axios
    .post(("/api/user/status/" + props.idProfil), {status : status}).then((res) => {
      switchModif();
      infoUser();
      console.log(status);
    })
    .catch((err) => console.log(err));
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
      <p id="profile_username">{userData ? userData.username : "auteurnotfound"} {userData ? (userData.isAdmin ? (<i title="Administrateur" class="bi bi-check-circle"></i>) : null) : "adminnotfound:("}</p>
      <p id="date">A rejoint le : {userData ? userData.date : "datenotfound"}</p>
      </div>

      <p>A propos de l'utilisateur</p>
      {entrainDeModif ? <><input onChange={(e) => setStatus(e.target.value)} placeholder="Status"></input> <button title="Enregistrer" onClick={changeStatus}><i class="bi bi-floppy"></i></button> </> : <><p>{userData ? userData.status : null}</p> <button><i class="bi bi-pencil-square" title="Modifier" onClick={switchModif} ></i></button></> }
      

      <p>Messages envoyés par l'utilisateur : 6</p>


    </>
  );
}

export default PageProfil;
