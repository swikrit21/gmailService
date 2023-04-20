const axios = require("axios");

const gmail = require("./GmailApi");
const accessToken = require("./accessToken");

class createDraftAndlabel {
  constructor(mail) {
    this.mail = mail;
  }
  readMail = async () => {
    const readMail = await gmail.readInboxContent(this.mail);
    return readMail;
  };

  createLabel = async () => {
    try {
      const config = {
        method: "post",
        url: "https://gmail.googleapis.com/gmail/v1/users/me/labels",
        headers: {
          Authorization: `Bearer ${await accessToken()}`,
        },
        data: {
          labelListVisibility: "labelShow",
          messageListVisibility: "show",
          name: "sulabh",
        },
      };
      const label = await axios(config);
      console.log(label);
    } catch (error) {
      console.log(error);
    }
  };

  createDraft = async () => {
    try {
      const config1 = {
        method: "post",
        //url: "https://gmail.googleapis.com/upload/gmail/v1/users/me/drafts",
        url: "https://gmail.googleapis.com/gmail/v1/users/me/drafts",
        headers: {
          Authorization: `Bearer ${await accessToken()}`,
        },
        data: {
          message: {
            raw: Buffer.from("hi there", "utf8").toString("hex"),
          },
        },
      };

      const draft = await axios(config1);
      console.log(draft, "draft");
    } catch (error) {
      console.log(error);
    }
  };
  createDraftsAndLabel = async () => {
    try {
      const data = await this.readMail();
      if (data.search(/aaaaasaaaaddgdyt/i) !== -1) {
        await this.createLabel();
        await this.createDraft();
      } else {
        console.log("no search");
      }
    } catch (error) {
      console.log(error);
    }
  };
}

new createDraftAndlabel("swikrit@fusemachines.com").createDraftsAndLabel();
