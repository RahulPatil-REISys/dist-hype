const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String },
  email: { type: String, unique: true },
  password: { type: String },
  token: { type: String },
  p_key: { type: String },
});

module.exports = mongoose.model("user", userSchema);