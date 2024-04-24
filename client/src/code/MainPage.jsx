import { useState } from "react";

import PageLogin from "./PageLogin";
import PageFilDiscussion from "./PageFilDiscussion";
import PageCanaux from "./PageCanaux";

function MainPage(props) {
  const [currentPage, setPage] = useState("page_canal");
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
