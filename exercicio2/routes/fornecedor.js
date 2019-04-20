const express = require("express"),
    router = express.Router(),
    Fornecedor = require('../models/Fornecedor');

// Get All Fornecedor
router.get("/", async (req, res) => {
    try {
        const fornecedor = await getFornecedorsFromDB();
        res.json(fornecedor);
    } catch (e) {
        res.status(400);
    }
});

// Get Fornecedor
router.get("/:id", async (req, res) => {
    try {
        const fornecedor = await getFornecedorsFromDB(req.params.id);
        fornecedor !== null ? res.json(fornecedor) : res.status(404).send(`Fornecedor doesn't exist`);
    } catch (e) {
        res.status(400).send(`Error: ${e}`);
    }
});

// Create Fornecedor
router.post("/", async (req, res) => {
    try {
        const fornecedor = await createFornecedor(req.body);
        res.json(fornecedor)
    } catch (e) {
        res.status(400).send(`Error: ${e}`);
    }
});

// Edit fornecedor
router.put("/:id", async (req, res) => {
    try {
        const numberOfUpdatedfornecedors = await updateFornecedor(req.body, req.params.id);
        (numberOfUpdatedfornecedors !== 0) ? res.send("Fornecedor Updated") : res.send("Fornecedor was not Found")
    } catch (e) {
        res.status(400).send(`Error: ${e}`);
    }
});

// Delete fornecedor
router.delete("/:id", async (req, res) => {
    try {
        const numberOfDeletions = await deleteFornecedor(req.params.id);
        (numberOfDeletions !== 0) ? res.send("Fornecedor was deleted!!!") : res.status(404).send("Fornecedor was not found!!!");
    } catch (e) {
        res.status(400).send(`Error: ${e}`);
    }
});

const getFornecedorsFromDB = async (fornecedorId) => {
    const fornecedorList = (typeof fornecedorId === 'undefined') ? await Fornecedor.findAll() : await Fornecedor.findByPk(fornecedorId)
    return fornecedorList;
}

const createFornecedor = async (body) => {
    const fornecedor = await Fornecedor.create(body);
    return fornecedor;
}

const updateFornecedor = async (body, fornecedor_id) => {
    const numberOfUpdatedfornecedors = await Fornecedor.update(body, {
        where: {
            id_fornecedor: fornecedor_id
        }
    });
    return numberOfUpdatedfornecedors[0];
}

const deleteFornecedor = async (fornecedorId) => {
    const numberOfDeletions = await Fornecedor.destroy({
        where: {
            id_fornecedor: fornecedorId
        }
    });
    return numberOfDeletions;
}

module.exports = router;