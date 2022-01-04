const axios = require("axios");

const CONTACTS_API_URL =
  "https://613b9035110e000017a456b1.mockapi.io/api/v1/contacts";

const getContacts = async () => {
  try {
    const response = await axios.get(CONTACTS_API_URL);
    return response.data.map(({ firstName, lastName, email }) => ({
      firstName,
      lastName,
      email: email.toLowerCase(),
    }));
  } catch (err) {
    console.log(err);
    return undefined;
  }
};

module.exports = {
  getContacts,
};
