const express=require('express');
const user=require('../modles/auth');
const bycrypt=require("bcryptjs");
const jsonweb=require("jsonwebtoken");
const { exec } = require('child_process');
const bodyParser = require('body-parser');
require('dotenv').config();
const serect_data="This is very confidential"
const fetchuser=require("../middleware/fetchuser");
const app=express();


//This is for creating a new user
app.post('/', async (req, res) => {
  try {
    let success=false;
    const { email, password, name,mobile } = req.body;

    const existingUser = await user.findOne({ email: email });
    if (existingUser) {
      return res.json({success:success})
    }

    const hashedPassword = await bycrypt.hash(password, 10);
    const newUser = new user({
      email: email,
      name: name,
      password: hashedPassword,
      mobile:mobile
    });

    await newUser.save();
    const id=newUser._id;
    // Create a JWT token with only the user ID as payload
    const token = jsonweb.sign({id:id}, serect_data);
    success=true;
    res.json({ authToken: token,success:success });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});


// This is for  login a user
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const findUser = await user.findOne({ email: email });

    if (!findUser) {
      return res.status(404).send("User with this email does not exist in the database");
    }

    const isPasswordValid =  bycrypt.compare(password, findUser.password);

    if (!isPasswordValid) {
      return res.status(401).send("Incorrect password");
    }
    const id = findUser._id ; // Create a payload object with user ID
    const token = jsonweb.sign({id:id}, serect_data);

    res.json({ authToken: token, success: true });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});



// for getting the details of user
app.post("/fetchuser", fetchuser, async (req, res) => {
  jsonweb.verify(req.token, serect_data, async (err, authData) => {
    if (err) {
      res.status(403).send("Invalid token");
    } else {
      try {
        const findUser = await user.findOne({ _id:authData.id });
        if (findUser) {
          res.json(findUser);
        } else {
          res.status(404).send("User not found");
        }
      } catch (error) {
        console.error('Error querying database:', error.message);
        res.status(500).send("Server error");
      }
    }
  });
});

app.post('/submit', async (req, res) => {
  try {
    const { player, team, opponent, status, model_name } = req.body;
    const command = `python ./python/main.py ${model_name} "${player}" "${team}" "${opponent}" ${status}`;

    console.log(`Executing command: ${command}`);

    exec(command, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error executing Python script: ${error.message}`);
        return res.status(500).send('Error executing script');
      }

      // Combine stdout and stderr
      let combinedOutput = `${stdout}\n${stderr}`;

      // Define the pattern after which content should be removed
      const pattern = "C:\\";

      // Find the position of the pattern
      const patternIndex = combinedOutput.indexOf(pattern);

      // If the pattern is found, truncate the output to just before the pattern
      if (patternIndex !== -1) {
        combinedOutput = combinedOutput.substring(0, patternIndex);
      }

      // Send the cleaned output as a response
      res.json({ success: true, result: combinedOutput });
      console.log(`Python script output: ${combinedOutput}`);
    });
  } catch (error) {
    console.error(`Server error: ${error.message}`);
    res.status(500).send('Server Error');
  }
});
app.post('/getreport', async (req, res) => {
  try {
    const { player } = req.body;
    const command = `python ./python/reportGen.py "${player}"`;

    console.log(`Executing command: ${command}`);

    exec(command, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error executing Python script: ${error.message}`);
        return res.status(500).send('Error executing script');
      }

      // Check for stderr (optional)
      if (stderr) {
        console.error(`Python script stderr: ${stderr}`);
      }

      // Remove any unwanted text from the output if needed
      let jsonString = stdout.trim();

      try {
        // Parse the cleaned JSON string
        let jsonObject = JSON.parse(jsonString);

        // Send the parsed JSON object as a response
        res.json({ success: true, result: jsonObject });
        console.log(`Python script output: ${JSON.stringify(jsonObject)}`);
      } catch (parseError) {
        console.error(`Error parsing JSON output: ${parseError.message}`);
        res.status(500).send('Error parsing JSON output');
      }
    });
  } catch (error) {
    console.error(`Server error: ${error.message}`);
    res.status(500).send('Server Error');
  }
});

module.exports=app;

