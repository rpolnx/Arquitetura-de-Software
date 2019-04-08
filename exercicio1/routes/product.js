const express = require("express"),
    router = express.Router(),
    Product = require('../models/Product');

let mockProduct = [{
    id: 1,
    name: "Tênis Adidas",
    model: "B1",
    description: "Confortável e prático",
    quantity: 50,
    price: 399.90,
    created: Date(),
    updated: undefined
},
{
    id: 2,
    name: "Tênis Adidas",
    model: "B2",
    description: "Confortável e prático",
    quantity: 20,
    price: 199.90,
    created: Date(),
    updated: undefined
}]

let temporaryProductList = mockProduct;

// Get All Products
router.get("/", function (req, res) {
    res.status(200).json(temporaryProductList);
});

// Get Product
router.get("/:id", function (req, res) {
    if (productExists(req.params.id)) {
        res.status(200).json(findProductById(req.params.id));
    } else {
        res.status(400).send("Product doesn't exists!!!");
    }

});

// Create Product
router.post("/", function (req, res) {
    if (!productExists(req.body.id)) {
        const product = req.body;
        product.id = temporaryProductList.length + 1;
        temporaryProductList.push(product);
        res.status(200).json(product);
    } else {
        res.status(400).send("Product already exists!!!");
    }
});

// Edit Product
router.put("/:id", function (req, res) {
    if (productExists(req.params.id)) {
        res.status(200).json(findAndUpdate(req.params.id, req.body));
    } else {
        res.status(400).send("Product doesn't exists!!!");
    }
});

// Delete Product
router.delete("/:id", function (req, res) {
    if (productExists(req.params.id)) {
        findAndDelete(req.params.id);
        res.status(200).send("Product was deleted!!!");
    } else {
        res.status(400).send("Product doesn't exists!!!");
    }
});

const productExists = (id) => {
    return temporaryProductList.some(function (element) {
        return element.id == id;
    });
}

const findProductById = (id) => {
    const products = temporaryProductList.filter(function (element) {
        return element.id == id;
    });
    return products.length > 1 ? products : products[0];
}

const findAndUpdate = (id, obj) => {
    let products = {};

    temporaryProductList.forEach(function (element, index) {
        if (id == element.id) {
            temporaryProductList[index] = obj;
            temporaryProductList[index].id = id;
            products = temporaryProductList[index];
        }
    });
    return products;
}

const findAndDelete = (id) => {
    temporaryProductList = temporaryProductList.filter(function (element) {
        if (id != element.id) {
            return element;
        }
    });
}

const queryDB = async () => {
    return await Product.findAll();
}

module.exports = router;