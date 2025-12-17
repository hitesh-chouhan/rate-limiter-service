const express = require("express");
const dataRoutes = require("./routes/data.routes");
const app = express();

app.use(express.json());
app.use("/",dataRoutes);

module.exports = app;