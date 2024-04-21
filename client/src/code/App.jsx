import Header from './Header'
import LeftSide from './LeftSide'
import MainPage from './MainPage'
import { useState } from 'react';

import cabin from "../assets/cabin.png"
import smoke from "../assets/smoke.gif"

import "./style/app.css"

import PageLogin from './PageLogin';


function App(){

    const [isConnected, setConnection] = useState(false)

    
    if(!isConnected){
        return (
            <div>
                <PageLogin login={() => setConnection(true)}/>
            </div>
        )
    }else{
        return (
            <div id='app'>
                <Header setConnection={setConnection}/>
                <LeftSide />
                <MainPage isConnected={isConnected} setConnection={setConnection}/>

                {/* Footer */}
                <img id="cabin" src={cabin} alt="cabine decoration" />
                <img id="smoke" src={smoke} alt="fumee decoration"/>
                <div id="snow"></div>

            </div>
        )
    }
    
}



export default App