import { useState } from "react";

import PageLogin from "./PageLogin";
import PageFilDiscussion from "./PageFilDiscussion";
import PageCanaux from "./PageCanaux";
import PageValidation from "./PageValidation";

function MainPage(props) {
  const [idCanal, setIdCanal] = useState(0);

  switch (props.currentPage) {
    case "fil_discussion":
      return (
        <main id="main_page">
          <PageFilDiscussion
            userId={props.userId}
            setPage={props.setPage}
            idCanal={idCanal}
          />
        </main>
      );
    case "page_validation":
      return (
        <main id="main_page">
          <PageValidation setPage={props.setPage}/>
        </main>
      );
    default:
      return (
        <main id="main_page">
          <PageCanaux
            userId={props.userId}
            setPage={props.setPage}
            setIdCanal={setIdCanal}
          />
        </main>
      );
  }
}

export default MainPage;
