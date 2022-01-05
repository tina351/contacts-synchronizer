const axios = require("axios");
const logger = require("../logger").getLogger();

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
    logger.err(err);
    return undefined;
  }
};

module.exports = {
  getContacts,
};
