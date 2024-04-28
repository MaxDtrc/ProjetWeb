import { useState } from "react";

import PageFilDiscussion from "./PageFilDiscussion";
import PageCanaux from "./PageCanaux";
import PageValidation from "./PageValidation";
import PageRecherche from "./PageRecherche";
import PageProfil from "./PageProfil";

function MainPage(props) {
  const [idCanal, setIdCanal] = useState(0);

  if (idCanal != 0 && props.currentPage == "page_canaux")
    props.setPage("fil_discussion");

  switch (props.currentPage) {
    case "fil_discussion":
      return (
        <main id="main_page">
          <PageFilDiscussion
            userId={props.userId}
            setPage={props.setPage}
            idCanal={idCanal}
            setIdCanal={setIdCanal}
            setIdProfil={props.setIdProfil}
          />
        </main>
      );
    case "page_validation":
      return (
        <main id="main_page">
          <PageValidation setPage={props.setPage} />
        </main>
      );
    case "page_recherche":
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
      return (
        <main id="main_page">
          <PageProfil setPage={props.setPage} idProfil={props.idProfil}/>
        </main>
      );
    default:
      return (
        <main id="main_page">
          <PageCanaux
            userId={props.userId}
            setPage={props.setPage}
            setIdCanal={setIdCanal}
            setIdProfil={props.setIdProfil}
          />
        </main>
      );
  }
}

export default MainPage;
