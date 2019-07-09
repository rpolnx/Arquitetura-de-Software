const express = require('express');
const app = require('./src/app');

app.use(express.static('public'));
app.set('views', __dirname + '/public');
app.engine('html', require('ejs').renderFile);
require("dotenv-safe").load();

app.listen(process.env.PORT, function () {
    console.log("Application started!");
});

module.exports = app;