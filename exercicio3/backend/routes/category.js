const express = require("express"),
    router = express.Router(),
    Category = require('../models/Category');

// Get All Category
router.get("/", async (req, res) => {
    try {
        const category = await getCategoriesFromDB();
        res.json(category);
    } catch (e) {
        res.status(400);
    }
});

// Get Category
router.get("/:id", async (req, res) => {
    try {
        const category = await getCategoriesFromDB(req.params.id);
        category !== null ? res.json(category) : res.status(404).send(`Category doesn't exist`);
    } catch (e) {
        res.status(400).send(`Error: ${e}`);
    }
});

// Create Category
router.post("/", async (req, res) => {
    try {
        const category = await createCategory(req.body);
        res.json(category)
    } catch (e) {
        res.status(400).send(`Error: ${e}`);
    }
});

// Edit category
router.put("/:id", async (req, res) => {
    try {
        const numberOfUpdatedCategories = await updateCategory(req.body, req.params.id);
        (numberOfUpdatedCategories !== 0) ? res.send("Category Updated") : res.send("Category was not Found")
    } catch (e) {
        res.status(400).send(`Error: ${e}`);
    }
});

// Delete category
router.delete("/:id", async (req, res) => {
    try {
        const numberOfDeletions = await deleteCategory(req.params.id);
        (numberOfDeletions !== 0) ? res.send("Category was deleted!!!") : res.status(404).send("Category was not found!!!");
    } catch (e) {
        res.status(400).send(`Error: ${e}`);
    }
});

const getCategoriesFromDB = async (categoryId) => {
    const categoryList = (typeof categoryId === 'undefined') ? await Category.findAll() : await Category.findByPk(categoryId)
    return categoryList;
}

const createCategory = async (body) => {
    const category = await Category.create(body);
    return category;
}

const updateCategory = async (body, category_id) => {
    const numberOfUpdatedCategories = await Category.update(body, {
        where: {
            id: category_id
        }
    });
    return numberOfUpdatedCategories[0];
}

const deleteCategory = async (categoryId) => {
    const numberOfDeletions = await Category.destroy({
        where: {
            id: categoryId
        }
    });
    return numberOfDeletions;
}

module.exports = router;