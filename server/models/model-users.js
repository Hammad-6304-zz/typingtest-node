var mongoose = require("mongoose");

const userSchema = {
  username: String,
  email: String,
  password: String,
  date: String,
  time: String,
  firstName:String,
  lastName:String,
  img:String,
  facebook:String
};
const User = mongoose.model("User", userSchema);

module.exports = User;
