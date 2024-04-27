import { useState } from "react";
import "./style/login.css";
import axios from "axios";

function SignIn(props) {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  function mdpDifferent() {
    var p = document.getElementById("pass").value;
    var cp = document.getElementById("cpass").value;
    if (p != cp) document.getElementById("mdpDif").hidden = false;
    else document.getElementById("mdpDif").hidden = true;
    return p != cp;
  }

  function Signin() {
    console.log("création du compte");
    axios
      .post("/api/signin", { login: login, password: password })
      .then((res) => {
        console.log(res);
        if (res.data) {
          if (res.data.validation)
            //Utilisateur validé, on le connecte
            props.login(res.data._id.toString(), res.data.admin);
          else {
            //Utilisateur non validé, on le met sur la page d'attente
            console.log("mise en attente");
            props.setForm("en_attente");
          }
        }
      })
      .catch((err) => console.log(err));
  }

  return (
    <>
      <div id="signin_form">
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
        <div hidden={true} id="mdpDif">
          Les mots de passe ne sont pas identiques
        </div>
        <button
          id="confirmSignin"
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
            props.setForm("login");
          }}
        >
          Cliquez ici pour vous connecter
        </a>
      </div>
    </>
  );
}

export default SignIn;
