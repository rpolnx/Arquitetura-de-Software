const express = require("express");
const router = express.Router();
const Sale = require('../models/Sale');
const Seller = require('../models/Seller');
const Product = require('../models/Product');
const Category = require('../models/Category');

// Get All Sale
router.get("/", async (req, res) => {
    try {
        const sale = await getSalesFromDb();
        res.json(sale);
    } catch (e) {
        res.status(400);
    }
});

// Get Sale
router.get("/:id", async (req, res) => {
    try {
        const sale = await getSalesFromDb(req.params.id);
        sale !== null ? res.json(sale) : res.status(404).send(`Sale doesn't exist`);
    } catch (e) {
        res.status(400).send(`Error: ${e}`);
    }
});

// Create Sale
router.post("/", async (req, res) => {
    try {
        const objVerify = await verifySellerAndProduct(req.body);
        if (!objVerify.validate) {
            res.status(404).send(objVerify.message);
        } else {
            req.body.total_value = objVerify.price * req.body.quantity
            const sale = await createSale(req.body);
            res.json(sale);
        }
    } catch (e) {
        res.status(400).send(`Error: ${e}`);
    }
});

// Edit Sale
router.put("/:id", async (req, res) => {
    try {
        const numberOfUpdatedSales = await updateSale(req.body, req.params.id);
        (numberOfUpdatedSales !== 0) ? res.send("Sale Updated") : res.send("Sale was not Found")
    } catch (e) {
        res.status(400).send(`Error: ${e}`);
    }
});

// Delete Sale
router.delete("/:id", async (req, res) => {
    try {
        const numberOfDeletions = await deleteSale(req.params.id);
        (numberOfDeletions !== 0) ? res.send("Sale was deleted!!!") : res.status(404).send("Sale was not found!!!");
    } catch (e) {
        res.status(400).send(`Error: ${e}`);
    }
});

const getSalesFromDb = async (saleId) => {
    const saleList = (typeof saleId === 'undefined') ? await Sale.findAll() : await Sale.findByPk(saleId)
    return saleList;
}

const verifySellerAndProduct = async (body) => {
    const seller = await Seller.findByPk(body.seller);
    const category = await Category.findByPk(body.category);
    let product = await Product.findByPk(body.product);
    if (seller === null && product === null && category === null) {
        return { validate: false, message: "Product and seller and category was not found" }
    }
    if (seller == null) {
        return { validate: false, message: "seller was not found" }
    }
    if (product === null) {
        return { validate: false, message: "Product was not found" }
    }
    if (category === null) {
        return { validate: false, message: "category was not found" }
    }
    if (product.minimal_quantity > body.quantity) {
        return { validate: false, message: `Minimal quantity is: ${product.minimal_quantity}.` }
    }
    if (product.quantity < body.quantity) {
        return { validate: false, message: `No enough products. Product left: ${product.quantity}.` }
    } else {
        product.quantity -= parseInt(body.quantity);
        await Product.update({ quantity: product.quantity }, {
            where: {
                id: body.quantity
            }
        })
    }
    return { validate: true, price: product.value }
}

const createSale = async (body) => {
    body.sale_time = new Date();
    const sale = await Sale.create(body);
    return sale;
}

const updateSale = async (body, saleId) => {
    const numberOfUpdatedSales = await Sale.update(body, {
        where: {
            id: saleId
        }
    });
    return numberOfUpdatedSales[0];
}

const deleteSale = async (saleId) => {
    const numberOfDeletions = await Sale.destroy({
        where: {
            id: saleId
        }
    });
    return numberOfDeletions;
}

module.exports = router;