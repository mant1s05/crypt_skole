const express = require("express");
const session = require("express-session");
const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(express.json());
app.use(session({
  secret: "hemmelig-nøkkel",
  resave: false,
  saveUninitialized: false,
  cookie: {  
    maxAge: 1000 * 60 * 30 // 30 minutter
  }
}));

require("./private/db.pri.js");

const { block } = require("./private/block.pri");
const { run: dbRun } = require('./private/db.pri.js');
const { register } = require("./private/register.pri.js");
const { login } = require("./private/login.pri.js");

app.post("/api/block", (req, res) => {
    const verdi = req.body.value;
//    console.log("Mottatt verdi:", verdi);
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
  console.log(req.body);
  try {
    const result = await login(req.body);
    if (result.status === "success") {
      req.session.userId = result.idUser;
      req.session.userName = result.userName;
      console.log(req.session);
    }
    res.json(result);
    console.log(result);
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

