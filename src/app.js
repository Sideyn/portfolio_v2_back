// J'importe le package .env pour charger les variables
require("dotenv").config();

// J'importe CORS pour la sécurité
const cors = require("cors");

// J'importe express pour pouvoir mettre en place mon API
// J'indique que App utilisera Express
const express = require("express");
const app = express();
app.use(express.json());

// J'importe mes routes pour créer une liaison entre ma BDD et mon API
const mainRouter = require("./routes");

// J'importe cookie parser pour que app puisse lire les données
const cookieParser = require("cookie-parser");

// Je configure CORS pour autoriser uniquement le front à communiquer avec mon API
// Permet d'avoir accés aux cookies envoyé dans les requetes
app.use(cookieParser());
app.use(
  cors({
    credentials: true,
    origin: process.env.CLIENT_ORIGIN,
  })
);

app.use(function (req, res, next) {
  res.header(
    "Access-Control-Allow-Origin",
    "https://portfolio-sidney.netlify.app/"
  );
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});

// J'indique l'accés à mon dossier public ou se trouve mes assets
app.use("/public", express.static("public"));

// Je créer une route pour constater que mon API fonctionne bien
app.get("/", (req, res) => {
  res.status(200).json({ message: "Hello undefined api !" });
});

// J'indique que /api et ma route principal
app.use("/api", mainRouter);

module.exports = app;
