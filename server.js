const express = require("express");
const cors = require("cors");
const knex = require("knex");
const app = express();
const bcrypt = require("bcrypt-nodejs");
const { response } = require("express");
const register = require("./controllers/register");
const signin = require("./controllers/signin");
const image = require("./controllers/image");

app.use(express.json());
app.use(cors());
const db = knex({
  client: "pg",
  connection: {
    host: "127.0.0.1",
    user: "olivierleducq",
    port: "5432",
    password: "",
    database: "brain3",
  },
});

app.post("/signin", (req, res) => {
  signin.handleSignin(req, res, db, knex, bcrypt);
});
app.post("/register", (req, res) => {
  register.handleRegister(req, res, db, knex, bcrypt);
});
app.put("/image", (req, res) => {
  image.handleImage(req, res, db, knex, bcrypt);
});
app.post("/imageUrl", (req, res) => {
  image.handleApiCall(req, res, db, knex, bcrypt);
});

app.listen(3000, console.log(`App is running on 3000`));
