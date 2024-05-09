import { useState } from "react";
import "./style/login.css";
import axios from "axios";

//Composant affichant le formulaire d'inscription
function SignIn(props) {
  const [login, setLogin] = useState(""); //Nom d'utilisateur en cours de saisie
  const [password, setPassword] = useState(""); //Mot de passe en cours de saisie

  //Renvoie true si les mots de passe entrés sont différents, false sinon.
  function mdpDifferent() {
    var p = document.getElementById("pass").value;
    var cp = document.getElementById("cpass").value;
    if(p != cp){
      props.setMessageErreur("Les mots de passe sont différents.")
    }
    return p != cp;
  }

  //Fonction de création du compte
  function Signin() {
    console.log("SignIn: demande de création du compte ...");
    axios
    .post("/api/user/signin", { login: login, password: password })
    .then((res) => {
      if (res.data) {
        //Création du compte effectuée, on passe à la page d'attente
        console.log("SignIn: création du compte effectuée, mise en attente ...");
        props.setForm("en_attente");
      }
    })
    .catch((err) => {
      //Erreur
      console.log("SignIn: erreur lors de la création du compte")
      props.setMessageErreur("L'identifiant est déjà utilisé.")
    });
  }

  //Affichage du formulaire
  return (
    <>
      <form id="signin_form">
        <p id="title">Créer un compte</p>
        <label id="loginLabel">Identifiant: </label>
        <input id="login" onChange={(e) => setLogin(e.target.value)} />
        <br />
        <label id="passLabel">Mot de passe: </label>
        <input
          id="pass"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <label id="cpassLabel">Confirmation: </label>
        <input id="cpass" type="password" />
        <br />
        <div id="messageErreurSignin">
          {props.messageErreur}
        </div>
        <button
          id="confirmSignin"
          type="submit"
          onClick={(e) => {
            e.preventDefault();
            if (!mdpDifferent()) Signin();
          }}
        >
          S'enregistrer
        </button>
        <a
          id="changeFormSignin"
          href=""
          onClick={(e) => {
            e.preventDefault();
            props.setMessageErreur("")
            props.setForm("login");
          }}
        >
          Cliquez ici pour vous connecter
        </a>
      </form>
    </>
  );
}

export default SignIn;
