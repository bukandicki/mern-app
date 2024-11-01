const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  last_login: { type: Date, default: null },
  last_logout: { type: Date, default: null }
});

userSchema.pre("save", async function (next) {
    const user = this

    if (user.isModified("password")) {
      user.password = await bcrypt.hash(user.password, 8);
    }
    next()
})

const User = mongoose.model("User", userSchema);

module.exports = User;
