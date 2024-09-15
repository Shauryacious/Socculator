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
app.listen(port, () => {
})