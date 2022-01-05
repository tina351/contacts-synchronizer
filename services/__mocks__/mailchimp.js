const getListId = jest.fn(async (name) => "list-id");

const subscribeContactsToList = jest.fn(async (contacts, listId) => true);

module.exports = {
  getListId,
  subscribeContactsToList
};
