const { get: dbGet } = require('./db.pri.js');
const bcrypt = require("bcryptjs");

async function login(body) {
  const { userName, password } = body || {};
//  const encrypted_password = await bcrypt.hash(password, 10);
  let sql = 'SELECT * FROM user WHERE username = ?;';
  let params = [userName];
  let result = await dbGet(sql, params);
  const ok = await bcrypt.compare(password, result.password);
  if (ok) {
    return { status: "success", message: "Login successful", idUser: result.idUser, userName: result.userName };
  } else {
    return { error: "Invalid username or password" };
  }
}

module.exports = { login };