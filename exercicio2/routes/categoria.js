const express = require("express"),
    router = express.Router(),
    Categoria = require('../models/Categoria');

// Get All Categoria
router.get("/", async (req, res) => {
    try {
        const categoria = await getCategoriasFromDB();
        res.json(categoria);
    } catch (e) {
        res.status(400);
    }
});

// Get Categoria
router.get("/:id", async (req, res) => {
    try {
        const categoria = await getCategoriasFromDB(req.params.id);
        categoria !== null ? res.json(categoria) : res.status(404).send(`Categoria doesn't exist`);
    } catch (e) {
        res.status(400).send(`Error: ${e}`);
    }
});

// Create Categoria
router.post("/", async (req, res) => {
    try {
        const categoria = await createCategoria(req.body);
        res.json(categoria)
    } catch (e) {
        res.status(400).send(`Error: ${e}`);
    }
});

// Edit categoria
router.put("/:id", async (req, res) => {
    try {
        const numberOfUpdatedcategorias = await updateCategoria(req.body, req.params.id);
        (numberOfUpdatedcategorias !== 0) ? res.send("Categoria Updated") : res.send("Categoria was not Found")
    } catch (e) {
        res.status(400).send(`Error: ${e}`);
    }
});

// Delete categoria
router.delete("/:id", async (req, res) => {
    try {
        const numberOfDeletions = await deleteCategoria(req.params.id);
        (numberOfDeletions !== 0) ? res.send("Categoria was deleted!!!") : res.status(404).send("Categoria was not found!!!");
    } catch (e) {
        res.status(400).send(`Error: ${e}`);
    }
});

const getCategoriasFromDB = async (categoriaId) => {
    const categoriaList = (typeof categoriaId === 'undefined') ? await Categoria.findAll() : await Categoria.findByPk(categoriaId)
    return categoriaList;
}

const createCategoria = async (body) => {
    const categoria = await Categoria.create(body);
    return categoria;
}

const updateCategoria = async (body, categoria_id) => {
    const numberOfUpdatedcategorias = await Categoria.update(body, {
        where: {
            id_categoria: categoria_id
        }
    });
    return numberOfUpdatedcategorias[0];
}

const deleteCategoria = async (categoriaId) => {
    const numberOfDeletions = await Categoria.destroy({
        where: {
            id_categoria: categoriaId
        }
    });
    return numberOfDeletions;
}

module.exports = router;