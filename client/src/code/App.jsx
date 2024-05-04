import Header from "./Header";
import LeftSide from "./LeftSide";
import MainPage from "./MainPage";
import { useState } from "react";
import cabin from "../assets/cabin.png";
import smoke from "../assets/smoke.gif";
import "./style/app.css";
import PageLogin from "./PageLogin";
import axios from "axios";

//Configuration générale d'Axios
axios.defaults.baseURL = "http://localhost:4000"; //URL du serveur
axios.defaults.withCredentials = true; //Autorisation des échanges de cookies



//Composant principal du site, affiché par index.jsx
function App() {
  //Props globales du site
  const [isConnected, setConnection] = useState(false); //Statut de connexion de l'utilisateur
  const [connectedUser, setConnectedUser] = useState("null"); //Identifiant de l'utilisateur connecté
  const [adminStatus, setAdminStatus] = useState(false); //Stocke si l'utilisateur connecté est administrateur ou non
  const [currentPage, setPage] = useState("page_canaux"); //Page affichée par le composant MainPage
  const [recherche, setRecherche] = useState(""); //Texte contenu dans la barre de recherche du header
  const [idProfil, setIdProfil] = useState("null"); //Identifiant du profil affiché par le composant PageProfil

  if (!isConnected) {
    //L'utilisateur n'est pas connecté, on affiche la page de connexion
    return (
      <div>
        <PageLogin
          login={(userId, isAdmin) => {
            setConnectedUser(userId);
            setAdminStatus(isAdmin);
            setPage("page_canaux");
            setConnection(true);
          }}
        />
      </div>
    );
  } else {
    //L'utilisateur est connecté, on affiche les 3 éléments principaux de la page
    return (
      <div id="app">
        <Header
          setConnection={setConnection}
          setPage={setPage}
          setRecherche={setRecherche}
          isAdmin={adminStatus}
        />
        <LeftSide />
        <MainPage
          userId={connectedUser}
          admin={adminStatus}
          isConnected={isConnected}
          setConnection={setConnection}
          setPage={setPage}
          page={currentPage}
          currentPage={currentPage}
          recherche={recherche}
          setIdProfil={setIdProfil}
          idProfil={idProfil}
        />

        {/* Footer */}
        <img id="cabin" src={cabin} alt="cabine decoration" />
        <img id="smoke" src={smoke} alt="fumee decoration" />
        <div id="snow"></div>
      </div>
    );
  }
}

export default App;
