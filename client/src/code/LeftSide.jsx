import { useState } from "react";
import Information from "./Information.jsx";
import "./style/informations.css";
function LeftSide() {
  return (
    <div id="left_side">
      <Information
        text="Le roi du Maroc a rejoint l'association !"
        date="17/04/2004 - 13h47"
      />
      <Information
        text="Vincent a rejoint l'association !"
        date="17/04/2004 - 14h50"
      />
      <Information
        text="Laura a quitté l'association ..."
        date="17/04/2004 - 15h30"
      />
      <Information
        text="Laïla a ouvert le canal : Recette du tajine de Tatie Mounya"
        date="18/04/2004 - 16h17"
      />
    </div>
  );
}

export default LeftSide;
