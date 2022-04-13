const handleSignin = (req, res, db, knex, bcrypt) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json("unable to login");
  }
  db("login")
    .select("*")
    .where("email", "=", email)
    .then((userLoginInfos) => {
      var isPasswordOk = bcrypt.compareSync(
        password,
        userLoginInfos[0].password
      );
      if (isPasswordOk) {
        db("users")
          .select("*")
          .where("email", "=", userLoginInfos[0].email)
          .then((response) => {
            return res.json(response);
          });
      } else if (!isPasswordOk) {
        return res.json("error");
      }
    })
    .catch((err) => res.json("server side : error signin in"));
};

module.exports = {
  handleSignin: handleSignin,
};
