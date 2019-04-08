const express = require("express"),
    router = express.Router(),
    Product = require('../models/Product');

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
        const product = await createProduct(req.body);
        res.json(product)
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

const createProduct = async (body) => {
    body.created = new Date();
    console.log(new Date())
    const product = await Product.create(body);
    return product;
}

const updateProduct = async (body, product_id) => {
    body.updated = new Date();
    const numberOfUpdatedProducts = await Product.update(body, {
        where: {
            id: product_id
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