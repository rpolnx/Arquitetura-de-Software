const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const logger = require('morgan');
const helmet = require('helmet');
const cors = require('cors');

// Connection on Postgres
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('public'));
require("dotenv-safe").load();
app.use(logger('dev'));
app.use(helmet());
app.use(cors());

// -- Routes
app.use("/", require('./routes/IndexController'));
app.use("/category", require('./routes/CategoryController'));
app.use("/purchase", require('./routes/PurchaseController'));
app.use("/supplier", require('./routes/SupplierController'));
app.use("/product", require('./routes/ProductController'));
app.use("/sale", require('./routes/SaleController'));
app.use("/seller", require('./routes/SellerController'));
app.use("/user", require('./routes/UserController'));

app.listen(process.env.PORT, function () {
    console.log("Application started!");
});