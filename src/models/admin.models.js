// J'importe le package argon2 qui sert à hasher un password
const argon2 = require("argon2");

// J'importe les infos pour me connecter à ma BDD
const { connection } = require("../../db-connection");

const hashingOptions = {
  type: argon2.argon2id,
  memoryCost: 2 ** 16,
  timeCost: 5,
  parallelism: 1,
};

// Je crée une Class qui contient des fonctions/méthodes avec le mot clé static
// Le mot clé static me permet d'appeler une fonction sans créer un nouvel objet lié à la class

// Exemple pour la premiére méthode:
// 1) Je crée la méthode findMany(),
// 2) Je stocke dans une variable la requête SQL qui va me permettre de sélectionner l'id ainsi que le mail de l'admin
// 3) Je me connecte avec "connection"
// 4) Je fais une promesse via promise() en attendant la connection
// 5) Je lui passe la requête SQL avec query()

// Dans le cas ou il y aurait un paramétre je le place dans un tableau à la suite de ma requête via query()

class Admin {
  static findAdmin() {
    const sql = "SELECT id, mail FROM admin";
    return connection.promise().query(sql);
  }

  static findOneAdminById(id) {
    const sql = "SELECT * FROM admin WHERE id=?";
    return connection.promise().query(sql, [id]);
  }

  static findOneAdminByEmail(mail) {
    const sql = "SELECT * FROM admin WHERE mail=?";
    return connection.promise().query(sql, [mail]);
  }

  // Je vérifie que le password est exact
  static async verifyPassword(hashedPassword) {
    const sql = "SELECT hashedPassword FROM admin WHERE mail=?";
    return connection.promise().query(sql, [hashedPassword]);
  }

  // Hash le password via argon2
  static async passwordHashing(password) {
    const hashedPassword = await argon2.hash(password, hashingOptions);
    return hashedPassword;
  }

  // Je vérifie que le password a bien été hashé et qu'il est valide
  static async verifyPasswordHash(password, hashedPassword) {
    const valid = await argon2.verify(hashedPassword, password);
    return valid;
  }

  static createOne(admin) {
    const sql = "INSERT INTO admin SET ?";
    return connection.promise().query(sql, [admin]);
  }
}

// J'exporte mon model Admin pour créer mes controllers
module.exports = Admin;
