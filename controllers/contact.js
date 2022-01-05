const mailchimpService = require("../services/mailchimp");
const mockAPIService = require("../services/mockAPI");
const logger = require("../logger").getLogger();

const LIST_NAME = "Martin Long";

const sync = async (_, res) => {
  try {
    const contacts = await mockAPIService.getContacts();
    if (!contacts) {
      return res.status(500).send({ code: 500, message: "Error accessing MockAPI contact list" });
    }

    const listId = await mailchimpService.getListId(LIST_NAME);
    if (!listId) {
      return res.status(500).send({ code: 500, message: "Error accessing Mailchimp email list" });
    }

    const synced = await mailchimpService.subscribeContactsToList(contacts.map(c => c.email), listId);
    if (!synced) {
      return res.status(500).send({ code: 500, message: "Error synchronizing contacts" });
    }

    res.send({ syncedContacts: contacts.length, contacts});
  } catch (err) {
    logger.err(err);
    res.status(500).send({ code: 500, message: "Something went wrong" });
  }
};

module.exports = { sync };
