require("dotenv").config();

const app = require("./app");

const port = process.env.PORT || 5000;

const server = app.listen(port, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log(`server is running on Port : ${port}`);
  }
});

module.exports = server;
