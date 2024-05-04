import { useState } from "react";
import axios from "axios";

//Composant permettant de gérer le formulaire de connexion
function Login(props) {
  const [login, setLogin] = useState(""); //Identifiant en cours de saisie
  const [password, setPassword] = useState(""); //Mot de passe en cours de saisie

  //Fonction de connexion
  function checkLogin() {
    axios
      .post("/api/login", { login: login, password: password }) //Requête de connexion
      .then((res) => {
        if (res.data) {
          //Utilisateur correspondant trouvé
          if(res.data.validation){
            //Utilisateur validé, on le connecte
            props.login(res.data._id.toString(), res.data.admin); 
          }
          else{ 
            //Utilisateur non validé, on le met sur la page d'attente
            console.log("Login: Utilisateur non vérifié, mise en attente");
            props.setForm("en_attente");
          }
        }
      })
      .catch(err => {
        //Erreur lors de la connexion
        console.log("Login: Erreur lors de la connexion")
      })
  }

  //Affichage du formulaire de connexion
  return (
    <>
      <div id="login_form">
        <p id="title">Connexion</p>
        <label id="loginLabel" htmlFor="login">
          Identifiant:{" "}
        </label>
        <input id="login" onChange={(e) => setLogin(e.target.value)} />
        <br />
        <label id="passLabel" htmlFor="pass">
          Mot de passe:{" "}
        </label>
        <input id="pass" type="password" onChange={(e) => setPassword(e.target.value)} />
        <br />
        <button
          id="confirmLogin"
          onClick={() => {
            checkLogin();
          }}
        >
          Se connecter
        </button>
        <a
          id="changeFormLogin"
          href=""
          onClick={(e) => {
            e.preventDefault();
            props.setForm("signin");
          }}
        >
          Cliquez ici pour vous créer un compte
        </a>
      </div>
    </>
  );
}

export default Login;
