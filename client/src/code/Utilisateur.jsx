import "./style/users.css";
import {formaterDate} from "./utils";
import check from "../assets/check.png";
import cross from "../assets/cross.png";

//Composant permettant d'afficher un utilisateur à valider
function Utilisateur(props) {
  
  //Formatage de la date
  var date = props.date ? formaterDate(props.date) : "datenotfound";

  //Affichage du composant: nom, date, boutons de validation
  return (
    <div id="usr">
      <p id="usr_name">{props.username ? props.username : "nom"}</p>
      {!props.valide ?
      <>
        <button
          id="accept"
          title="Accepter"
          onClick={(e) => {
            e.preventDefault();
            props.accept(props.id); //On accepte l'utilisateur
          }}
        >
          <img id="accept_icon" src={check} />
        </button>
        <button
          id="deny"
          title="Refuser"
          onClick={(e) => {
            e.preventDefault();
            props.deny(props.id); //On rejette l'utilisateur
          }}
        >
          <img id="deny_icon" src={cross} />
        </button>
      </> : null}
      <p id="usr_date">{date}</p>
    </div>
  );
}

export default Utilisateur;
