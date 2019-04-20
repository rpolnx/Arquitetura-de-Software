const express = require("express"),
    router = express.Router(),
    Vendedor = require('../models/Vendedor');

// Get All Vendedor
router.get("/", async (req, res) => {
    try {
        const vendedor = await getVendedorsFromDB();
        res.json(vendedor);
    } catch (e) {
        res.status(400);
    }
});

// Get Vendedor
router.get("/:id", async (req, res) => {
    try {
        const vendedor = await getVendedorsFromDB(req.params.id);
        vendedor !== null ? res.json(vendedor) : res.status(404).send(`Vendedor doesn't exist`);
    } catch (e) {
        res.status(400).send(`Error: ${e}`);
    }
});

// Create Vendedor
router.post("/", async (req, res) => {
    try {
        const vendedor = await createVendedor(req.body);
        res.json(vendedor)
    } catch (e) {
        res.status(400).send(`Error: ${e}`);
    }
});

// Edit vendedor
router.put("/:id", async (req, res) => {
    try {
        const numberOfUpdatedvendedors = await updateVendedor(req.body, req.params.id);
        (numberOfUpdatedvendedors !== 0) ? res.send("Vendedor Updated") : res.send("Vendedor was not Found")
    } catch (e) {
        res.status(400).send(`Error: ${e}`);
    }
});

// Delete vendedor
router.delete("/:id", async (req, res) => {
    try {
        const numberOfDeletions = await deleteVendedor(req.params.id);
        (numberOfDeletions !== 0) ? res.send("Vendedor was deleted!!!") : res.status(404).send("Vendedor was not found!!!");
    } catch (e) {
        res.status(400).send(`Error: ${e}`);
    }
});

const getVendedorsFromDB = async (vendedorId) => {
    const vendedorList = (typeof vendedorId === 'undefined') ? await Vendedor.findAll() : await Vendedor.findByPk(vendedorId)
    return vendedorList;
}

const createVendedor = async (body) => {
    const vendedor = await Vendedor.create(body);
    return vendedor;
}

const updateVendedor = async (body, vendedor_id) => {
    const numberOfUpdatedvendedors = await Vendedor.update(body, {
        where: {
            id_vendedor: vendedor_id
        }
    });
    return numberOfUpdatedvendedors[0];
}

const deleteVendedor = async (vendedorId) => {
    const numberOfDeletions = await Vendedor.destroy({
        where: {
            id_vendedor: vendedorId
        }
    });
    return numberOfDeletions;
}

module.exports = router;