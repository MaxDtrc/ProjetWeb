import { useState } from 'react'
import axios from 'axios';
axios.defaults.baseURL = 'http://localhost:4000';

function Login(props){
    const [login, setLogin] = useState("")
    const [password, setPassword] = useState("")

    function checkLogin(){
        axios.post('/api/login', {"login": login, "password": password}).then(res => {
            if(res.data){
                props.login();
            }
        })
    }

    return (
        <>
            <div id="login_form">
                <p id="title">Connexion</p>
                <label id ="loginLabel" htmlFor="login">Identifiant: </label>
                <input id="login" onChange={(e) => setLogin(e.target.value)}/><br/>
                <label id="passLabel" htmlFor="pass">Mot de passe: </label>
                <input id="pass" onChange={(e) => setPassword(e.target.value)}/><br/>
                <button id="confirmLogin" onClick={() => {
                    checkLogin()
                }
                }>Se connecter</button>
                <a id="changeFormLogin" href="" onClick={(e) => {e.preventDefault() ; props.setForm("signin")}}>Cliquez ici pour vous créer un compte</a>
            </div>   
        </>
    )

        
}

export default Login