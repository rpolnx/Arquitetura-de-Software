const express = require("express");
const router = express.Router();
const sellerService = require('../services/SellerService');

// Get All Seller
router.get("/", async (req, res) => {
    try {
        const seller = await sellerService.getSellerFromDB();
        res.json(seller);
    } catch (e) {
        res.status(400);
    }
});

// Get Seller
router.get("/:id", async (req, res) => {
    try {
        const seller = await sellerService.getSellerFromDB(req.params.id);
        seller !== null ? res.json(seller) : res.status(404).send(`Seller doesn't exist`);
    } catch (e) {
        res.status(400).send(`Error: ${e}`);
    }
});

// Create Seller
router.post("/", async (req, res) => {
    try {
        const seller = await sellerService.createSeller(req.body);
        res.json(seller)
    } catch (e) {
        res.status(400).send(`Error: ${e}`);
    }
});

// Edit seller
router.put("/:id", async (req, res) => {
    try {
        const numberOfUpdatedSeller = await sellerService.updateSeller(req.body, req.params.id);
        (numberOfUpdatedSeller !== 0) ? res.send("Seller Updated") : res.send("Seller was not Found")
    } catch (e) {
        res.status(400).send(`Error: ${e}`);
    }
});

// Delete seller
router.delete("/:id", async (req, res) => {
    try {
        const numberOfDeletions = await sellerService.deleteSeller(req.params.id);
        (numberOfDeletions !== 0) ? res.send("Seller was deleted!!!") : res.status(404).send("Seller was not found!!!");
    } catch (e) {
        res.status(400).send(`Error: ${e}`);
    }
});
module.exports = router;