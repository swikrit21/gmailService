const axios = require("axios");
const qs = require("qs");
const accessToken = require("./accessToken");

class GmailLabel {
  getAllLabel = async () => {
    const config = {
      method: "get",
      url: "https://gmail.googleapis.com/gmail/v1/users/me/labels",
      headers: {
        Authorization: `Bearer ${await accessToken()}`,
      },
    };
    const data = await axios(config);
    console.log(data.data);
  };
  getLabels = async () => {
    const threads = await this.getAllLabel();
  };
}
new GmailLabel().getLabels();
