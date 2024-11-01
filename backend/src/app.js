const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const routes = require("./routes/v1");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.use("/v1", routes);

console.clear();
console.log("Connecting...");

mongoose
  .connect(
    "mongodb+srv://dicki:dicki123@mern-app.2hvyg.mongodb.net/?retryWrites=true&w=majority&appName=mern-app"
  )
  .then(() => {
    app.listen(3000, () => {
      console.clear()
      console.log("Express run on port 3000");
    });
  });
