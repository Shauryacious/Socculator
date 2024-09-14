const mongoose = require("mongoose");
require('dotenv').config();

// Assuming the connection string is stored in process.env.MONGO_URI
const uri = process.env.MONGO_URI;

const connect = async () => {
  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1); // Exit process with failure
  }
};

module.exports = connect;
