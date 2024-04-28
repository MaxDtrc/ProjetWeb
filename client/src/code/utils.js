import axios from "axios";
axios.defaults.baseURL = "http://localhost:4000";

export function formaterDate(date) {
  var dateMessage = new Date(date);
  var jour = dateMessage.getDate();
  var jourFormatte = jour < 10 ? "0" + jour : jour;
  var mois = dateMessage.getMonth() + 1;
  var moisFormatte = mois < 10 ? "0" + mois : mois;
  var annee = dateMessage.getFullYear();
  var heure = dateMessage.getHours();
  var heureFormattee = heure < 10 ? "0" + heure : heure;
  var minutes = dateMessage.getMinutes();
  var minutesFormattees = minutes < 10 ? "0" + minutes : minutes;
  date =
    jourFormatte +
    "/" +
    moisFormatte +
    "/" +
    annee +
    " " +
    heureFormattee +
    ":" +
    minutesFormattees;
  return date;
}

export async function idToName(id){
  try {
    const auteur = await axios.get("/api/user/" + id);
    const pseudo = auteur.data.username;
    return pseudo;
  } catch (e) {
    return "<Deleted User>";
  }
}

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