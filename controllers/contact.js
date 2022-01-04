const mailchimpService = require("../services/mailchimp");

const LIST_NAME = "Martin Long";

const sync = async (req, res) => {
  try {
    const list = await mailchimpService.getOrCreateList(LIST_NAME);
    if (!list) {
      return res.send({ code: 500, message: "Error creating Mailchimp list" });
    }

    res.send({ code: 200, message: "OK" });
  } catch (err) {
    console.log(err);
    res.send({ code: 500, message: "Something went wrong" });
  }
};

module.exports = { sync };
