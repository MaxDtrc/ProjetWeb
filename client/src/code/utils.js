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


/*Fonction d'obtention d'une liste de message
idCanal = identifiant du canal dans lequel on recherche le message
condition = fonction de filtre des messages
afficherCanal = booleen pour afficher ou non le canal dans le titre du message
*/
export async function getListeMessages(idCanal, condition, afficherCanal) {
  console.log("Utils: obtention de la liste des messages ...")

  var lst = []; //Création de la liste des messages
  var canaux = []; //Création de la liste des canaux

  try{
    if (idCanal) {
      canaux = [(await axios.get("/api/canal/" + idCanal)).data]; //On cherche dans un canal particulier
    } else {
      canaux = (await axios.get("/api/canal/")).data; //On recherche les messages de tous les canaux
    }
  }
  catch(e){
    //Erreur
    console.log("Utils: Erreur lors de l'obtention des canaux")
    return;
  }

  //Dictionnaire d'optimisation
  var donneesChargees = {}

  //Construction de la liste
  for (var i = 0; i < canaux.length; i++) {
    if(canaux[i].deleted && !idCanal)
      continue;

    for (var j = 0; j < canaux[i].liste_messages.length; j++) {
      var msg = canaux[i].liste_messages[j]; //Récupération du message

      if (condition(msg)) {
        //Le message correspond aux critères de recherche
        msg.id_auteur = msg.auteur; //On copie l'id de l'auteur
        
        //On remplace l'id de l'auteur par son nom
        if(donneesChargees[msg.auteur]){
          msg.auteur = donneesChargees[msg.auteur].nom; //Déjà chargé précedemment, on récupère directement la valeur
        }else{
          const nom = await idToName(msg.auteur); //Requête à la bdd pour l'obtenir
          donneesChargees[msg.auteur] = {'nom': nom};
          msg.auteur = nom;
        }

        //Informations sur le canal
        if(afficherCanal){
          msg.idCanal = canaux[i]._id.toString(); //Ajout de l'id du canal
          msg.canal = canaux[i].titre; //Ajout du titre du canal
          msg.canalDeleted = canaux[i].deleted //Indique si le canal est supprimé (pour le changement de page)
        }
        
        //Informations s'il s'agit d'une réponse
        if(!msg.reply_auteur || !msg.reply_message){
          msg.reply_auteur = ""; msg.reply_message = "";
        }else{
          //On remplace le nom dans le message d'origine auquel on a répondu
          if(donneesChargees[msg.reply_auteur]){
            msg.reply_auteur = donneesChargees[msg.reply_auteur].nom; //Déjà chargé précedemment, on récupère directement la valeur
          }else{
            const nom = await idToName(msg.reply_auteur); //Requête à la bdd pour l'obtenir
            donneesChargees[msg.reply_auteur] = {'nom': nom};
            msg.reply_auteur = nom;
          }
        }

        //Chargement de la photo
        var photo;
        if(donneesChargees[msg.id_auteur].photo)
          photo = donneesChargees[msg.id_auteur].photo
        else{
          donneesChargees[msg.id_auteur].photo = await idToPhoto(msg.id_auteur)
          photo = donneesChargees[msg.id_auteur].photo;
        }
        msg.photo = photo

        //On ajoute le message à la liste
        lst.push(msg);
      }
    }

    
  }

  //On retourne la liste
  console.log("Utils: liste des messages obtenue avec succès !")
  return lst;
}

//Convertit une chaine au format "jj/mm/aaaa" en date.
export function stringToDate(dateString) {
  var parts = dateString.split('/');
  var convertedDate = new Date(parseInt(parts[2]), parseInt(parts[1]) - 1, parseInt(parts[0]));

  return convertedDate;
}