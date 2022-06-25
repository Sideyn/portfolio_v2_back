// J'importe le package JWT
const jwt = require("jsonwebtoken");

// Je crée le token
const createToken = (req, resp) => {
  // Je récupere l'admin.id et le secret, et je définis la durée du token
  const id = req.adminId;
  const token = jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1h" });

  // J'envoie le token dans un cookie nommé userToken, de type token, et protégé par httpOnly (le front ne pourra pas le lire)
  resp
    .status(200)
    .cookie("adminToken", token, {
      httpOnly: true,
      sameSite: "strict",
      maxAge: 3600000,
    })
    .json({ id });
};

// Je vérifie si le token est bon
const verifyToken = (req, resp, next) => {
  const { adminToken } = req.cookies;
  if (adminToken) {
    // verify recupère decoded ou une erreur si le token n'est pas bon
    jwt.verify(adminToken, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        resp.status(403).send(err.message);
      } else {
        req.adminId = decoded.id;
      }
    });
    next();
  } else {
    resp.status(403).send("L'authentification a échouée");
  }
};

module.exports = {
  createToken,
  verifyToken,
};
