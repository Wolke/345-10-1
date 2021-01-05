// sheets
const { GoogleSpreadsheet } = require("google-spreadsheet");

const getStore = async (p) => {
  const doc = new GoogleSpreadsheet(
    "1KU0PsZ2udpWjwGy1aw8uajHzM1IGMHidcf26O88hJWA"
  );

  doc.useServiceAccountAuth({
    client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n")
  });

  await doc.loadInfo();

  // console.log(doc.title);
  let sheet = doc.sheetsById[0];

  return sheet;
};

module.exports = async (p) => {
  let ary = [];
  ary = await getStore(p);
  return ary;
};
