import { useState } from "react";
import axios from "axios";
axios.defaults.baseURL = "http://localhost:4000";

function NouveauCanal(props) {
  const [newCanal, setNewCanal] = useState("");

  const buttonEvt = (e) => {
    axios
      .put("/api/canal", {
        titre: newCanal,
        id_auteur: "661a8778bbf66dc7abc1c3c4", //"662404d3f52a681a818e71c2",
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
