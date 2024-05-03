import { useState } from 'react'

//A priori non utilisé
function Logout(props){
    return <button onClick={() => props.logout()}>Logout</button>
}

export default Logout