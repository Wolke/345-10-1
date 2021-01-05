// sheets
const { GoogleSpreadsheet } = require("google-spreadsheet");

const addUser = async (userId) => {
  const doc = new GoogleSpreadsheet(
    "1rKZEOzNVjJF2GX4cK0fIwNwYEzODBI9qRpHCgTcha4o"
  );

  doc.useServiceAccountAuth({
    client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n")
  });

  await doc.loadInfo();

  console.log(doc.title);
  let sheet = doc.sheetsById[0];
  console.log(userId);
  sheet.addRow({ userId });
  // return sheet;
};
// addUser();

module.exports = addUser;
