const express = require("express"),
    router = express.Router();

// Show all campgrounds
router.get("/", function (req, res) {
    res.render("index")
});

module.exports = router;