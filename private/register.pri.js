const {run: dbRun } = require('./db.pri.js');
const { block } = require("./block.pri.js");
const bcrypt = require("bcryptjs");

async function register(body) {
  const { userName, password } = body || {};
  const encrypted_password = await bcrypt.hash(password, 10);
  console.log(userName, encrypted_password);
  let sql = `INSERT INTO user (userName, password) VALUES (?, ?);`;
  let params = [userName, encrypted_password];
  let result = await dbRun(sql, params);
  console.log(result);
  // return { status: 'ok' }; 
  return { result };
}

module.exports = { register };

/*async function register(body) {
  const { userName, password } = body || {};
  console.log(userName, password);
  let sql = `INSERT INTO user (userName, password) VALUES (?, ?)`;
  let params = [userName, password];
  let result = await dbRun(sql, params);
  console.log(result);
  return { status: 'ok' };
}
*/