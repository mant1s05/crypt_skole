const {run: dbRun } = require('./db.pri.js');
const bcrypt = require("bcryptjs");

async function register(body) {
  const { userName, password } = body || {};
  const encrypted_password = await bcrypt.hash(password, 10);
  let sql = `INSERT INTO user (userName, password) VALUES (?, ?);`;
  let params = [userName, encrypted_password];
  let result = await dbRun(sql, params);
  // return { status: 'ok' }; 
  return { result };
}

async function reset(body) {
  const { userName, password } = body || {};
  const encrypted_password = await bcrypt.hash(password, 10);
  let sql = `UPDATE user SET password = ? WHERE userName = ?;`;
  let params = [encrypted_password, userName];
  let result = await dbRun(sql, params);
  return { result };
}

module.exports = { register, reset };

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
