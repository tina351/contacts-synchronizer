const express = require("express");
const bodyParser = require("body-parser");

const contactRoutes = require("./contact");

let app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

contactRoutes(app);

app.use((_, res) => {
  res.status(404).send({ code: 404, message: "Resource not found" });
});

module.exports = app;
