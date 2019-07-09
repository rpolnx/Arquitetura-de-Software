const express = require("express");
const router = express.Router();
const saleService = require('../services/SaleService');

// Get All Sale
router.get("/", async (req, res) => {
    try {
        const sale = await saleService.getSalesFromDb();
        res.json(sale);
    } catch (e) {
        res.status(400);
    }
});

// Get Sale
router.get("/:id", async (req, res) => {
    try {
        const sale = await saleService.getSalesFromDb(req.params.id);
        sale !== null ? res.json(sale) : res.status(404).send(`Sale doesn't exist`);
    } catch (e) {
        res.status(400).send(`Error: ${e}`);
    }
});

// Create Sale
router.post("/", async (req, res) => {
    try {
        const objVerify = await saleService.verifySellerAndProduct(req.body);
        if (!objVerify.validate) {
            res.status(404).send(objVerify.message);
        } else {
            req.body.total_value = objVerify.price * req.body.quantity
            const sale = await saleService.createSale(req.body);
            res.json(sale);
        }
    } catch (e) {
        res.status(400).send(`Error: ${e}`);
    }
});

// Edit Sale
router.put("/:id", async (req, res) => {
    try {
        const numberOfUpdatedSales = await saleService.updateSale(req.body, req.params.id);
        (numberOfUpdatedSales !== 0) ? res.send("Sale Updated") : res.send("Sale was not Found")
    } catch (e) {
        res.status(400).send(`Error: ${e}`);
    }
});

// Delete Sale
router.delete("/:id", async (req, res) => {
    try {
        const numberOfDeletions = await saleService.deleteSale(req.params.id);
        (numberOfDeletions !== 0) ? res.send("Sale was deleted!!!") : res.status(404).send("Sale was not found!!!");
    } catch (e) {
        res.status(400).send(`Error: ${e}`);
    }
});

module.exports = router;