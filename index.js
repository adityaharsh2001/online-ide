const express = require("express");
const cors = require("cors");
const routes = require("./api/routes/routes");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();
const uri = process.env.ATLAS_URI;


mongoose.connect(
  uri,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err) => {
    if (err) throw err;
    console.log("connected to MongoDB");
  }
);
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/", routes);

const PORT=process.env.PORT
app.listen(PORT || 8000, () => {
  console.log(`Listening on port ${PORT}`);
});
