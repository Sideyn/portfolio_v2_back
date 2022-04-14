const jwt = require("jsonwebtoken");

const createToken = (req, res) => {
  const id = req.adminId;
  const token = jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1h" });
  res
    .status(200)
    .cookie("adminToken", token, {
      httpOnly: true,
      sameSite: "strict",
      maxAge: "3600000",
    })
    .json({ id });
};

const verifyToken = (req, res, next) => {
  const { adminToken } = req.cookies;
  if (adminToken) {
    jwt.verify(adminToken, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        res.status(403).send(err.message);
      } else {
        req.adminId = decoded.id;
      }
    });
    next();
  } else {
    res.status(403).send("L'authentification a échouée");
  }
};

module.exports = {
  createToken,
  verifyToken,
};
