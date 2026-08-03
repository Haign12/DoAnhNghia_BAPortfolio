const fs = require('fs');
let code = fs.readFileSync('app_v5.js', 'utf8');

const translations = {
  "Hóa đơn điện": "Electricity bill",
  "Mua bột giặt": "Buy detergent",
  "Hóa đơn nước": "Water bill",
  " đã trả ": " paid ",
  "và people nhận ấn": "and receiver clicks",
  "Chỉ payee (people trả tiền ban đầu)": "Only payee (original payer)",
  "người": "people", // Just in case any are left
  "Chỉ payee (the original payer)": "Only payee (original payer)", // In case it translated half
  "và people nhận ấn": "and receiver clicks",
  "people trả tiền ban đầu": "original payer"
};

for (const [vi, en] of Object.entries(translations)) {
  code = code.split(vi).join(en);
}

fs.writeFileSync('app_v5.js', code);
console.log('Translated remaining in app_v5.js');
