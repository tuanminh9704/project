const mongoose = require("mongoose");
const genarate = require("../helpers/genarate");

const accountSchema = new mongoose.Schema({
  fullName: String,
  email: String,
  password: String,
  phone: String,
  avatar: String,
  token: {
    type: String,
    default: genarate.randomString(20)
  }, 
  role_id: String,
  status: String,
  deleted: {
    type: Boolean,
    default: false
  },
  deletedAt: Date
},{
  timestamps:true
});

const Account = mongoose.model("Account", accountSchema, "accounts");

module.exports = Account;