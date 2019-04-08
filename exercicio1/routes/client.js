const express = require("express"),
    router = express.Router(),
    Client = require('../models/Client');

// Get All Client
router.get("/", async (req, res) => {
    try {
        const client = await getClientsFromDb();
        res.json(client);
    } catch (e) {
        res.status(400);
    }
});

// Get Client
router.get("/:id", async (req, res) => {
    try {
        const client = await getClientsFromDb(req.params.id);
        client !== null ? res.json(client) : res.status(404).send(`Client doesn't exist`);
    } catch (e) {
        res.status(400).send(`Error: ${e}`);
    }
});

// Create Client
router.post("/", async (req, res) => {
    try {
        const client = await createClient(req.body);
        res.json(client)
    } catch (e) {
        res.status(400).send(`Error: ${e}`);
    }
});

// Edit Client
router.put("/:id", async (req, res) => {
    try {
        const numberOfUpdatedClients = await updateClient(req.body, req.params.id);
        (numberOfUpdatedClients !== 0) ? res.send("Client Updated") : res.send("Client was not Found")
    } catch (e) {
        res.status(400).send(`Error: ${e}`);
    }
});

// Delete Client
router.delete("/:id", async (req, res) => {
    try {
        const numberOfDeletions = await deleteClient(req.params.id);
        (numberOfDeletions !== 0) ? res.send("Client was deleted!!!") : res.status(404).send("Client was not found!!!");
    } catch (e) {
        res.status(400).send(`Error: ${e}`);
    }
});

const getClientsFromDb = async (clientId) => {
    const clientList = (typeof clientId === 'undefined') ? await Client.findAll() : await Client.findByPk(clientId)
    return clientList;
}

const createClient = async (body) => {
    body.created = new Date();
    const client = await Client.create(body);
    return client;
}

const updateClient = async (body, client_id) => {
    body.updated = new Date();
    const numberOfUpdatedClients = await Client.update(body, {
        where: {
            id: client_id
        }
    });
    return numberOfUpdatedClients[0];
}

const deleteClient = async (clientId) => {
    const numberOfDeletions = await Client.destroy({
        where: {
            id: clientId
        }
    });
    return numberOfDeletions;
}

module.exports = router;