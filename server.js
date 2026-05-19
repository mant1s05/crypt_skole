const express = require("express");
const session = require("express-session");
const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(express.json());
app.use(session({
    secret: "hemmelig-nokkel",
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 30 // 30 minutter
    }
}));

require("./private/db.pri.js");

const { block } = require("./private/block.pri");
const { register } = require("./private/register.pri.js");
const { login } = require("./private/login.pri.js");
const { logout } = require("./private/logout.pri.js");

app.post("/api/block", (req, res) => {
    const verdi = req.body.value;
    const blokk = block(verdi);
    res.json({
        blokk: blokk
    });
});

app.post("/api/register", async (req, res) => {
    try {
        const result = await register(req.body);
        res.json(result);
    } catch (err) {
        console.error(err);
        res.status(500).json({ status: "error", message: err.message });
    }
});

app.post("/api/login", async (req, res) => {
    try {
        const result = await login(req.body);
        if (result.status === "success") {
            req.session.userId = result.idUser;
            req.session.userName = result.userName;
        }
        res.json(result);
    } catch (err) {
        console.error(err);
        res.status(500).json({ status: "error", message: err.message });
    }
});

app.post("/api/logout", async (req, res) => {
    try {
        const result = await logout(req);
        res.clearCookie("connect.sid");
        res.json(result);
    } catch (err) {
        console.error(err);
        res.status(500).json({ status: "error", message: err.message });
    }
});

app.get("/api/session", (req, res) => {
    res.json({
        userId: req.session.userId || null,
        userName: req.session.userName || null
    });
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
