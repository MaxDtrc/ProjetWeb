import { useState } from "react";

import PageFilDiscussion from "./PageFilDiscussion";
import PageCanaux from "./PageCanaux";
import PageValidation from "./PageValidation";
import PageRecherche from "./PageRecherche";
import PageProfil from "./PageProfil";

//Composant gérant la partie principale de la page du site
function MainPage(props) {
  const [idCanal, setIdCanal] = useState(0); //Identifiant du canal ouvert

  //Si un canal est déjà ouvert alors que l'on se trouve sur la page des canaux, on ouvre la conversation correspondante
  if (idCanal != 0 && props.currentPage == "page_canaux") props.setPage("fil_discussion");
    
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
            setIdProfil={props.setIdProfil}
          />
        </main>
      );
    case "page_validation":
      //Affichage de la page de validation des utilisateurs
      return (
        <main id="main_page">
          <PageValidation setPage={props.setPage} />
        </main>
      );
    case "page_recherche":
      //Affichage de la page de recherche
      return (
        <main id="main_page">
          <PageRecherche
            currentCanal={idCanal}
            page={props.page}
            setPage={props.setPage}
            recherche={props.recherche}
            idCanal={idCanal}
          />
        </main>
      );
    case "page_profil":
      //Affichage de la page de profil
      return (
        <main id="main_page">
          <PageProfil setPage={props.setPage} idProfil={props.idProfil} userId={props.userId} admin={props.admin}/>
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
          />
        </main>
      );
  }
}

export default MainPage;
