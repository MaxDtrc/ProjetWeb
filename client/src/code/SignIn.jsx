import { useState } from 'react'
import "./style/signin.css"
import axios from 'axios';

function SignIn(props){
    const [login, setLogin] = useState("")
    const [password, setPassword] = useState("")

    function mdpDifferent(){
        var p = document.getElementById("pass").value
        var cp = document.getElementById("cpass").value
        if(p != cp)
            document.getElementById("mdpDif").hidden = false    
        else
            document.getElementById("mdpDif").hidden = true
        return p != cp    
    }

    function Signin(){
        console.log("création du compte")
        axios.post('/api/signin', {"login": login, "password": password}).then(res => {
            if(res.data){
                props.login();
            }
        })
    }

    return (
        <>
            <div id="signin_form">
                <p id="title">Créer un compte</p>
                <label id="loginLabel">Identifiant: </label>
                <input id="login" onChange={(e) => setLogin(e.target.value)} /><br/>
                <label id="passLabel">Mot de passe: </label>
                <input id="pass" onChange={(e) => setPassword(e.target.value)}/><br/>
                <label id="cpassLabel">Confirmation: </label>
                <input id="cpass"/><br/>
                <div hidden={true} id="mdpDif">Les mots de passe ne sont pas identiques</div>
                <button id="confirmSignin" onClick={(e) => {
                    e.preventDefault()
                    if(!mdpDifferent())
                        Signin()
                }}>S'enregistrer</button>
                <a id="changeFormSignin" href="" onClick={(e) => {e.preventDefault() ; props.setForm("login")}}>Cliquez ici pour vous connecter</a>
            </div>
        </> 
    )

        
}

export default SignIn