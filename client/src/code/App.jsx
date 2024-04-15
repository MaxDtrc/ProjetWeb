import Header from './Header'
import LeftSide from './LeftSide'
import MainPage from './MainPage'
import { useState } from 'react';
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
            </div>
        )
    }
    
}



export default App