const express = require("express"),
    router = express.Router();

// Show all campgrounds
router.get("/", function (req, res) {
    res.send("<h1>Hello!</h1><h2>Endpoints na descrição do Github</h2><h3><a href='https://github.com/rodrigorpo/Arquitetura-de-Software/tree/master/exercicio1'>Link no Github</a></h3>");
});

module.exports = router;