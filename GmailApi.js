const axios = require("axios");
const accessToken = require("./accessToken");

class GmailAPI {
  //search gmail

  searchGmail = async (searchItem) => {
    const config1 = {
      method: "get",
      url:
        "https://www.googleapis.com/gmail/v1/users/me/messages?q=" + searchItem,
      headers: {
        Authorization: `Bearer ${await accessToken()}`,
      },
    };
    let threadId = "";

    await axios(config1)
      .then(async function (response) {
        console.log(response);
        threadId = await response?.data["messages"][0]?.id;
      })
      .catch(function (error) {
        console.log(error);
      });

    return threadId;
  };

  //read gmail content

  readGmailContent = async (messageId) => {
    const config = {
      method: "get",
      url: `https://gmail.googleapis.com/gmail/v1/users/me/messages/${messageId}`,
      headers: {
        Authorization: `Bearer ${await accessToken()}`,
      },
    };

    let data = {};

    await axios(config)
      .then(async function (response) {
        data = await response.data;
      })
      .catch(function (error) {
        console.log(error);
      });

    return data;
  };

  //read inbox message
  readInboxContent = async (searchText) => {
    const threadId = await this.searchGmail(searchText);
    const message = await this.readGmailContent(threadId);

    const encodedMessage = await message.payload["parts"][0].body.data;

    const decodedStr = Buffer.from(encodedMessage, "base64").toString("ascii");

    return decodedStr;
  };
}

module.exports = new GmailAPI();
