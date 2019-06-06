const express = require("express");
const router = express.Router();
const Produto = require('../models/Produto');
const Fornecedor = require('../models/Fornecedor');
const Categoria = require('../models/Categoria');

// Get All Produto
router.get("/", async (req, res) => {
    try {
        const produto = await getProdutosFromDb();
        res.json(produto);
    } catch (e) {
        res.status(400);
    }
});

// Get Produto
router.get("/:id", async (req, res) => {
    try {
        const produto = await getProdutosFromDb(req.params.id);
        produto !== null ? res.json(produto) : res.status(404).send(`Produto doesn't exist`);
    } catch (e) {
        res.status(400).send(`Error: ${e}`);
    }
});

// Create Produto
router.post("/", async (req, res) => {
    try {
        const objVerify = await verifyFornecedorAndCategoria(req.body);
        if (!objVerify.validate) {
            res.status(404).send(objVerify.message);
        } else {
            const produto = await createProduto(req.body);
            res.json(produto)
        }
    } catch (e) {
        res.status(400).send(`Error: ${e}`);
    }
});

// Edit Produto
router.put("/:id", async (req, res) => {
    try {
        const numberOfUpdatedProdutos = await updateProduto(req.body, req.params.id);
        (numberOfUpdatedProdutos !== 0) ? res.send("Produto Updated") : res.send("Produto was not Found")
    } catch (e) {
        res.status(400).send(`Error: ${e}`);
    }
});

// Delete Produto
router.delete("/:id", async (req, res) => {
    try {
        const numberOfDeletions = await deleteProduto(req.params.id);
        (numberOfDeletions !== 0) ? res.send("Produto was deleted!!!") : res.status(404).send("Produto was not found!!!");
    } catch (e) {
        res.status(400).send(`Error: ${e}`);
    }
});

const getProdutosFromDb = async (produtoId) => {
    const produtoList = (typeof produtoId === 'undefined') ? await Produto.findAll() : await Produto.findByPk(produtoId)
    return produtoList;
}

const verifyFornecedorAndCategoria = async (body) => {
    const fornecedor = await Fornecedor.findByPk(body.id_fornecedor);
    let categoria = await Categoria.findByPk(body.id_categoria);
    if (fornecedor === null && categoria === null) {
        return { validate: false, message: "Categoria and Fornecedor was not found" }
    }
    if (fornecedor == null) {
        return { validate: false, message: "Fornecedor was not found" }
    }
    if (categoria === null) {
        return { validate: false, message: "Categoria was not found" }
    }
    return { validate: true, price: categoria.price }
}

const createProduto = async (body) => {
    const produto = await Produto.create(body);
    return produto;
}

const updateProduto = async (body, produto_id) => {
    const numberOfUpdatedProdutos = await Produto.update(body, {
        where: {
            id_produto: produto_id
        }
    });
    return numberOfUpdatedProdutos[0];
}

const deleteProduto = async (produtoId) => {
    const numberOfDeletions = await Produto.destroy({
        where: {
            id_produto: produtoId
        }
    });
    return numberOfDeletions;
}

module.exports = router;