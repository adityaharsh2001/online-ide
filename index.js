const express = require("express");
const routes = require("./routes/routes");
const app = express();
const mongoose = require("mongoose");
require('dotenv').config();
const uri = process.env.ATLAS_URI;
const path = require("path");
const cors = require("cors");

mongoose.connect(
  uri,
  (err) => {
    if (err) throw err;
    console.log("connected to MongoDB");
  }
);

app.use(cors({
  allowOrigin: "*",
  AccessControlAllowOrigin: "*",
}));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api", routes);

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './client/public', 'index.html'));
});

const PORT = process.env.NODE_DOCKER_PORT || 8080;
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
