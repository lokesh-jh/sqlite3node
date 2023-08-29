const express = require("express");
const app = express();
const sequelize = require("./database");
const User = require("./User");
app.use(express.json());
sequelize.sync().then(() => console.log("db is ready"));

app.post("/user", async (req, res) => {
  await User.create(req.body);
  console.log("user is created");
});
app.listen(3000, () => {
  console.log("app is running");
});
