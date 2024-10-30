const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());

mongoose
  .connect(
    "mongodb+srv://dicki:dicki123@mern-app.2hvyg.mongodb.net/?retryWrites=true&w=majority&appName=mern-app"
  )
  .then(() => {
    app.listen(3000, () => {
      console.log("Express run on port 3000");
    });
  });
