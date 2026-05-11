const { get: dbGet } = require("./db.pri.js");
const bcrypt = require("bcryptjs");

async function login(body) {
    const { userName, password } = body || {};
    const sql = "SELECT * FROM user WHERE userName = ?;";
    const params = [userName];
    const result = await dbGet(sql, params);

    if (!result) {
        return {
            status: "error",
            message: "Invalid username or password"
        };
    }

    const ok = await bcrypt.compare(password, result.password);
    if (!ok) {
        return {
            status: "error",
            message: "Invalid username or password"
        };
    }

    return {
        status: "success",
        message: "Login successful",
        idUser: result.idUser,
        userName: result.userName
    };
}

module.exports = { login };
