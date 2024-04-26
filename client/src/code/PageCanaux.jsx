import { useState } from "react";
import NouveauCanal from "./NouveauCanal";
import ListeCanaux from "./ListeCanaux";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:4000";

function PageCanaux(props) {
  const [lstCanaux, setLstCanaux] = useState([]);

  async function update() {
    try {
      const res = await axios.get("/api/canal"); // On récupère la liste des canaux
      for (var i = 0; i < res.data.length; i++) {
        try {
          const u = await axios.get("api/user/" + res.data[i].id_auteur); //Pour chaque canal on récupère le nom de l'auteur
          res.data[i].id_auteur = u.data.username; //On remplace l'id par le nom dans le resultat
        } catch (err) {
          res.data[i].id_auteur = "<Deleted User>";
        }
      }
      setLstCanaux(res.data); //Mise à jour de la liste
    } catch (e) {
      console.log("Erreur dans l'obtention de la liste des canaux");
    }
  }

  if (lstCanaux.length == 0) {
    update(); //On met à jour la liste si elle est vide (à ouverture de la page)
  }

  function openCanal(id) {
    props.setIdCanal(id);
    props.setPage("fil_discussion"); //Fonction de l'ouverture du canal
  }

  return (
    <div id="liste_canaux">
      <NouveauCanal userId={props.userId} update={update} />
      <ListeCanaux
        lstCanaux={lstCanaux}
        openCanal={openCanal}
        setPage={props.setPage}
        setIdProfil={props.setIdProfil}
      />
    </div>
  );
}

export default PageCanaux;
