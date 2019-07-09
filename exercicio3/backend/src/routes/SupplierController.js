const express = require("express");
const router = express.Router();
const supplierService = require('../services/SupplierService');

// Get All Supplier
router.get("/", async (req, res) => {
    try {
        const supplier = await supplierService.getSupplierFromDB();
        res.json(supplier);
    } catch (e) {
        res.status(400);
    }
});

// Get Supplier
router.get("/:id", async (req, res) => {
    try {
        const supplier = await supplierService.getSupplierFromDB(req.params.id);
        supplier !== null ? res.json(supplier) : res.status(404).send(`Supplier doesn't exist`);
    } catch (e) {
        res.status(400).send(`Error: ${e}`);
    }
});

// Create Supplier
router.post("/", async (req, res) => {
    try {
        const supplier = await supplierService.createSupplier(req.body);
        res.json(supplier)
    } catch (e) {
        res.status(400).send(`Error: ${e}`);
    }
});

// Edit supplier
router.put("/:id", async (req, res) => {
    try {
        const numberOfUpdatedSuppliers = await supplierService.updateSupplier(req.body, req.params.id);
        (numberOfUpdatedSuppliers !== 0) ? res.send("Supplier Updated") : res.send("Supplier was not Found")
    } catch (e) {
        res.status(400).send(`Error: ${e}`);
    }
});

// Delete supplier
router.delete("/:id", async (req, res) => {
    try {
        const numberOfDeletions = await supplierService.deleteSupplier(req.params.id);
        (numberOfDeletions !== 0) ? res.send("Supplier was deleted!!!") : res.status(404).send("Supplier was not found!!!");
    } catch (e) {
        res.status(400).send(`Error: ${e}`);
    }
});

module.exports = router;