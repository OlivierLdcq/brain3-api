const Clarifai = require("clarifai");

const app = new Clarifai.App({
  apiKey: "1d2fa24edb4f42d180ce3e8e1ebb247c",
});

const handleApiCall = (req, res) => {
  app.models
    .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
    .then((data) => res.json(data))
    .catch((err) => res.status(400).json("error on HandleApiCall"));
};

const handleImage = (req, res, db, knex) => {
  db("users")
    .increment("entries", 1)
    .where("email", "=", req.body.email)
    .returning("entries")
    .then((response) => res.json(response[0]));
  //   res.json(req.body.email);
};

module.exports = {
  handleImage: handleImage,
  handleApiCall: handleApiCall,
};
