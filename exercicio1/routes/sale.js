const express = require("express");
const router = express.Router();
const Sale = require('../models/Sale');
const Client = require('../models/Client');
const Product = require('../models/Product');

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
        const objVerify = await verifyClientAndProduct(req.body);
        if (!objVerify.validate) {
            res.status(404).send(objVerify.message);
        } else {
            req.body.total_price = objVerify.price * req.body.product_quantity
            const sale = await createSale(req.body);
            res.json(sale)
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

const verifyClientAndProduct = async (body) => {
    const client = await Client.findByPk(body.client_id);
    let product = await Product.findByPk(body.product_id);
    if (client === null && product === null) {
        return { validate: false, message: "Product and client was not found" }
    }
    if (client == null) {
        return { validate: false, message: "Client was not found" }
    }
    if (product === null) {
        return { validate: false, message: "Product was not found" }
    }
    if (product.quantity < body.product_quantity) {
        return { validate: false, message: "There are no products available" }
    } else {
        product.quantity -= body.product_quantity;
        await Product.update({ quantity: product.quantity }, {
            where: {
                id: body.product_id
            }
        })
    }

    return { validate: true, price: product.price }
}

const createSale = async (body) => {
    body.sale_time = new Date();
    body.composition_identifier = generateHash(32);
    const sale = await Sale.create(body);
    return sale;
}

const updateSale = async (body, sale_id) => {
    body.deliver_time = new Date();
    const numberOfUpdatedSales = await Sale.update(body, {
        where: {
            id: sale_id
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

const generateHash = (length) => {
    let hash = "";
    const possible = "abcdefghijklmnopqrstuvwxyz0123456789";
    for (var i = 0; i < length; i++)
        hash += possible.charAt(Math.floor(Math.random() * possible.length));
    return hash;
}


module.exports = router;