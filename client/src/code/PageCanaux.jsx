import { useState } from "react";
import NouveauCanal from "./NouveauCanal";
import ListeCanaux from "./ListeCanaux";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:4000";

function PageCanaux(props) {
  const [lstCanaux, setLstCanaux] = useState([]);

  function update() {
    axios
      .get("/api/canal")
      .then((res) => {
        setLstCanaux(res.data);
      })
      .catch((e) => {
        console.log("Erreur dans l'obtention de la liste des canaux");
      });

    console.log("liste des canaux mise à jour");
  }

  if (lstCanaux.length == 0) {
    update();
  }

  function openCanal(id) {
    props.setPage("fil_discussion");
  }

  return (
    <div id="liste_canaux">
      <NouveauCanal update={update} />
      <ListeCanaux lstCanaux={lstCanaux} openCanal={openCanal} />
    </div>
  );
}

export default PageCanaux;
