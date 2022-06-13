/* eslint-disable */
require('dotenv').config()
const express = require('express');

const app = express();

app.use(express.static('./'));

app.listen(process.env.PORT || 3000, function () {
  console.log(`Example app listening on port ${process.env.PORT}!`);
});