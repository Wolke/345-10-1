const { GoogleSpreadsheet } = require("google-spreadsheet");

const getSheetById = async (id) => {
  const doc = new GoogleSpreadsheet(
    "1rKZEOzNVjJF2GX4cK0fIwNwYEzODBI9qRpHCgTcha4o"
  );
  doc.useServiceAccountAuth({
    client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n")
  });
  await doc.loadInfo();

  let sheet = doc.sheetsById[id];
  return sheet;
};
const addUser = async (p) => {
  let { userId, displayName } = p;
  let sheet = getSheetById(0);
  await sheet.loadCells("A1:D1");
  let c = sheet.getCell(0, 3);
  c.formula = `=MATCH("${userId}",A:A,0)`;
  await sheet.saveUpdatedCells();
  if (c.value > 0) {
  } else {
    sheet.addRow({ userId, displayName });
  }
};
exports.addUser = addUser;

const getStoreList = async () => {
  let sheet = await getSheetById(1281292141);
  await sheet.loadCells(`A1:F1`);
  let c = sheet.getCell(0, 5);
  c.formula = `=COUNTA(A:A)`;
  await sheet.saveUpdatedCells();
  // const rows = await sheet.getRows({ offset: 1 });
  console.log(c.value);
  let cnt = c.value;

  let list = [];
  await sheet.loadCells(`A1:D${cnt}`);
  for (let i = 1; i < cnt; i++) {
    let name = await sheet.getCell(i, 0).value;
    let tel = await sheet.getCell(i, 1).value;
    let address = await sheet.getCell(i, 2).value;
    let region = await sheet.getCell(i, 3).value;
    list.push({ name, tel, address, region });
  }
  return list;
};
getStoreList();

exports.getStoreList = getStoreList;
