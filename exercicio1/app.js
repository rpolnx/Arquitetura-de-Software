const express = require('express'),
    bodyParser = require('body-parser'),
    app = express();


// Connection on Postgres
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.set('view engine', 'html');
app.use(express.static('public'));

// -- Routes
app.use("/", require('./routes/index'));
app.use("/client", require('./routes/client'));
app.use("/product", require('./routes/product'));
app.use("/sale", require('./routes/sale'));

app.listen(3000, function () {
    console.log("Application started!");
});