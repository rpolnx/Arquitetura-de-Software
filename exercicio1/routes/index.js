const express = require("express"),
    router = express.Router();

// Show all campgrounds
router.get("/", function (req, res) {
    res.send("Hello!");
});

module.exports = router;