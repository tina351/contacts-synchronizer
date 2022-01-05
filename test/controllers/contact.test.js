const request = require("supertest");
const app = require("../../routes");
const mockData = require("../utils/mockData");

jest.mock("../../services/mockAPI");
jest.mock("../../services/mailchimp");

describe("Sync contacts", () => {
  describe("When MockAPI request succeeds and Mailchimp list access succeeds and Mailchimp batch list members succeeds", () => {
    test("It should return count of synced contacts and the contact list", async () => {
      const response = await request(app).get("/contacts/sync");
      expect(response.statusCode).toBe(200);
      expect(response.body.syncedContacts).toBe(mockData.mockAPIResponse.length);
      expect(response.body.contacts).toEqual(
        mockData.mockAPIResponse.map(({ firstName, lastName, email }) => ({
          email: email.toLocaleLowerCase(),
          firstName,
          lastName
        }))
      );
    });
  });

  describe("When MockAPI request fails", () => {
    test("It should return 500 error code", async () => {
      const mockAPIService = require("../../services/mockAPI");
      mockAPIService.getContacts.mockImplementationOnce(async () => undefined);
      const response = await request(app).get("/contacts/sync");
      expect(response.statusCode).toBe(500);
      expect(response.body.message).toBe(
        "Error accessing MockAPI contact list"
      );
    });
  });

  describe("When Mailchimp email list can't be accessed", () => {
    test("It should return 500 error code", async () => {
      const mailchimpService = require("../../services/mailchimp");
      mailchimpService.getListId.mockImplementationOnce(async () => undefined);
      const response = await request(app).get("/contacts/sync");
      expect(response.statusCode).toBe(500);
      expect(response.body.message).toBe(
        "Error accessing Mailchimp email list"
      );
    });
  });

  describe("When Mailchimp batch list members fails", () => {
    test("It should return 500 error code", async () => {
      const mailchimpService = require("../../services/mailchimp");
      mailchimpService.subscribeContactsToList.mockImplementationOnce(async () => undefined);
      const response = await request(app).get("/contacts/sync");
      expect(response.statusCode).toBe(500);
      expect(response.body.message).toBe(
        "Error synchronizing contacts"
      );
    });
  });
});
