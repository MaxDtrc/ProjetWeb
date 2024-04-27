function formaterDate(date){
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

export default formaterDate