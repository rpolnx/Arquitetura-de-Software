const express = require("express");
const router = express.Router();

// Show all default
router.get("/", function (req, res) {
    res.send("OK");
});

module.exports = router;