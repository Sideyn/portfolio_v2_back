const jwt = require("jsonwebtoken");

const createToken = (req, resp) => {
  // on recupere l'admin.id et le secret, et on définit la durée du token
  const id = req.adminId;
  const token = jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1h" });
  // on envoie le token dans un cookie nommé userToken, de type token, et protégé par httpOnly (le front ne pourra pas le lire)
  resp
    .status(200)
    .cookie("adminToken", token, {
      httpOnly: true,
      sameSite: "strict",
      maxAge: 3600000,
    })
    .json({ id });
};

const verifyToken = (req, resp, next) => {
  const { adminToken } = req.cookies;
  if (adminToken) {
    // verify recupère decoded ou une erreur si token pas bon
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
