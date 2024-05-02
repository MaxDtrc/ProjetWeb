import { createElement, useState } from "react";
import Login from "./Login";
import SignIn from "./SignIn";
import "./style/login.css";
import axios from "axios";

function PageLogin(props) {
  const [formulaire, setFormulaire] = useState("login");
  const [statutLogin, setStatutLogin] = useState(0);

  function loadSession(){
    axios.get("/api/session").then(res => {
      if(res.data.id && res.data.validation){
        props.login(res.data.id, res.data.isAdmin);
        setStatutLogin(0);
      }else{
        setStatutLogin(1);
      }
    }).catch(err => {console.log(err)});
  }

  if(statutLogin == 0) loadSession();
  

  //On affiche le formulaire de connexion
  if(statutLogin == 1){
    if (formulaire == "login") {
      return (
        <div id="login_page">
          <Login login={props.login} setForm={setFormulaire} />
        </div>
      );
    } else if (formulaire == "signin") {
      return (
        <div id="login_page">
          <SignIn login={props.login} setForm={setFormulaire} />
        </div>
      );
    } else {
      return (
        <div id="signin_form">
          <p>En attente de validation</p>
        </div>
      );
    }
  }
}

export default PageLogin;
