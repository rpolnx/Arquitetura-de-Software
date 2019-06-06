const express = require("express"),
    router = express.Router(),
    Supplier = require('../models/Supplier');

// Get All Supplier
router.get("/", async (req, res) => {
    try {
        const supplier = await getSupplierFromDB();
        res.json(supplier);
    } catch (e) {
        res.status(400);
    }
});

// Get Supplier
router.get("/:id", async (req, res) => {
    try {
        const supplier = await getSupplierFromDB(req.params.id);
        supplier !== null ? res.json(supplier) : res.status(404).send(`Supplier doesn't exist`);
    } catch (e) {
        res.status(400).send(`Error: ${e}`);
    }
});

// Create Supplier
router.post("/", async (req, res) => {
    try {
        const supplier = await createSupplier(req.body);
        res.json(supplier)
    } catch (e) {
        res.status(400).send(`Error: ${e}`);
    }
});

// Edit supplier
router.put("/:id", async (req, res) => {
    try {
        const numberOfUpdatedSuppliers = await updateSupplier(req.body, req.params.id);
        (numberOfUpdatedSupplier !== 0) ? res.send("Supplier Updated") : res.send("Supplier was not Found")
    } catch (e) {
        res.status(400).send(`Error: ${e}`);
    }
});

// Delete supplier
router.delete("/:id", async (req, res) => {
    try {
        const numberOfDeletions = await deleteSupplier(req.params.id);
        (numberOfDeletions !== 0) ? res.send("Supplier was deleted!!!") : res.status(404).send("Supplier was not found!!!");
    } catch (e) {
        res.status(400).send(`Error: ${e}`);
    }
});

const getSupplierFromDB = async (supplierId) => {
    const supplierList = (typeof supplierId === 'undefined') ? await Supplier.findAll() : await Supplier.findByPk(supplierId)
    return supplierList;
}

const createSupplier = async (body) => {
    const supplier = await Supplier.create(body);
    return supplier;
}

const updateSupplier = async (body, supplierId) => {
    const numberOfUpdatedSuppliers = await Supplier.update(body, {
        where: {
            id: supplierId
        }
    });
    return numberOfUpdatedSuppliers[0];
}

const deleteSupplier = async (supplierId) => {
    const numberOfDeletions = await Supplier.destroy({
        where: {
            id: supplierId
        }
    });
    return numberOfDeletions;
}

module.exports = router;