module.exports = app => {
  const contactsController = require("../controllers/contact");
  app.route("/contacts/sync").get(contactsController.sync);
};
