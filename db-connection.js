// J'importe le package .env pour charger les variables
require("dotenv").config();

// J'importe le package mySQL
const mysql = require("mysql2");

// Je retranscrit dans un objet toutes mes variables d'environnement du package .env
let config = {
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
};

// if (process.env.NODE_ENV === "test") {
//   config = {
//     database: process.env.DB_NAME_TEST,
//     port: process.env.DB_PORT_TEST,
//     user: process.env.DB_USER_TEST,
//     password: process.env.DB_PASSWORD_TEST,
//     host: process.env.DB_HOST_TEST,
//   };
// }

// J'utilise la méthode mysql.createPool pour mettre en place la connexion avec les variables d'environnement
const connection = mysql.createPool(config);

const query = (...args) => {
  return new Promise((resolve, reject) => {
    connection.query(...args, (err, res) => {
      if (err) {
        reject(err);
      } else {
        resolve(res);
      }
    });
  });
};

const closeConnection = () => {
  return new Promise((resolve, reject) => {
    if (connection) {
      connection.end((err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    } else {
      resolve();
    }
  });
};

module.exports = { connection, closeConnection, query };
