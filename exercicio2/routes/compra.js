const express = require("express");
const router = express.Router();
const Compra = require('../models/Compra');
const Fornecedor = require('../models/Fornecedor');
const Produto = require('../models/Produto');
const Categoria = require('../models/Categoria');

// Get All Compra
router.get("/", async (req, res) => {
    try {
        const compra = await getComprasFromDb();
        res.json(compra);
    } catch (e) {
        res.status(400);
    }
});

// Get Compra
router.get("/:id", async (req, res) => {
    try {
        const compra = await getComprasFromDb(req.params.id);
        compra !== null ? res.json(compra) : res.status(404).send(`Compra doesn't exist`);
    } catch (e) {
        res.status(400).send(`Error: ${e}`);
    }
});

// Create Compra
router.post("/", async (req, res) => {
    try {
        const objVerify = await verifyFornecedorAndProduto(req.body);
        if (!objVerify.validate) {
            res.status(404).send(objVerify.message);
        } else {
            req.body.valorTotal = objVerify.price * req.body.quantidade
            const compra = await createCompra(req.body);
            res.json(compra);
        }
    } catch (e) {
        res.status(400).send(`Error: ${e}`);
    }
});

// Edit Compra
router.put("/:id", async (req, res) => {
    try {
        const numberOfUpdatedCompras = await updateCompra(req.body, req.params.id);
        (numberOfUpdatedCompras !== 0) ? res.send("Compra Updated") : res.send("Compra was not Found")
    } catch (e) {
        res.status(400).send(`Error: ${e}`);
    }
});

// Delete Compra
router.delete("/:id", async (req, res) => {
    try {
        const numberOfDeletions = await deleteCompra(req.params.id);
        (numberOfDeletions !== 0) ? res.send("Compra was deleted!!!") : res.status(404).send("Compra was not found!!!");
    } catch (e) {
        res.status(400).send(`Error: ${e}`);
    }
});

const getComprasFromDb = async (compraId) => {
    const compraList = (typeof compraId === 'undefined') ? await Compra.findAll() : await Compra.findByPk(compraId)
    return compraList;
}

const verifyFornecedorAndProduto = async (body) => {
    const fornecedor = await Fornecedor.findByPk(body.id_fornecedor);
    const categoria = await Categoria.findByPk(body.id_categoria);
    let produto = await Produto.findByPk(body.id_produto);
    if (fornecedor === null && produto === null && categoria === null) {
        return { validate: false, message: "Produto and fornecedor and categoria was not found" }
    }
    if (fornecedor == null) {
        return { validate: false, message: "Fornecedor was not found" }
    }
    if (produto === null) {
        return { validate: false, message: "Produto was not found" }
    }
    if (categoria === null) {
        return { validate: false, message: "Categoria was not found" }
    } else {
        produto.quantidade += parseInt(body.quantidade);
        await Produto.update({ quantidade: produto.quantidade }, {
            where: {
                id_produto: body.id_produto
            }
        })
    }
    return { validate: true, price: produto.valorUnitario }
}

const createCompra = async (body) => {
    body.dataCompra = new Date();
    const compra = await Compra.create(body);
    return compra;
}

const updateCompra = async (body, compra_id) => {
    const numberOfUpdatedCompras = await Compra.update(body, {
        where: {
            id_compra: compra_id
        }
    });
    return numberOfUpdatedCompras[0];
}

const deleteCompra = async (compraId) => {
    const numberOfDeletions = await Compra.destroy({
        where: {
            id_compra: compraId
        }
    });
    return numberOfDeletions;
}

module.exports = router;