import { useState } from 'react'

import PageLogin from './PageLogin'
import PageFilDiscussion from './PageFilDiscussion'

function MainPage(props){
    const [currentPage, setPage] = useState("fil_discussion")


    function getConnected(){
        setPage("fil_discussion")
        props.setConnection(true)
    }

    var page;
    switch(currentPage){
        case "signin_page":
            page = <PageLogin login={getConnected}/>
        case "fil_discussion":
            page = <PageFilDiscussion/>
        //Autres cas pour les futures pages
    }

    
    return (
        <main id="main_page">
            {page}
        </main> 
    )
}

export default MainPage