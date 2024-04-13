import React from 'react'
import { createRoot } from 'react-dom/client';
import App from './src/Projet/App'
//import AppTD4 from './src/TD4/AppTD4'
//import AppTD5 from './src/TD5/AppTD5'

const rootNode = document.getElementById('root');
const root = createRoot(rootNode);
root.render(<App />);

