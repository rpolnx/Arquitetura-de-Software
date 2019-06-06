const express = require("express"),
    router = express.Router();

// Show all campgrounds
router.get("/", function (req, res) {
    res.status(200).send("OK!");
});

module.exports = router;