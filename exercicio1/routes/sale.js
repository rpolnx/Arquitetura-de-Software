const express = require("express"),
    router = express.Router(),
    Sale = require('../models/Sale');

let salesMock = [
    {
        id: 1,
        client_id: 1,
        product_id: 1,
        product_quantity: 2,
        total_price: 500.9,
        composition_identifier: "356a192b7913b04c54574d18c28d46e6395428ab",    
        sale_time: new Date(1529900000000),    
        deliver_time: new Date(1539900000000)
    },
    {
        id: 2,
        client_id: 1,
        product_id: 2,
        product_quantity: 1,
        total_price: 300.2,
        composition_identifier: "356a192b7913b04c54574d18c28d46e6395428ab",    
        sale_time: new Date(1529900000000),    
        deliver_time: new Date(1539900000000)
    },
    {
        id: 3,
        client_id: 2,
        product_id: 2,
        product_quantity: 10,
        total_price: 3000.2,
        composition_identifier: "da4b9237bacccdf19c0760cab7aec4a8359010b0",    
        sale_time: new Date(1529900000000),    
        deliver_time: undefined
    }
]

let temporarysalesList = salesMock;


// Get All Sales
router.get("/", function (req, res) {
    res.status(200).json(temporarysalesList);
});

// Get Sale
router.get("/:id", function (req, res) {
    if (saleExists(req.params.id)) {
        res.status(200).json(findSaleById(req.params.id));
    } else {
        res.status(400).send("Sale doesn't exists!!!");
    }

});

// Create Sale
router.post("/", function (req, res) {
    if (!saleExists(req.body.id)) {
        const sale = req.body;
        sale.id = temporarysalesList.length + 1;
        temporarysalesList.push(sale);
        res.status(200).json(sale);
    } else {
        res.status(400).send("Sale already exists!!!");
    }
});

// Edit Sale
router.put("/:id", function (req, res) {
    if (saleExists(req.params.id)) {
        res.status(200).json(findAndUpdate(req.params.id, req.body));
    } else {
        res.status(400).send("Sale doesn't exists!!!");
    }
});

// Delete Sale
router.delete("/:id", function (req, res) {
    if (saleExists(req.params.id)) {
        findAndDelete(req.params.id);
        res.status(200).send("Sale was deleted!!!");
    } else {
        res.status(400).send("Sale doesn't exists!!!");
    }
});

const saleExists = (id) => {
    return temporarysalesList.some(function (element) {
        return element.id == id;
    });
}

const findSaleById = (id) => {
    const sales = temporarysalesList.filter(function (element) {
        return element.id == id;
    });
    return sales.length > 1 ? sales : sales[0];
}

const findAndUpdate = (id, obj) => {
    let sales = {};

    temporarysalesList.forEach(function (element, index) {
        if (id == element.id) {
            temporarysalesList[index] = obj;
            temporarysalesList[index].id = id;
            sales = temporarysalesList[index];
        }
    });
    return sales;
}

const findAndDelete = (id) => {
    temporarysalesList = temporarysalesList.filter(function (element) {
        if (id != element.id) {
            return element;
        }
    });
}


module.exports = router;