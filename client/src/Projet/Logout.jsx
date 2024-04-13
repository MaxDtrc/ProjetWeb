import { useState } from 'react'

function Logout(props){
    return <button onClick={(salam) => props.logout()}>Logout</button>
}

export default Logout