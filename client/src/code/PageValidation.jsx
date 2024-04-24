import { useState } from "react";
import axios from "axios";
import ListeUtilisateurs from "./ListeUtilisateurs.jsx";
import "./style/users.css";

axios.defaults.baseURL = "http://localhost:4000";

function PageValidation(props) {
  const [lstUtilisateurs, setLstUtilisateurs] = useState([
    { username: "Maxime", date: "15/03/2024" },
    { username: "Laila", date: "16/03/2024" },
    { username: "Vincent", date: "18/03/2024" },
  ]);

  return (
    <div id="liste_canaux">
      <p id="usr_title">Adhérents en attente de validation</p>
      <ListeUtilisateurs lstUtilisateurs={lstUtilisateurs} />
    </div>
  );
}

export default PageValidation;
