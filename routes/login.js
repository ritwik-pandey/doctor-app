const express = require("express");
const router = express.Router();
const db  = require("../firebase");
const admin = require("firebase-admin");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
require("dotenv").config();


router.use(cookieParser());


router.use((req, res, next) => {
    console.log("Cookies in middleware:", req.cookies);
    // res.render("index", { username: req.cookies.username });
    next();
});

// login Page Route
router.get("/", (req, res) => {
    if(req.cookies && req.cookies.username){
        return res.redirect("/");
    }
    res.render("login",{error: null});
});

router.get("/checkCookie", (req, res) => {
    console.log("Cookies received:", req.cookies); // Logs cookies in the backend
    return res.render("login", { error: "cookie found" });
});



router.post("/", async (req, res) => {
    try {
            
            
            
            const userEmail = req.body.login_email;
            const userPassword = req.body.login_password;
            
           
            const userRef = db.collection("users").doc(userEmail.trim());
            const userDoc = await userRef.get();
            
            if(!userDoc.exists){
                return res.render("login", { error: "Invaild email or password" });
            }
            
            const userData = userDoc.data();
            console.log(userDoc);
            const isMatch = await bcrypt.compare(userPassword, userData.hashedPassword);
            if (!isMatch) {
                return res.render("login", { error: "Invalid password!" });
            }

            const username = userData.userName;
            const userNumber = userData.userNumber;
           

            const token = jwt.sign({ id: 1, userEmail }, process.env.JWT_SECRET, { expiresIn: "1h" });
            
            res.cookie("username", username, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });
            res.cookie("email", userEmail, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });
            res.cookie("usernumber", userNumber, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });
              
            
            res.redirect("/");
            
            
        
            
          } catch (error) {
            console.error("Error saving user:", error);
            res.status(500).json({ error: "Internal server error" });
          }
});



module.exports = router;