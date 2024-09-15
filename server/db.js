const mongoose = require("mongoose");
require('dotenv').config();
const uri="mongodb://localhost:27017/IIT_Naya_Raipur";
const connect = async () => {
  await mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log("connected to Mongoose");
};

module.exports = connect;