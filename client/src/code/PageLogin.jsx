import { createElement, useState } from "react";
import Login from "./Login";
import SignIn from "./SignIn";
import "./style/login.css";
import Cookies from 'js-cookie';
import axios from "axios";

function PageLogin(props) {
  const [formulaire, setFormulaire] = useState("login");

  const userId = Cookies.get('userId');
  const isAdmin = Cookies.get('isAdmin');

  axios.get("/api/session").then(res => {
    if(res.data.id){
      props.login(res.data.id, res.data.isAdmin);
    }
  }).catch(err => {console.log(err)});

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
        <p>attends frérot</p>
      </div>
    );
  }
}

export default PageLogin;
