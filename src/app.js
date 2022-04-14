require("dotenv").config();
const cors = require("cors");
const express = require("express");
const app = express();
const mainRouter = require("./routes");

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    credentials: true,
    origin: process.env.CLIENT_ORIGIN,
  })
);

app.use("/public", express.static("public"));

app.get("/", (req, res) => {
  res.status(200).json({ message: "Hello undefined api !" });
});

app.use("/api", mainRouter);

module.exports = app;
