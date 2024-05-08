import { createElement, useState } from "react";
import Login from "./Login";
import SignIn from "./SignIn";
import "./style/login.css";
import axios from "axios";

//Composant affichage la page de connexion/inscription
function PageLogin(props) {
  const [formulaire, setFormulaire] = useState("login"); //Formulaire en cours d'affichage
  const [statutLogin, setStatutLogin] = useState(0); //Contient 1 si on a déjà essayé de charger une session
  const [messageErreur, setMessageErreur] = useState(""); //Message d'erreur de connexion/inscription

  //Fonction permettant de charger un session en cours
  function loadSession(){
    console.log("PageLogin: obtention de la session ...")
    axios.get("/api/session").then(res => {
      //Session existante
      if(res.data.id && res.data.validation){
        //Si l'utilisateur a déjà été validé, on le connecte directement
        console.log("PageLogin: session obtenue, connexion ...")
        props.login(res.data.id, res.data.isAdmin);
        setStatutLogin(0);
      }else{
        //Aucun session n'a été trouvée
        setStatutLogin(1);
      }
    }).catch(err => {
      console.log("PageLogin: erreur lors de l'obtention de la session")
      setStatutLogin(1);
    });
  }

  //Si on n'a pas déjà essayé de charger la session, on appelle la fonction correspondante.
  if(statutLogin == 0) loadSession();
  
  //Affichage du formulaire
  if(statutLogin == 1){
    if (formulaire == "login") {
      //On affiche le formulaire de connexion
      return (
        <div id="login_page">
          <Login
            messageErreur={messageErreur}
            setMessageErreur={setMessageErreur}
            login={props.login}
            setForm={setFormulaire}
          />
        </div>
      );
    } else if (formulaire == "signin") {
      //On affiche le formulaire d'inscription
      return (
        <div id="login_page">
          <SignIn
            messageErreur={messageErreur}
            setMessageErreur={setMessageErreur}
            login={props.login}
            setForm={setFormulaire}
          />
        </div>
      );
    } else {
      //L'utilisateur est en attente de validation
      return (
        <div id="login_page">
          <div id="en_attente">
            <p id="text_en_attente">En attente de validation ...</p>
          </div>
        </div>
      );
    }
  }
}

export default PageLogin;
