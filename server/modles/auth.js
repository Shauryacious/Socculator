const mongoose = require('mongoose');
const { Schema } = mongoose;
const userSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  username: {
    type: String
  },
  mobile: {
    type: Number
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
});

const User = mongoose.model('User', userSchema);
User.createIndexes();

module.exports = User;