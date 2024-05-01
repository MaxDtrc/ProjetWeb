import { useState } from "react";
import axios from "axios";

function NouveauCanal(props) {
  const [newCanal, setNewCanal] = useState("");

  const buttonEvt = (e) => {
    axios
      .put("/api/canal", {
        titre: newCanal,
        id_auteur: props.userId,
      })
      .then((res) => {
        if (res.data) {
          console.log("Canal ajouté");
          props.update();
        }
      });
  };

  return (
    <>
      <input onChange={(e) => setNewCanal(e.target.value)} id="nv_cnl" />
      <button onClick={buttonEvt}>Créer le canal</button>
    </>
  );
}

export default NouveauCanal;
