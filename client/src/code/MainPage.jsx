import { useState } from "react";

import PageLogin from "./PageLogin";
import PageFilDiscussion from "./PageFilDiscussion";
import PageCanaux from "./PageCanaux";
import PageValidation from "./PageValidation";

function MainPage(props) {
  const [currentPage, setPage] = useState("page_utilisateurs");
  const [idCanal, setIdCanal] = useState(0);

  switch (currentPage) {
    case "fil_discussion":
      return (
        <main id="main_page">
          <PageFilDiscussion
            userId={props.userId}
            setPage={setPage}
            idCanal={idCanal}
          />
        </main>
      );
    case "page_utilisateurs":
      return (
        <main id="main_page">
          <PageValidation />
        </main>
      );
    default:
      return (
        <main id="main_page">
          <PageCanaux
            userId={props.userId}
            setPage={setPage}
            setIdCanal={setIdCanal}
          />
        </main>
      );
  }
}

export default MainPage;
