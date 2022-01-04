const client = require("@mailchimp/mailchimp_marketing");
const keys = require("../config/keys");

client.setConfig({
  apiKey: keys.mailchimpAccessToken,
  server: "us20",
});

const getListId = async (name) => {
  const response = await client.lists.getAllLists();
  const list = response.lists.find((ls) => ls.name === name);
  if (list) return list.id;

  return await createList(name);
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
        country: "Uruguay",
      },
      campaign_defaults: {
        from_name: "Martin Long",
        from_email: "martin.long@gmail.com",
        subject: "Martin's Email List",
        language: "English",
      },
    });
    return list.id;
  } catch (err) {
    return undefined;
  }
};

const subscribeContactsToList = async (contacts, listId) => {
  try {
    const response = await client.lists.batchListMembers(listId, {
      update_existing: true,
      members: createMemberListFromEmailList(contacts),
    });
    return { updated: response.updated_members, new: response.new_members };
  } catch (err) {
    console.log(err);
    return undefined;
  }
};

const createMemberListFromEmailList = (emailList) => {
  return emailList.map((email) => ({
    email_address: email,
    email_type: "html",
    status: "subscribed",
  }));
};

module.exports = {
  getListId,
  subscribeContactsToList,
};
