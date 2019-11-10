const GoogleSpreadsheet = require('google-spreadsheet');
const { promisify } = require('util');

const creds = require('./client_secret.json');


async function accessSpreadsheet() {
  const doc = new GoogleSpreadsheet('1wyjB34SdW6VunibZvfIuSJxc6_BnhVWzNObUSqgQD2w');
  await promisify(doc.useServiceAccountAuth)(creds);
  const info = await promisify(doc.getInfo)();
  const sheet = info.worksheets[0];

  const cells = await promisify(sheet.getCells)({
    offset: 1
  });
  cells.forEach(cells => {
    console.log(student.cells);
  })
}

accessSpreadsheet();
