import { useState } from "react";
import axios from "axios";
import def from "../assets/default.png";
import { formaterDate } from "./utils";

import "./style/profil.css"

function PageProfil(props) {

  const [status, setStatus] = useState('');
  const[userDataProfil, setUserDataProfil] = useState(null)
  const[userDataConnected, setUserDataConnected] = useState(null)
  const [entrainDeModif, setEntrainDeModif] = useState(false)

  async function infoUserProfil(){
    const user = (await axios.get("/api/user/" + props.idProfil)).data
    setUserDataProfil({username : user.username, date : formaterDate(user.date), isAdmin: user.admin, status: user.status});
  }

  async function infoUserConnected(){
    const user = (await axios.get("/api/user/" + props.userId)).data
    setUserDataConnected({username : user.username, date : formaterDate(user.date), isAdmin: user.admin});
  }

  function switchModif(){
    setEntrainDeModif(!entrainDeModif);
  }

  function changeStatus(){
    axios
    .post(("/api/user/status/" + props.idProfil), {status : status}).then((res) => {
      switchModif();
      infoUserProfil();
      console.log(status);
    })
    .catch((err) => console.log(err));
  }

  function setAdmin(b){
    axios
    .post(("/api/user/admin/" + props.idProfil), {b : b}).then((res)=>{
      infoUserProfil();
    })
    .catch((err) => console.log(err));
  }

  if(userDataProfil == null){
    infoUserProfil();
  }
  if(userDataConnected == null){
    infoUserConnected();
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

      {/* pseudo, photo de profil, logoAdmin et date d'adhésion */}
      
      <div id="user">
      <img id="profile_photo" src={def} />
      <p id="profile_username">{userDataProfil ? userDataProfil.username : "auteurnotfound"} {userDataProfil ? (userDataProfil.isAdmin ? (<i title="Administrateur" class="bi bi-check-circle"></i>) : null) : "adminnotfound:("}</p>
      <p id="date">A rejoint le : {userDataProfil ? userDataProfil.date : "datenotfound"}</p>

      {/* Bouton pour rendre une personne admin */}

      {userDataConnected && userDataConnected.isAdmin && props.idProfil != props.userId?
          (userDataProfil && userDataProfil.isAdmin ?
            <button id="button_add_admin" title="Enlever le rôle d'admin" onClick={() => setAdmin(false)}><i class="bi bi-heart-fill"></i></button>
          : <button id="button_add_admin" title="Donner le rôle d'admin" onClick={() => setAdmin(true)}><i class="bi bi-heart" ></i></button>
          )
      : null
      }

      </div>

      

      {/* Status */}
      <p>A propos de l'utilisateur</p>
      
      {props.idProfil == props.userId ? 
      (entrainDeModif ? 
        <>
        <input onChange={(e) => setStatus(e.target.value)} placeholder="Status"></input> 
        <button title="Enregistrer" onClick={changeStatus}><i class="bi bi-floppy"></i></button> 
        </> 
        : <>
        <p>{userDataProfil ? userDataProfil.status : null}</p>
        <button title="Modifier" onClick={switchModif}><i class="bi bi-pencil-square"></i></button>
        </>): 
      <p>{userDataProfil ? userDataProfil.status : null}</p>}
      
      
      {/* Nb de messages envoyés et la liste */}
      <p>Messages envoyés par l'utilisateur : 6</p>


    </>
  );
}

export default PageProfil;
