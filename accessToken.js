const axios = require("axios");
const qs = require("qs");

const accessToken = async () => {
  const data = qs.stringify({
    client_id:
      "860667162783-rlg2di8c6rv4qtc7qpeokg9iv4908pcn.apps.googleusercontent.com",
    client_secret: "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",
    refresh_token:
      "1//0gLOOOyV_eVRCCgYIARAAGBASNwF-L9IrIlUIqveCw1_cJZrMbIVTUf5QpxInsQy886kUtSAZEfkUWxxDaDYFKomU2JI522syr54",
    grant_type: "refresh_token",
  });

  const config = {
    method: "post",
    url: "https://accounts.google.com/o/oauth2/token",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    data,
  };

  const res = await axios(config);
  return res.data.access_token;
};
module.exports = accessToken;
