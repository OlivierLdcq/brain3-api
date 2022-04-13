const handleRegister = (req, res, db, knex, bcrypt) => {
  const { email, name, password } = req.body;

  var hash = bcrypt.hashSync(password);
  console.log(email);
  console.log(name);
  if (!email || !name || !password) {
    return res.status(400).json("incorect form submit");
  }
  db.transaction((trx) => {
    trx("login")
      .insert({ email: email, password: hash })
      .returning("email")
      .then((loginEmail) => {
        console.log(loginEmail);
        return trx("users")
          .returning("*")
          .insert({
            name: name,
            email: loginEmail[0].email,
            joined: new Date(),
          })
          .then((newUser) => {
            res.json(newUser[0]);
          });
      })
      .then(trx.commit)
      .catch(trx.callback);
  });
};

module.exports = {
  handleRegister: handleRegister,
};
