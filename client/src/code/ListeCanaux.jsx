import { useState } from "react";
import Canal from "./Canal.jsx";

function ListeCanaux(props) {

  var i = 0;
  return (
    <>
      {[...props.lstCanaux].reverse().map((cnl) => (
        <Canal
          key={i++}
          titre={cnl.titre}
          auteur={cnl.auteur}
          id_auteur={cnl.id_auteur}
          date={cnl.date}
          id={cnl._id}
          openCanal={props.openCanal}
          setPage={props.setPage}
          setIdProfil={props.setIdProfil}
        />
      ))}
    </>
  );
}

export default ListeCanaux;
