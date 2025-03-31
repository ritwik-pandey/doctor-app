const express = require("express");
const router = express.Router();

// Home Page Route
router.get("/", (req, res) => {
    const username = req.cookies.username || null; // Read username from cookies
    

    res.render("index", { username: req.cookies.username });
});

module.exports = router;