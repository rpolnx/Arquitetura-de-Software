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
app.use("/categoria", require('./routes/categoria'));
app.use("/compra", require('./routes/compra'));
app.use("/fornecedor", require('./routes/fornecedor'));
app.use("/produto", require('./routes/produto'));
app.use("/venda", require('./routes/venda'));
app.use("/vendedor", require('./routes/vendedor'));

app.listen(3000, function () {
    console.log("Application started!");
});