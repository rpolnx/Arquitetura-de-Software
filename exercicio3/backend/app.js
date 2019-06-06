const express = require('express');
const bodyParser = require('body-parser');
const app = express();


// Connection on Postgres
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.set('view engine', 'html');
app.use(express.static('public'));

// -- Routes
app.use("/", require('./routes/index'));
app.use("/category", require('./routes/category'));
app.use("/purchase", require('./routes/purchase'));
app.use("/supplier", require('./routes/supplier'));
app.use("/product", require('./routes/product'));
app.use("/sale", require('./routes/sale'));
app.use("/seller", require('./routes/seller'));

app.listen(3000, function () {
    console.log("Application started!");
});