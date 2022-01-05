const client = require("@mailchimp/mailchimp_marketing");
const keys = require("../config/keys");
const logger = require("../logger").getLogger();

client.setConfig({
  apiKey: keys.mailchimpAccessToken,
  server: "us20"
});

const getListId = async (name) => {
  try {
    const response = await client.lists.getAllLists();
    const list = response.lists.find((ls) => ls.name === name);
    if (list) return list.id;
  
    return await createList(name);
  } catch (err) {
    logger.err(err);
    return undefined;
  }
};

const createList = async (name) => {
  try {
    const list = await client.lists.createList({
      name,
      permission_reminder: "You signed up for updates on our website",
      email_type_option: true,
      contact: {
        company: "Martin's Company",
        address1: "Street B 123",
        city: "Montevideo",
        state: "Motevideo",
        zip: "11500",
        country: "Uruguay"
      },
      campaign_defaults: {
        from_name: "Martin Long",
        from_email: "martin.long@gmail.com",
        subject: "Martin's Email List",
        language: "English"
      }
    });
    return list.id;
  } catch (err) {
    logger.err(err);
    return undefined;
  }
};

const subscribeContactsToList = async (contacts, listId) => {
  try {
    await client.lists.batchListMembers(listId, {
      update_existing: true,
      members: createMemberListFromEmailList(contacts)
    });
    return true;
  } catch (err) {
    logger.err(err);
    return undefined;
  }
};

const createMemberListFromEmailList = (emailList) => {
  return emailList.map((email) => ({
    email_address: email,
    email_type: "html",
    status: "subscribed"
  }));
};

module.exports = {
  getListId,
  subscribeContactsToList
};
