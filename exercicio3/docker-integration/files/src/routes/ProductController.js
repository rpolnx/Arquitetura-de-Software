const express = require("express");
const router = express.Router();
const productService = require('../services/ProductService');

// Get All Product
router.get("/", async (req, res) => {
    try {
        const product = await productService.getProductsFromDb();
        res.json(product);
    } catch (e) {
        res.status(400);
    }
});

// Get Product
router.get("/:id", async (req, res) => {
    try {
        const product = await productService.getProductsFromDb(req.params.id);
        product !== null ? res.json(product) : res.status(404).send(`Product doesn't exist`);
    } catch (e) {
        res.status(400).send(`Error: ${e}`);
    }
});

// Create Product
router.post("/", async (req, res) => {
    try {
        const objVerify = await productService.verifySupplierAndCategory(req.body);
        if (!objVerify.validate) {
            res.status(404).send(objVerify.message);
        } else {
            const product = await productService.createProduct(req.body);
            res.json(product)
        }
    } catch (e) {
        res.status(400).send(`Error: ${e}`);
    }
});

// Edit Product
router.put("/:id", async (req, res) => {
    try {
        const numberOfUpdatedProducts = await productService.updateProduct(req.body, req.params.id);
        (numberOfUpdatedProducts !== 0) ? res.send("Product Updated") : res.send("Product was not Found")
    } catch (e) {
        res.status(400).send(`Error: ${e}`);
    }
});

// Delete Product
router.delete("/:id", async (req, res) => {
    try {
        const numberOfDeletions = await productService.deleteProduct(req.params.id);
        (numberOfDeletions !== 0) ? res.send("Product was deleted!!!") : res.status(404).send("Product was not found!!!");
    } catch (e) {
        res.status(400).send(`Error: ${e}`);
    }
});

module.exports = router;