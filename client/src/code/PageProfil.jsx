import { useState } from "react";
import axios from "axios";
import { formaterDate, idToPhoto, idToName, getListeMessages } from "./utils";
import "./style/profil.css"
import ListeMessages from "./ListeMessages";

//Composant affichant une page de profile
function PageProfil(props) {
  const [profileData, setProfileData] = useState(null) //Composant contenant les données du profile
  const [modification, setModification] = useState(false) //Modification en cours du statut
  const [afficherMessages, setAfficherMessage] = useState(false) //Afficher les messages

  //Fonction de mise à jour du profile
  async function update(){
    console.log("PageProfil: mise à jour du profil ...")
    try{
      //Obtention des données de l'utilisateur
      const user = (await axios.get("/api/user/" + props.idProfil)).data 
      console.log("PageProfil: mise à jour effectuée !")

      //Obtention de la photo
      console.log("PageProfil: Obtention de la photo")
      const photo = await idToPhoto(props.idProfil);

      //Obtention de la liste des messages
      const lst = await getListeMessages(null, ((msg) => msg.auteur == props.idProfil), true);

      //Mise à jour du profil
      setProfileData({username : user.username, date : formaterDate(user.date), isAdmin: user.admin, status: user.status, profile_picture: photo, liste_messages: lst});
    }
    catch(e){
      //Erreur de mise à jour
      console.log(e)
      console.log("PageProfil: erreur lors de la mise à jour du profile")
    }
  }

  //Fonction permettant d'upload une photo de profile
  function uploadPhoto(e){
    console.log("PageProfil: upload de la photo ...")

    const file = e.target.files[0]; //On récupère le fichier choisi par l'utilisateur
    const formData = new FormData();
    formData.append('image', file);

    //On envoie la photo au serveur
    axios.post("/api/user/photo/" + props.idProfil, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }) 
    .then(res => {
      //Réussite de l'upload
      console.log("PageProfil: photo upload avec succès !")
      update();
    })
    .catch(err => {
      //Erreur
      console.log("PageProfil: erreur lors de l'upload de la photo")
    })
  }

  //Fonction permettant de changer de statut
  function changeStatus(){
    console.log("PageProfil: mise à jour du statut ...")
    console.log("status = " + profileData.status)
    const s = profileData.status;
    
    axios
    .post(("/api/user/status/" + props.idProfil), {status : s})
    .then((res) => {
      //Mise a jour du statut effectuée
      console.log("PageProfil: mise à jour du statut effectuée avec succès !")
      setModification(false); 
      update(); //Mise à jour
    })
    .catch((err) => {
      //Erreur lors de la mise à jour
      console.log("PageProfil: erreur lors de la mise à jour du statut")
    });
  }

  //Fonction permettant de changer le statut d'administrateur d'un membre
  function setAdmin(b){
    console.log("PageProfil: mise à jour du statut d'administrateur ...")
    axios
    .post(("/api/user/admin/" + props.idProfil), {b : b})
    .then((res)=>{
      //Réussite
      console.log("PageProfil: statut d'administrateur changé avec succès !")
      update(); //Mise à jour
    })
    .catch((err) => {
      //Erreur
      console.log("PageProfil: erreur lors du changement de statut d'administrateur")
    });
  }

  //Si aucun profile n'est chargé, on le met à jour
  if(profileData == null){
    update();
    return;
  }

  //Affichage du composant
  return (
    <>
      <a
        id="retour"
        href=""
        onClick={(e) => {
          e.preventDefault();
          props.quit();
        }}
      >
        Retour
      </a>

      {/* pseudo, photo de profil, logoAdmin et date d'adhésion */}
      <div id="user">
        {profileData.profile_picture ? <img className="profile_photo" src={profileData.profile_picture} alt="Profile Picture" /> : <img className="profile_photo" src={def}/>}
        {props.idProfil == props.userId ? <input type="file" onChange={uploadPhoto}></input> : null}
        <p id="profile_username">{profileData ? profileData.username : "auteurnotfound"} {profileData ? (profileData.isAdmin ? (<i title="Administrateur" className="bi bi-check-circle"></i>) : null) : "adminnotfound:("}</p>
        <p id="date">A rejoint le : {profileData ? profileData.date : "datenotfound"}</p>

        {/* Bouton pour rendre une personne admin */}
        {props.admin && props.idProfil != props.userId?
            (profileData && profileData.isAdmin ?
              <button id="button_add_admin" title="Enlever le rôle d'admin" onClick={() => setAdmin(false)}><i className="bi bi-heart-fill"></i></button>
            : <button id="button_add_admin" title="Donner le rôle d'admin" onClick={() => setAdmin(true)}><i className="bi bi-heart" ></i></button>
            )
        : null
        }
      </div>

      {/* Status */}
      <div id="status">
      <p>A propos de l'utilisateur: </p>
      {props.idProfil == props.userId ? 
      (modification ? 
        <div id="changer_statut">
        <input defaultValue={profileData.status} id="status_input" onChange={(e) => {profileData.status = e.target.value}} placeholder="Status"></input> 
        <button title="Enregistrer" onClick={changeStatus}><i className="bi bi-floppy"></i></button> 
        </div> 
        : <div id="changer_statut">
        {profileData ? profileData.status : null}
        <button title="Modifier" onClick={() => setModification(!modification)}><i className="bi bi-pencil-square"></i></button>
        </div>): <p>{profileData ? profileData.status : null}</p>}
      </div>

      {/* Nb de messages envoyés et la liste */}

      <div id="nb_messages">
        Messages envoyés par l'utilisateur :   {profileData.liste_messages.length}
        {
          profileData.liste_messages.length != 0 ?
          <button onClick={(e) => {e.preventDefault(); setAfficherMessage(!afficherMessages)}}> {afficherMessages ? "Masquer" : "Afficher"} </button>
          : null
        }  
      </div>
      
      <div id="profil_msg">
        { afficherMessages ?
        <div id="profil_scrollview">
          <ListeMessages 
            lstMessages={[...profileData.liste_messages].reverse()} 
            openCanal={props.openCanal}
            setPage={props.setPage}
            reply={false}
            setIdProfil={props.setIdProfil}
          />
        </div> : null
        }
      </div>
    </>
  );
}

export default PageProfil;
