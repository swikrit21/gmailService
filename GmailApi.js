var axios = require("axios");
var qs = require("qs");

class GmailAPI {
  accessToken = "";
  constructor() {
    this.accessToken =
      "ya29.a0Ael9sCN6p8brDmVBQhk4llUpo5hQv4t3LnQqPVk7QjkORr_SfswTmIBFciRdpoo7-1Kgj8UL4kXCtt-G-qzbo9nd76CoUkFNSAPTzWvDkbYMLcrb4Z63bCISAY0EdBRpsYQqKvIIGAaqqkj-5ZR-0y9V1eTlnZsaCgYKAUMSARASFQF4udJhzVszaE54Kc_KQRgX3nA2nw0166";
  }

  searchGmail = async (searchItem) => {
    const config1 = {
      method: "get",
      url:
        "https://www.googleapis.com/gmail/v1/users/me/messages?q=" + searchItem,
      headers: {
        Authorization: `Bearer ya29.a0Ael9sCN6p8brDmVBQhk4llUpo5hQv4t3LnQqPVk7QjkORr_SfswTmIBFciRdpoo7-1Kgj8UL4kXCtt-G-qzbo9nd76CoUkFNSAPTzWvDkbYMLcrb4Z63bCISAY0EdBRpsYQqKvIIGAaqqkj-5ZR-0y9V1eTlnZsaCgYKAUMSARASFQF4udJhzVszaE54Kc_KQRgX3nA2nw0166`,
      },
    };
    var threadId = "";

    await axios(config1)
      .then(async function (response) {
        console.log(response?.data);
        threadId = await response?.data["messages"][0]?.id;

        console.log("ThreadId = " + threadId);
      })
      .catch(function (error) {
        console.log(error);
      });

    return threadId;
  };

  readGmailContent = async (messageId) => {
    const config = {
      method: "get",
      url: `https://gmail.googleapis.com/gmail/v1/users/me/messages/${messageId}`,
      headers: {
        Authorization: `Bearer ya29.a0Ael9sCN6p8brDmVBQhk4llUpo5hQv4t3LnQqPVk7QjkORr_SfswTmIBFciRdpoo7-1Kgj8UL4kXCtt-G-qzbo9nd76CoUkFNSAPTzWvDkbYMLcrb4Z63bCISAY0EdBRpsYQqKvIIGAaqqkj-5ZR-0y9V1eTlnZsaCgYKAUMSARASFQF4udJhzVszaE54Kc_KQRgX3nA2nw0166`,
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

  readInboxContent = async (searchText) => {
    const threadId = await this.searchGmail(searchText);
    const message = await this.readGmailContent(threadId);

    const encodedMessage = await message.payload["parts"][0].body.data;

    const decodedStr = Buffer.from(encodedMessage, "base64").toString("ascii");

    console.log(decodedStr);

    return decodedStr;
  };
}

module.exports = new GmailAPI();
