const express = require("express");
const routes = require("./api/routes/routes");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", routes);

app.get("/", (req, res) => {
  res.json({ hello: "world" });
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));
