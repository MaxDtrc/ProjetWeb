import { useState } from "react";

import PageFilDiscussion from "./PageFilDiscussion";
import PageCanaux from "./PageCanaux";
import PageAdherents from "./PageAdherents";
import PageRecherche from "./PageRecherche";
import PageProfil from "./PageProfil";
import axios from "axios";

//Composant gérant la partie principale de la page du site
function MainPage(props) {
  const [idCanal, setIdCanal] = useState(0); //Identifiant du canal ouvert
  const [canalDeleted, setCanalDeleted] = useState(false); //Indique si le canal a été supprimé
  const [nomCanal, setNomCanal] = useState(""); //Nom du canal ouvert

  //Si un canal est déjà ouvert alors que l'on se trouve sur la page des canaux, on ouvre la conversation correspondante
  if (idCanal != 0 && props.currentPage == "page_canaux") props.setPage("fil_discussion");

  //Fonction d'ouverture d'un canal
  async function openCanal(id, deleted) {
    setIdCanal(id); //On change l'id du canal ouvert
    setCanalDeleted(deleted); //On indique si le canal est supprimé ou non
    setNomCanal((await axios.get("api/canal/" + id)).data.titre);
    document.getElementById("header_search_bar").value = ""
    props.setRecherche("")
    props.setPage("fil_discussion"); //On change la page sur laquelle on est
  }
    
  //Affichage de la page courante
  switch (props.currentPage) {
    case "fil_discussion":
      //Affichage du fil de discussion
      return (
        <main id="main_page">
          <PageFilDiscussion
            userId={props.userId}
            admin={props.admin}
            setPage={props.setPage}
            idCanal={idCanal}
            setIdCanal={setIdCanal}
            nomCanal={nomCanal}
            setIdProfil={props.setIdProfil}
            canalDeleted={canalDeleted}
          />
        </main>
      );
    case "page_validation":
      //Affichage de la page de validation des utilisateurs
      return (
        <main id="main_page">
          <PageAdherents
            admin={props.admin}
            setPage={props.setPage}
            setIdProfil={props.setIdProfil}
            quit={props.quit}
          />
        </main>
      );
    case "page_recherche":
      //Affichage de la page de recherche
      return (
        <main id="main_page">
          <PageRecherche
            admin={props.admin}
            currentCanal={idCanal}
            page={props.page}
            setPage={props.setPage}
            recherche={props.recherche}
            idCanal={idCanal}
            setIdCanal={props.setIdCanal}
            openCanal={openCanal}
            setIdProfil={props.setIdProfil}
          />
        </main>
      );
    case "page_profil":
      //Affichage de la page de profil
      return (
        <main id="main_page">
          <PageProfil
            setPage={props.setPage}
            idProfil={props.idProfil}
            openCanal={openCanal}
            setIdProfil={props.setIdProfil}
            userId={props.userId}
            admin={props.admin}
            quit={props.quit}
          />
        </main>
      );
    default:
      //Par défaut, on affiche la page de canaux
      return (
        <main id="main_page">
          <PageCanaux
            userId={props.userId}
            admin={props.admin}
            setPage={props.setPage}
            setIdCanal={setIdCanal}
            setIdProfil={props.setIdProfil}
            setCanalDeleted={setCanalDeleted}
            openCanal={openCanal}
          />
        </main>
      );
  }
}

export default MainPage;
