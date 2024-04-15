import { useState } from "react";
import NouveauCanal from "./NouveauCanal";
import ListeCanaux from "./ListeCanaux";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:4000";

/*

    {
      titre: "Salade de fruits",
      auteur: "Laila",
      date: "21/03/2023 15:15",
      _id: "fgrqegqeq",
    },
    {
      titre: "[Thread] Comment renvoyer les étrangers chez eux",
      auteur: "Laurent",
      date: "21/03/2023 15:15",
      _id: "qehuigqqgr",
    },
    {
      titre: "Zelda TOTK",
      auteur: "Vincent",
      date: "21/03/2023 15:15",
      _id: "qdfgqtghzrth",
    },
    {
      titre: "Recette de riz",
      auteur: "Laura",
      date: "21/03/2023 15:15",
      _id: "qdfgqg",
    },
  ]
   */

function PageCanaux(props) {
  const [lstCanaux, setLstCanaux] = useState([]);

  if (lstCanaux.length == 0) {
    axios.get("/api/canal/all").then((res) => {
      console.log(res);
      setLstCanaux([
        ...lstCanaux,
        {
          titre: "Recette de riz",
          auteur: "Laura",
          date: "21/03/2023 15:15",
          _id: "qdfgqg",
        },
      ]);
    });
  }

  function addToList(canal) {
    setLstCanaux([...lstCanaux, canal]);
  }

  function openCanal(id) {
    props.setPage("fil_discussion");
  }

  return (
    <div id="liste_canaux">
      <NouveauCanal />
      <ListeCanaux lstCanaux={lstCanaux} openCanal={openCanal} />
    </div>
  );
}

export default PageCanaux;
