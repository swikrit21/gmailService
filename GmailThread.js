const axios = require("axios");
const qs = require("qs");
const accessToken = require("./accessToken");

class GmailThread {
  getAllThread = async () => {
    const config = {
      method: "get",
      url: "https://gmail.googleapis.com/gmail/v1/users/me/threads",
      headers: {
        Authorization: `Bearer ${await accessToken()}`,
      },
    };
    const data = await axios(config);
    console.log(data.data.threads);
  };
  getThreads = async () => {
    const threads = await this.getAllThread();
  };
}
new GmailThread().getAllThread();
