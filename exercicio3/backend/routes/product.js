const express = require("express");
const router = express.Router();
const Product = require('../models/Product');
const Supplier = require('../models/Supplier');
const Category = require('../models/Category');

// Get All Product
router.get("/", async (req, res) => {
    try {
        const product = await getProductsFromDb();
        res.json(product);
    } catch (e) {
        res.status(400);
    }
});

// Get Product
router.get("/:id", async (req, res) => {
    try {
        const product = await getProductsFromDb(req.params.id);
        product !== null ? res.json(product) : res.status(404).send(`Product doesn't exist`);
    } catch (e) {
        res.status(400).send(`Error: ${e}`);
    }
});

// Create Product
router.post("/", async (req, res) => {
    try {
        const objVerify = await verifySupplierAndCategory(req.body);
        if (!objVerify.validate) {
            res.status(404).send(objVerify.message);
        } else {
            const product = await createProduct(req.body);
            res.json(product)
        }
    } catch (e) {
        res.status(400).send(`Error: ${e}`);
    }
});

// Edit Product
router.put("/:id", async (req, res) => {
    try {
        const numberOfUpdatedProducts = await updateProduct(req.body, req.params.id);
        (numberOfUpdatedProducts !== 0) ? res.send("Product Updated") : res.send("Product was not Found")
    } catch (e) {
        res.status(400).send(`Error: ${e}`);
    }
});

// Delete Product
router.delete("/:id", async (req, res) => {
    try {
        const numberOfDeletions = await deleteProduct(req.params.id);
        (numberOfDeletions !== 0) ? res.send("Product was deleted!!!") : res.status(404).send("Product was not found!!!");
    } catch (e) {
        res.status(400).send(`Error: ${e}`);
    }
});

const getProductsFromDb = async (productId) => {
    const productList = (typeof productId === 'undefined') ? await Product.findAll() : await Product.findByPk(productId)
    return productList;
}

const verifySupplierAndCategory = async (body) => {
    const supplier = await Supplier.findByPk(body.supplier);
    let category = await Category.findByPk(body.category);
    if (supplier === null && category === null) {
        return { validate: false, message: "Category and Supplier was not found" }
    }
    if (supplier == null) {
        return { validate: false, message: "Supplier was not found" }
    }
    if (category === null) {
        return { validate: false, message: "Category was not found" }
    }
    return { validate: true, price: category.price }
}

const createProduct = async (body) => {
    const product = await Product.create(body);
    return product;
}

const updateProduct = async (body, productId) => {
    const numberOfUpdatedProducts = await Product.update(body, {
        where: {
            id: productId
        }
    });
    return numberOfUpdatedProducts[0];
}

const deleteProduct = async (productId) => {
    const numberOfDeletions = await Product.destroy({
        where: {
            id: productId
        }
    });
    return numberOfDeletions;
}

module.exports = router;