const express = require("express");
const router = express.Router();
const db  = require("../firebase");

router.get('/',(req,res) =>{
    if(!(req.cookies && req.cookies.username)){
        return res.redirect("/");
    }
    res.render("profile",{username: req.cookies.username, email: req.cookies.email, number: req.cookies.usernumber});
    
});

module.exports = router;