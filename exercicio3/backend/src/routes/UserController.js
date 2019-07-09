const express = require("express");
const router = express.Router();
const userService = require('../services/UserService');

// Get All User
router.get("/", async (req, res) => {
    try {
        const user = await userService.getUserFromDB();
        res.json(user);
    } catch (e) {
        res.status(400);
    }
});

// Get User
router.get("/:id", async (req, res) => {
    try {
        const user = await userService.getUserFromDB(req.params.id);
        user !== null ? res.json(user) : res.status(404).send(`User doesn't exist`);
    } catch (e) {
        res.status(400).send(`Error: ${e}`);
    }
});

// Create User
router.post("/", async (req, res) => {
    try {
        const user = await userService.createUser(req.body);
        res.json(user)
    } catch (e) {
        res.status(400).send(`Error: ${e}`);
    }
});

// Edit user
router.put("/:id", async (req, res) => {
    try {
        const numberOfUpdatedUsers = await userService.updateUser(req.body, req.params.id);
        (numberOfUpdatedUsers !== 0) ? res.send("User Updated") : res.send("User was not Found")
    } catch (e) {
        res.status(400).send(`Error: ${e}`);
    }
});

// Delete user
router.delete("/:id", async (req, res) => {
    try {
        const numberOfDeletions = await userService.deleteUser(req.params.id);
        (numberOfDeletions !== 0) ? res.send("User was deleted!!!") : res.status(404).send("User was not found!!!");
    } catch (e) {
        res.status(400).send(`Error: ${e}`);
    }
});

module.exports = router;