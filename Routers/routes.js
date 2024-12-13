const express = require("express");
const { Qrget, SuccessPost, SuccessGet } = require("../controller/controller");
const app = express();

app.get("/connection", Qrget)
app.post("/success", SuccessPost)
app.get("/connected", SuccessGet)


module.exports = app