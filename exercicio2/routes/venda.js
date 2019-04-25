const express = require("express");
const router = express.Router();
const Venda = require('../models/Venda');
const Vendedor = require('../models/Vendedor');
const Produto = require('../models/Produto');
const Categoria = require('../models/Categoria');

// Get All Venda
router.get("/", async (req, res) => {
    try {
        const venda = await getVendasFromDb();
        res.json(venda);
    } catch (e) {
        res.status(400);
    }
});

// Get Venda
router.get("/:id", async (req, res) => {
    try {
        const venda = await getVendasFromDb(req.params.id);
        venda !== null ? res.json(venda) : res.status(404).send(`Venda doesn't exist`);
    } catch (e) {
        res.status(400).send(`Error: ${e}`);
    }
});

// Create Venda
router.post("/", async (req, res) => {
    try {
        const objVerify = await verifyVendedorAndProduto(req.body);
        if (!objVerify.validate) {
            res.status(404).send(objVerify.message);
        } else {
            req.body.valorTotal = objVerify.price * req.body.quantidade
            const venda = await createVenda(req.body);
            res.json(venda);
        }
    } catch (e) {
        res.status(400).send(`Error: ${e}`);
    }
});

// Edit Venda
router.put("/:id", async (req, res) => {
    try {
        const numberOfUpdatedVendas = await updateVenda(req.body, req.params.id);
        (numberOfUpdatedVendas !== 0) ? res.send("Venda Updated") : res.send("Venda was not Found")
    } catch (e) {
        res.status(400).send(`Error: ${e}`);
    }
});

// Delete Venda
router.delete("/:id", async (req, res) => {
    try {
        const numberOfDeletions = await deleteVenda(req.params.id);
        (numberOfDeletions !== 0) ? res.send("Venda was deleted!!!") : res.status(404).send("Venda was not found!!!");
    } catch (e) {
        res.status(400).send(`Error: ${e}`);
    }
});

const getVendasFromDb = async (vendaId) => {
    const vendaList = (typeof vendaId === 'undefined') ? await Venda.findAll() : await Venda.findByPk(vendaId)
    return vendaList;
}

const verifyVendedorAndProduto = async (body) => {
    const vendedor = await Vendedor.findByPk(body.id_vendedor);
    const categoria = await Categoria.findByPk(body.id_categoria);
    let produto = await Produto.findByPk(body.id_produto);
    if (vendedor === null && produto === null && categoria === null) {
        return { validate: false, message: "Produto and vendedor and categoria was not found" }
    }
    if (vendedor == null) {
        return { validate: false, message: "Vendedor was not found" }
    }
    if (produto === null) {
        return { validate: false, message: "Produto was not found" }
    }
    if (categoria === null) {
        return { validate: false, message: "Categoria was not found" }
    }
    if (produto.quantidadeMinima > body.quantidade) {
        return { validate: false, message: `A quantidade mínima desse produto é ${produto.quantidadeMinima}.` }
    }
    if (produto.quantidade < body.quantidade) {
        return { validate: false, message: `Não há tantos produtos em estoque. Quantidade restante: ${produto.quantidade}.` }
    } else {
        produto.quantidade -= parseInt(body.quantidade);
        await Produto.update({ quantidade: produto.quantidade }, {
            where: {
                id_produto: body.id_produto
            }
        })
    }
    return { validate: true, price: produto.valorUnitario }
}

const createVenda = async (body) => {
    body.dataVenda = new Date();
    const venda = await Venda.create(body);
    return venda;
}

const updateVenda = async (body, venda_id) => {
    const numberOfUpdatedVendas = await Venda.update(body, {
        where: {
            id_venda: venda_id
        }
    });
    return numberOfUpdatedVendas[0];
}

const deleteVenda = async (vendaId) => {
    const numberOfDeletions = await Venda.destroy({
        where: {
            id_venda: vendaId
        }
    });
    return numberOfDeletions;
}

module.exports = router;