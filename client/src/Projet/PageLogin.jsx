import { createElement, useState } from 'react'
import Login from './Login'
import SignIn from './SignIn'
import "./style/signin.css"


function PageLogin(props){
    const [formulaire, setFormulaire] = useState("login")

    if(formulaire == "login"){
        return (
            <div id="login_page">
                <Login login={props.login} setForm={setFormulaire}/>
            </div>
        )
    }else{
        return (
            <div id="login_page">
                <SignIn login={props.login} setForm={setFormulaire}/>
            </div>
        )
    }
}

export default PageLogin