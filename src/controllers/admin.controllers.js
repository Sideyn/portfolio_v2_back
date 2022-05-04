const { Admin } = require("../models");

const getAllAdmins = async (req, res) => {
  try {
    const [results] = await Admin.findMany();
    res.json(results);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const getOneAdminById = async (req, res) => {
  const id = req.params.id ? req.params.id : req.id;
  const statusCode = req.method === "POST" ? 201 : 200;
  try {
    const [result] = await Admin.findOneAdminById(id);
    if (result.length === 0) {
      res.status(404).send(`Admin avec l'id ${id} non trouvé`);
    } else {
      res.status(statusCode).json(result[0]);
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const validateNewAdminData = async (req, res, next) => {
  const { mail } = req.body;
  if (await Admin.mailAlreadyExists(mail)) {
    res.status(401).send(`${mail} est déjà utilisé par un Admin`);
  } else {
    next();
  }
};

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

const deleteOneAdmin = async (req, res) => {
  const { id } = req.params;
  try {
    const [result] = await Admin.deleteOneById(id);
    if (result.affectedRows === 0) {
      res.status(404).send(`Admin avec l'id ${id} non trouvé`);
    } else {
      res.status(200).send(`Admin ${id} supprimé`);
    }
  } catch (err) {
    res
      .status(500)
      .send(`Erreur lors de la suppression de l'admin : ${err.message}`);
  }
};

const verifyAdminLogin = async (req, res, next) => {
  const { mail, password } = req.body;
  try {
    const [result] = await Admin.findOneAdminByEmail(mail);
    if (result.length === 0) {
      res.status(404).send("Cet email n'appartient à aucun utilisateur");
    } else {
      const { hashedPassword } = result[0];
      const validPassword = await Admin.verifyPasswordHash(
        hashedPassword,
        password
      );
      if (!validPassword) {
        res.status(401).send("Mot de passe erroné");
      } else {
        req.adminId = result[0].id;
        next();
      }
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
};

module.exports = {
  getAllAdmins,
  getOneAdminById,
  createOneAdmin,
  deleteOneAdmin,
  validateNewAdminData,
  verifyAdminLogin,
};
