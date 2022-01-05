const mockData = require("../../test/utils/mockData");

const getContacts = jest.fn(async () =>
  mockData.mockAPIResponse.map(({ firstName, lastName, email }) => ({
    firstName,
    lastName,
    email: email.toLowerCase()
  }))
);

module.exports = { getContacts };
