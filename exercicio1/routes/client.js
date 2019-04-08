const express = require("express"),
    router = express.Router(),
    Client = require('../models/Client');

let clientMock = [
    {
        id: 1,
        name: "Rodrigo",        
        last_name: "Pereira de Oliveira",
        registration_number: "95258210050",
        is_company: false,
        email: "rodrigorpogo@gmail.com",    
        cellphone: "34998074997",    
        full_address: "Rua Interlagos, numero 1090",    
        city: "Uberlândia",
        province: "MG",
        cep: "38009432",
        created: new Date(1519900000000),
        updated: Date
    },
    {
        id: 2,
        name: "Thiago",        
        last_name: "Pereira de Oliveira",
        registration_number: "99998880050",
        is_company: false,
        email: "thiagopoliveira@gmail.com",    
        cellphone: "34998070000",    
        full_address: "Rua Liguinha, numero 290",    
        city: "Uberlândia",
        province: "MG",
        cep: "38222222",
        created: new Date(1529900000000),
        updated: new Date(1539900000000)
    }
]

let temporaryClientList = clientMock;


// Get All Products
router.get("/", function (req, res) {
    res.status(200).json(temporaryClientList);
});

// Get Product
router.get("/:id", function (req, res) {
    if (clientExists(req.params.id)) {
        res.status(200).json(findProductById(req.params.id));
    } else {
        res.status(400).send("Product doesn't exists!!!");
    }

});

// Create Product
router.post("/", function (req, res) {
    if (!clientExists(req.body.id)) {
        const client = req.body;
        client.id = temporaryClientList.length + 1;
        temporaryClientList.push(client);
        res.status(200).json(client);
    } else {
        res.status(400).send("Product already exists!!!");
    }
});

// Edit Product
router.put("/:id", function (req, res) {
    if (clientExists(req.params.id)) {
        res.status(200).json(findAndUpdate(req.params.id, req.body));
    } else {
        res.status(400).send("Product doesn't exists!!!");
    }
});

// Delete Product
router.delete("/:id", function (req, res) {
    if (clientExists(req.params.id)) {
        findAndDelete(req.params.id);
        res.status(200).send("Product was deleted!!!");
    } else {
        res.status(400).send("Product doesn't exists!!!");
    }
});

const clientExists = (id) => {
    return temporaryClientList.some(function (element) {
        return element.id == id;
    });
}

const findProductById = (id) => {
    const clients = temporaryClientList.filter(function (element) {
        return element.id == id;
    });
    return clients.length > 1 ? clients : clients[0];
}

const findAndUpdate = (id, obj) => {
    let clients = {};

    temporaryClientList.forEach(function (element, index) {
        if (id == element.id) {
            temporaryClientList[index] = obj;
            temporaryClientList[index].id = id;
            clients = temporaryClientList[index];
        }
    });
    return clients;
}

const findAndDelete = (id) => {
    temporaryClientList = temporaryClientList.filter(function (element) {
        if (id != element.id) {
            return element;
        }
    });
}



module.exports = router;