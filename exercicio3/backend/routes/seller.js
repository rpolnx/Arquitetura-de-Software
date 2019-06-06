const express = require("express"),
    router = express.Router(),
    Seller = require('../models/Seller');

// Get All Seller
router.get("/", async (req, res) => {
    try {
        const seller = await getSellerFromDB();
        res.json(seller);
    } catch (e) {
        res.status(400);
    }
});

// Get Seller
router.get("/:id", async (req, res) => {
    try {
        const seller = await getSellerFromDB(req.params.id);
        seller !== null ? res.json(seller) : res.status(404).send(`Seller doesn't exist`);
    } catch (e) {
        res.status(400).send(`Error: ${e}`);
    }
});

// Create Seller
router.post("/", async (req, res) => {
    try {
        const seller = await createSeller(req.body);
        res.json(seller)
    } catch (e) {
        res.status(400).send(`Error: ${e}`);
    }
});

// Edit seller
router.put("/:id", async (req, res) => {
    try {
        const numberOfUpdatedSeller = await updateSeller(req.body, req.params.id);
        (numberOfUpdatedSeller !== 0) ? res.send("Seller Updated") : res.send("Seller was not Found")
    } catch (e) {
        res.status(400).send(`Error: ${e}`);
    }
});

// Delete seller
router.delete("/:id", async (req, res) => {
    try {
        const numberOfDeletions = await deleteSeller(req.params.id);
        (numberOfDeletions !== 0) ? res.send("Seller was deleted!!!") : res.status(404).send("Seller was not found!!!");
    } catch (e) {
        res.status(400).send(`Error: ${e}`);
    }
});

const getSellerFromDB = async (sellerId) => {
    const sellerList = (typeof sellerId === 'undefined') ? await Seller.findAll() : await Seller.findByPk(sellerId)
    return sellerList;
}

const createSeller = async (body) => {
    const seller = await Seller.create(body);
    return seller;
}

const updateSeller = async (body, sellerId) => {
    const numberOfUpdatedSeller = await Seller.update(body, {
        where: {
            id: sellerId
        }
    });
    return numberOfUpdatedSeller[0];
}

const deleteSeller = async (sellerId) => {
    const numberOfDeletions = await Seller.destroy({
        where: {
            id: sellerId
        }
    });
    return numberOfDeletions;
}

module.exports = router;