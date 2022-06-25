// J'importe mon model Admin
const { Admin } = require("../models");

// Je crée une fonction async avec en paramétre une req, une res et parfois si besoin un next()
//  suivi d'un try et un catch et des conditions si besoin

// Exemple pour la premiére fonction:
// 1) Je crée ma fonction async getAdmin() avec en parametres req,res
// 2) Je stocke dans une variable un tableau avec les résultats de mon model appelé via ma class
// 3) Si je n'ai pas d'erreur, je renvoie au format json mes résultats
// 4) Si j'ai une erreur, je renvoie une erreur

// Récupére les informations de l'admin à partir de la bdd
const getAdmin = async (req, res) => {
  try {
    const [results] = await Admin.findAdmin();
    res.json(results);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

// Trouve un admin si il y a bien un id
const getOneAdminById = async (req, res) => {
  try {
    const [result] = await Admin.findOneAdminById(id);
    if (result.length === 0) {
      res.status(404).send(`Admin avec l'id ${id} non trouvé`);
    } else {
      res.status(200).json(result[0]);
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
};

// Crée un admin et hash le mot de passe
const createOneAdmin = async (req, res, next) => {
  const { mail, password } = req.body;
  try {
    const hashedPassword = await Admin.passwordHashing(password);
    const [result] = await Admin.createOne({ mail, hashedPassword });
    req.id = result.insertId;
    next();
  } catch (err) {
    res.status(500).send(err.message);
  }
};

// Vérifie si les informations de connexions sont correcte et que le mdp est bien hashé
const verifyAdminLogin = async (req, res, next) => {
  const { mail, password } = req.body;
  try {
    const [result] = await Admin.findOneAdminByEmail(mail);
    if (!result.length) {
      res.status(401).send("Email ou mot de passe incorrecte");
    } else {
      const validPassword = await Admin.verifyPasswordHash(
        password,
        result[0].hashedPassword
      );
      if (validPassword) {
        req.adminId = result[0].id;
        next();
      } else {
        res.status(401).send("Email ou mot de passe incorrecte");
      }
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
};

// J'exporte mon controller vers mon fichier index.js
module.exports = {
  getAdmin,
  getOneAdminById,
  createOneAdmin,
  verifyAdminLogin,
};
