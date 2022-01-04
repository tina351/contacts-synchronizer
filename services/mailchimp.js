const client = require('@mailchimp/mailchimp_marketing');
const keys = require("../config/keys");

client.setConfig({
  apiKey: keys.mailchimpAccessToken,
  server: "us20",
});

const getOrCreateList = async name => {
  const lists = await client.lists.getAllLists();
  console.log(lists);
  // const list = await getList(name);
  // console.log(list)
  // if (list) return list;

  //return await createList(name);
}

const getList = async name => {
  console.log('entra get');
  try {
    return await client.lists.getList(name);
  } catch (err) {
    return undefined;
  }
}

const createList = async name => {
  try {
    return await client.lists.createList({
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
  } catch (err) {
    console.log(err);
    return undefined;
  }
}

module.exports = {
  getOrCreateList
}