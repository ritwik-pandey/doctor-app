const express = require("express");
const router = express.Router();
const db  = require("../firebase");
const bcrypt = require("bcrypt"); 
const admin = require("firebase-admin");
const cookieParser = require("cookie-parser");


// login Page Route
router.get("/", (req, res) => {
  if(req.cookies && req.cookies.username){
    return res.redirect("/");
  }
    res.render("signup",{error: null});
});

router.post("/", async (req, res) => {
    
    try {
        
        const userName = req.body.name; 
        const userEmail = req.body.email;
        const userPassword = req.body.password;
        const userNumber = req.body.number;
        
        const userRef = db.collection("users").where("userEmail", "==", userEmail);
        const snapshot = await userRef.get();

        if(!snapshot.empty){
            return res.render("signup", { error: "Email is already registered" });
        }


        const hashedPassword = await bcrypt.hash(userPassword, 10);
        
        const createdAt = new Date().toISOString().split("T")[0];
        
        const docRef = await db.collection("users").doc(userEmail).set({
          userName,
          userEmail,
          hashedPassword,
          userNumber, 
          createdAt: createdAt,
        });

                      
    
        res.render('login',{error:"Successfully signed in! Please login"});
      } catch (error) {
        console.error("Error saving user:", error);
        res.status(500).json({ error: "Internal server error" });
      }
});


module.exports = router;