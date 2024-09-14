const connect= require('./db');
const express = require('express')
const cors=require('cors');
const { exec } = require('child_process');
require('dotenv').config();
const port=3002;
connect();
const app = express()
app.use(express.json());
app.use(cors());
app.use('/auth',require('./routes/auth'));
const command = "pip install joblib scikit_learn shap xgboost pandas numpy matplotlib";
exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error executing Python script: ${error.message}`);
      return res.status(500).send('Error executing script');
    }

    // Check for stderr (optional)
    if (stderr) {
      console.error(`Python script stderr: ${stderr}`);
    }
})
app.listen(port, () => {
})