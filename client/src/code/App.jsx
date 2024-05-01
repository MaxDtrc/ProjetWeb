import Header from "./Header";
import LeftSide from "./LeftSide";
import MainPage from "./MainPage";
import { useState } from "react";
import cabin from "../assets/cabin.png";
import smoke from "../assets/smoke.gif";

import "./style/app.css";
import PageLogin from "./PageLogin";

import axios from "axios";
axios.defaults.baseURL = "http://localhost:4000";
axios.defaults.withCredentials = true;

function App() {
  //Props globales
  const [isConnected, setConnection] = useState(false);
  const [connectedUser, setConnectedUser] = useState("null");
  const [adminStatus, setAdminStatus] = useState(false);
  const [currentPage, setPage] = useState("page_canaux");
  const [recherche, setRecherche] = useState("");
  const [idProfil, setIdProfil] = useState("null");

  if (!isConnected) {
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
