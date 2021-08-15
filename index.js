const express = require("express");
const cors = require("cors");
const routes = require("./api/routes/routes")
const app = express();


app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/", routes);

app.listen(5000, () => {
  console.log(`Listening on port 5000!`);
});
