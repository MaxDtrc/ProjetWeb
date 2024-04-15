import { useState } from "react";

import PageLogin from "./PageLogin";
import PageFilDiscussion from "./PageFilDiscussion";
import PageCanaux from "./PageCanaux";

function MainPage(props) {
  const [currentPage, setPage] = useState("page_canaux");

  switch (currentPage) {
    case "page_canaux":
      return (
        <main id="main_page">
          <PageCanaux setPage={setPage} />
        </main>
      );
    case "fil_discussion":
      return (
        <main id="main_page">
          <PageFilDiscussion setPage={setPage} />
        </main>
      );
    default:
      return (
        <main id="main_page">
          <PageCanaux setPage={setPage} />
        </main>
      );
  }
}

export default MainPage;
