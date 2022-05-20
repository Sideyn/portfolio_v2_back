// J'initialise mon serveur en utilisant les variables d'environnement du fichier .env pour écouter les connexions entrantes
require("dotenv").config();

const app = require("./app");

// J'indique que le port à utilisé et dans le fichier .en si je tombe sur le port 5000 c'est qu'il y a certainement un souci avec le port utilisé dans le .env
const port = process.env.PORT || 5000;

// Je crée une fonction pour constater si mon serveur tourne bien sur le bon port
const server = app.listen(port, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log(`Server is running on Port : ${port}`);
  }
});

module.exports = server;
