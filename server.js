/* eslint-disable */
require('dotenv').config()
const express = require('express');

const app = express();

const path = require('path');

app.use(express.static('./dist'));

app.get('/', (req, res) => {
	res.sendFile(__dirname + './dist/index.html');
});

app.listen(process.env.PORT || 3000, function () {
  console.log(`Example app listening on port ${process.env.PORT}!`);
});