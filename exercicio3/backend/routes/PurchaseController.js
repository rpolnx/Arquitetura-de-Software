const express = require("express");
const router = express.Router();
const Purchase = require('../models/Purchase');
const Supplier = require('../models/Supplier');
const Product = require('../models/Product');
const Category = require('../models/Category');

// Get All Purchase
router.get("/", async (req, res) => {
    try {
        const purchase = await getPurchasesFromDb();
        res.json(purchase);
    } catch (e) {
        res.status(400);
    }
});

// Get Purchase
router.get("/:id", async (req, res) => {
    try {
        const purchase = await getPurchasesFromDb(req.params.id);
        purchase !== null ? res.json(purchase) : res.status(404).send(`Purchase doesn't exist`);
    } catch (e) {
        res.status(400).send(`Error: ${e}`);
    }
});

// Create Purchase
router.post("/", async (req, res) => {
    try {
        const objVerify = await verifySupplierAndProduct(req.body);
        if (!objVerify.validate) {
            res.status(404).send(objVerify.message);
        } else {
            req.body.total_value = objVerify.price * req.body.quantity
            const purchase = await createPurchase(req.body);
            res.json(purchase);
        }
    } catch (e) {
        res.status(400).send(`Error: ${e}`);
    }
});

// Edit Purchase
router.put("/:id", async (req, res) => {
    try {
        const numberOfUpdatedSales = await updatePurchase(req.body, req.params.id);
        (numberOfUpdatedSales !== 0) ? res.send("Purchase Updated") : res.send("Purchase was not Found")
    } catch (e) {
        res.status(400).send(`Error: ${e}`);
    }
});

// Delete Purchase
router.delete("/:id", async (req, res) => {
    try {
        const numberOfDeletions = await deletePurchase(req.params.id);
        (numberOfDeletions !== 0) ? res.send("Purchase was deleted!!!") : res.status(404).send("Purchase was not found!!!");
    } catch (e) {
        res.status(400).send(`Error: ${e}`);
    }
});

const getPurchasesFromDb = async (purchaseId) => {
    const purchasesList = (typeof purchaseId === 'undefined') ? await Purchase.findAll() : await Purchase.findByPk(purchaseId)
    return purchasesList;
}

const verifySupplierAndProduct = async (body) => {
    const supplier = await Supplier.findByPk(body.supplier);
    const category = await Category.findByPk(body.category);
    let product = await Product.findByPk(body.product);
    if (supplier === null && product === null && category === null) {
        return { validate: false, message: "Product and supplier and category was not found" }
    }
    if (supplier == null) {
        return { validate: false, message: "Supplier was not found" }
    }
    if (product === null) {
        return { validate: false, message: "Product was not found" }
    }
    if (category === null) {
        return { validate: false, message: "Category was not found" }
    } else {
        product.quantity += parseInt(body.quantity);
        await Product.update({ quantity: product.quantity }, {
            where: {
                id: body.product
            }
        })
    }
    return { validate: true, price: product.value }
}

const createPurchase = async (body) => {
    body.purchase_time = new Date();
    const purchase = await Purchase.create(body);
    return purchase;
}

const updatePurchase = async (body, purchaseId) => {
    const numberOfUpdatedPurchases = await Purchase.update(body, {
        where: {
            id: purchaseId
        }
    });
    return numberOfUpdatedPurchases[0];
}

const deletePurchase = async (purchaseId) => {
    const numberOfDeletions = await Purchase.destroy({
        where: {
            id: purchaseId
        }
    });
    return numberOfDeletions;
}

module.exports = router;