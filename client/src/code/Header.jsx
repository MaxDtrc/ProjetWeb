import { useState } from "react";
import momo from "../assets/momo.png";
import "./style/header.css";
import axios from "axios";

//Composant gérant le Header de la page principale
function Header(props) {

  //Fonction de déconnexion
  const logout = () => {
    axios.post("/api/logout").then((res) => {
      console.log("Déconnexion réussie, retour à la page de connexion")
      props.setConnection(false);  //La déconnexion a réussi côté serveur
    })
    .catch(err => {
      console.log("Erreur lors de la déconnexion") //Echec de la déconnexion côté serveur
    });
  };

  //Fonction de recherche de message
  function searchMessage(e) {
    if (e.target.value.length != 0) {
      //La barre de recherche n'est pas vide, on affiche donc la page de recherche
      props.setRecherche(e.target.value);
      props.setPage("page_recherche");
    } else {
      //La barre de recherche est vide, on quitte la page de recherche
      props.setPage("page_canaux");
    }
  }

  //Affichage du composant: titre, bouton de déconnexion, accès à la page de validation, barre de recherche 
  return (
    <div id="header">
      <p id="header_title">Association de Ski franco-marocaine</p>

      <input
        id="header_search_bar"
        onChange={searchMessage}
        placeholder="Chercher un message ..."
      />

      {props.isAdmin ? (
        <button
          id="header_validation"
          onClick={(e) => {
            e.preventDefault();
            props.setPage("page_validation");
          }}
        >
          Page validation
        </button>
      ) : null}
      <button id="header_logout" onClick={logout}>
        Deconnexion
      </button>
    </div>
  );
}

export default Header;
