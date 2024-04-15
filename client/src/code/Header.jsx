import { useState } from 'react'
import momo from "../assets/momo.png"
import "./style/header.css"

function Header(props) {

    const logout = () => {
        props.setConnection(false)
    }

    return (
        <div id="header">
            <p id="header_title">MomoAsso</p>
            <img id="header_logo" src={momo} />
            <input id="header_search_bar" placeholder='nv msg'/>
            <button id="header_logout" onClick={logout}>Deconnexion</button>
        </div>
    )
}

export default Header