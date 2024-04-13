const {MongoClient} = require('mongodb');
const { text } = require('stream/consumers');


const uri = "mongodb://127.0.0.1:27017";
const client = new MongoClient(uri);

async function getMessageID(idAuteur, msg){
    await client.connect();
    const c = await client.db("base1").collection("collec1").findOne({
        'auteur': {$eq: idAuteur},
        'txt': {$eq: msg}
    })

    return c._id;
}

async function main(){
    // URI de connexion. À modifier si on n'est pas en local
    
    try {
        // Connexion au serveur
        await client.connect();

        const msg1 = {
            "auteur" : 1704,
            "text" : "salam",
            "date" : new Date()
        }
        const msg2 = {
            "auteur" : 1605,
            "text" : "j'ai mal au ventre et je suis fatiguée et j'ai envie de mourir et je veux un café maintenant mais pas maintenant à 10h45 mais pas quand y a du monde",
            "date": new Date()
        }
        const msg3 = {
            "auteur" : 1704,
            "text" : "arrête de te plaindre",
            "date": new Date()
        }

        const bdd = await client.db("base1").collection("collec1");
        await bdd.deleteMany();
        await bdd.insertOne(msg1);
        await bdd.insertOne(msg2);
        await bdd.insertOne(msg3);

        const c = await bdd.find({
            "auteur" : {$eq: "Laila"}
        });
        const a = await c.toArray();
        
        a.forEach(e => {
            console.log(e.auteur + " : " + e.txt + " (" + e._id + ")");
        });

        const id = await getMessageID(1704, "salam");
        console.log("id: " + id);

        const msg = await bdd.findOne({
            "_id": {$eq: id}
        })

        console.log(msg.auteur + " : " + msg.txt + " (" + msg._id + ")");



    } catch (e) {
        // si une des promesses n'est pas réalisée
        console.error(e);
    } finally {
        // une fois que tout est terminé, on ferme la connexion
        await client.close();
    }
}

// main est une promesse, donc peut afficher un message en cas d'échec
main().catch(console.error);