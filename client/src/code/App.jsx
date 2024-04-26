import Header from "./Header";
import LeftSide from "./LeftSide";
import MainPage from "./MainPage";
import { useState } from "react";
import cabin from "../assets/cabin.png";
import smoke from "../assets/smoke.gif";

import "./style/app.css";
import PageLogin from "./PageLogin";

function App() {
  const [isConnected, setConnection] = useState(false);
  const [connectedUser, setConnectedUser] = useState("null");
  const [adminStatus, setAdminStatus] = useState(false)
  const [currentPage, setPage] = useState("page_canaux");

  if (!isConnected) {
    return (
      <div>
        <PageLogin
          login={(userId, isAdmin) => {
            setConnectedUser(userId);
            setAdminStatus(isAdmin);
            setConnection(true);
          }}
        />
      </div>
    );
  } else {
    return (
      <div id="app">
        <Header setConnection={setConnection} setPage={setPage} isAdmin={adminStatus} />
        <LeftSide />
        <MainPage
          userId={connectedUser}
          isConnected={isConnected}
          setConnection={setConnection}
          setPage={setPage}
          currentPage={currentPage}
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
