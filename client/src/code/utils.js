import axios from "axios";
import def from "../assets/default.png";

axios.defaults.baseURL = "http://localhost:4000";
axios.defaults.withCredentials = true;

//Fonction permettant de formater une date au format jj/mm/aaaa hh:mm
export function formaterDate(date) {
  var dateMessage = new Date(date);
  var jour = dateMessage.getDate();
  var jourFormate = jour < 10 ? "0" + jour : jour;
  var mois = dateMessage.getMonth() + 1;
  var moisFormate = mois < 10 ? "0" + mois : mois;
  var annee = dateMessage.getFullYear();
  var heure = dateMessage.getHours();
  var heureFormatee = heure < 10 ? "0" + heure : heure;
  var minutes = dateMessage.getMinutes();
  var minutesFormatees = minutes < 10 ? "0" + minutes : minutes;
  date =
    jourFormate +
    "/" +
    moisFormate +
    "/" +
    annee +
    " " +
    heureFormatee +
    ":" +
    minutesFormatees;
  return date;
}

//Fonction permettant d'obtenir le nom d'un utilisateur en fonction de son id
export async function idToName(id){
  try {
    const auteur = await axios.get("/api/user/" + id);
    const pseudo = auteur.data.username;
    return pseudo;
  } catch (e) {
    return "[Deleted User]";
  }
}

//Fonction permettant d'obtenir l'id d'un utilisateur en fonction de son nom
export async function nameToId(name){
  try {
    const utilisateurs = (await axios.get("/api/user/")).data;
    for(var i = 0; i < utilisateurs.length; i++){
      if(utilisateurs[i].username == name){
        return utilisateurs[i]._id.toString();
      }
    }
    return ""
  } catch (e) {
    return "";
  }
}

export async function idToPhoto(id){
  try{
    //Requête d'obtention de la photo
    const res = await axios.get("/api/user/photo/" + id, { responseType: 'arraybuffer' })
    
    if(res.data){
      //Conversion de la photo
      const blob = new Blob([res.data], { type: 'image/png' });
      const imageUrl = URL.createObjectURL(blob);

      //Return
      console.log("Utils: photo obtenue avec succès !")
      return imageUrl;
    }
    console.log("Utils: l'utilisateur n'a pas de photo")
    return def;
  }
  catch(err){
    //Erreur
    console.log("Utils: erreur lors de l'obtention de la photo")
    return def;
  }
  
}