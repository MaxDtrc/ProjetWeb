import { useState } from 'react';
import axios from 'axios';
axios.defaults.baseURL = 'http://localhost:4000';

function NouveauMessage(props) {
    const [newMessage, setNewMessage] = useState("") 

    const buttonEvt = (e) => {
      props.ajouterMessage(newMessage);
    }

    return (
      <>
        <input onChange={(e) => setNewMessage(e.target.value)} id="nv_msg"/>
        <button onClick={buttonEvt}>Envoyer</button> 
      </>
    )
  }

export default NouveauMessage