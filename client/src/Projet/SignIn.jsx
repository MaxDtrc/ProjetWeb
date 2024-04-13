import { useState } from 'react'
import "./style/signin.css"
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
    }

    return (
        <>
            <div id="signin_form">
                <p id="title">Créer un compte</p>
                <label id="loginLabel">Identifiant: </label>
                <input id="login" /><br/>
                <label id="passLabel">Mot de passe: </label>
                <input id="pass"/><br/>
                <label id="cpassLabel">Confirmation: </label>
                <input id="cpass"/><br/>
                <div hidden={true} id="mdpDif">Les mots de passe ne sont pas identiques</div>
                <button id="confirmSignin" onClick={(e) => {
                    e.preventDefault()
                    setLogin(document.getElementById("login").value)
                    setPassword(document.getElementById("pass").value)
                    mdpDifferent()
                    console.log("click")
                    props.login()
                }}>S'enregistrer</button>
                <a id="changeFormSignin" href="" onClick={(e) => {e.preventDefault() ; props.setForm("login")}}>Cliquez ici pour vous connecter</a>
            </div>
        </> 
    )

        
}

export default SignIn