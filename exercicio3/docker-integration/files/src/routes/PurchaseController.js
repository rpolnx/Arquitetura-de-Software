const express = require("express");
const router = express.Router();
const purchaseService = require('../services/PurchaseService');

// Get All Purchase
router.get("/", async (req, res) => {
    try {
        const purchase = await purchaseService.getPurchasesFromDb();
        res.json(purchase);
    } catch (e) {
        res.status(400);
    }
});

// Get Purchase
router.get("/:id", async (req, res) => {
    try {
        const purchase = await purchaseService.getPurchasesFromDb(req.params.id);
        purchase !== null ? res.json(purchase) : res.status(404).send(`Purchase doesn't exist`);
    } catch (e) {
        res.status(400).send(`Error: ${e}`);
    }
});

// Create Purchase
router.post("/", async (req, res) => {
    try {
        const objVerify = await purchaseService.verifySupplierAndProduct(req.body);
        if (!objVerify.validate) {
            res.status(404).send(objVerify.message);
        } else {
            req.body.total_value = objVerify.price * req.body.quantity
            const purchase = await purchaseService.createPurchase(req.body);
            res.json(purchase);
        }
    } catch (e) {
        res.status(400).send(`Error: ${e}`);
    }
});

// Edit Purchase
router.put("/:id", async (req, res) => {
    try {
        const numberOfUpdatedPurchases = await purchaseService.updatePurchase(req.body, req.params.id);
        (numberOfUpdatedPurchases !== 0) ? res.send("Purchase Updated") : res.send("Purchase was not Found")
    } catch (e) {
        res.status(400).send(`Error: ${e}`);
    }
});

// Delete Purchase
router.delete("/:id", async (req, res) => {
    try {
        const numberOfDeletions = await purchaseService.deletePurchase(req.params.id);
        (numberOfDeletions !== 0) ? res.send("Purchase was deleted!!!") : res.status(404).send("Purchase was not found!!!");
    } catch (e) {
        res.status(400).send(`Error: ${e}`);
    }
});

module.exports = router;