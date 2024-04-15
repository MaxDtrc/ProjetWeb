import { useState } from "react";
import axios from "axios";
axios.defaults.baseURL = "http://localhost:4000";

function NouveauCanal(props) {
  const [newCanal, setNewCanal] = useState("");

  const buttonEvt = (e) => {
    axios
      .put("/api/canal", {
        titre: newCanal,
        id_auteur: "661d3953553493b62677fc6e",
      })
      .then((res) => {
        if (res.data) {
          console.log("Canal ajouté");
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
