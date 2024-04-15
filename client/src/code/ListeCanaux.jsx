import { useState } from "react";
import Canal from "./Canal.jsx";

function ListeCanaux(props) {
  return (
    <>
      {[...props.lstCanaux].reverse().map((cnl) => (
        <Canal
          titre={cnl.titre}
          auteur={cnl.auteur}
          date={cnl.date}
          id={cnl._id}
          openCanal={props.openCanal}
        />
      ))}
    </>
  );
}

export default ListeCanaux;
