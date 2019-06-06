const express = require("express");
const router = express.Router();
const categoryService = require('../services/CategoryService');

// Get All Category
router.get("/", async (req, res) => {
    try {
        const category = await categoryService.getCategoriesFromDB();
        res.json(category);
    } catch (e) {
        res.status(400);
    }
});

// Get Category
router.get("/:id", async (req, res) => {
    try {
        const category = await categoryService.getCategoriesFromDB(req.params.id);
        category !== null ? res.json(category) : res.status(404).send(`Category doesn't exist`);
    } catch (e) {
        res.status(400).send(`Error: ${e}`);
    }
});

// Create Category
router.post("/", async (req, res) => {
    try {
        const category = await categoryService.createCategory(req.body);
        res.json(category)
    } catch (e) {
        res.status(400).send(`Error: ${e}`);
    }
});

// Edit category
router.put("/:id", async (req, res) => {
    try {
        const numberOfUpdatedCategories = await categoryService.updateCategory(req.body, req.params.id);
        (numberOfUpdatedCategories !== 0) ? res.send("Category Updated") : res.send("Category was not Found")
    } catch (e) {
        res.status(400).send(`Error: ${e}`);
    }
});

// Delete category
router.delete("/:id", async (req, res) => {
    try {
        const numberOfDeletions = await categoryService.deleteCategory(req.params.id);
        (numberOfDeletions !== 0) ? res.send("Category was deleted!!!") : res.status(404).send("Category was not found!!!");
    } catch (e) {
        res.status(400).send(`Error: ${e}`);
    }
});

module.exports = router;