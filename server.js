require("dotenv").config();
require('dotenv').config();
const express = require("express");
const app = express();
const path = require("path");
const cookieParser = require("cookie-parser");
const admin = require("firebase-admin");

// Use cookie-parser middleware



const db = require("./firebase"); 



// Set EJS as the view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Serve static files (CSS, images, JS)
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

const homeRoute = require("./routes/home");
const sighnupRoute = require("./routes/signup");
const loginRoute = require("./routes/login");
const profileRoute = require('./routes/profile');


app.use("/", homeRoute); 
app.use("/signup", sighnupRoute); 
app.use("/login", loginRoute);
app.use('/profile',profileRoute);

app.get("/logout", (req, res) => {
    console.log("I'm here");
    Object.keys(req.cookies).forEach(cookie => {
        res.clearCookie(cookie);
    });


    res.redirect("/");
});

app.get('/aboutus', (req,res) => {
    res.render('aboutus');
});

app.get('/contactus',(req,res) => {
    res.render('contactus');
});

app.get('/privacy', (req,res)=>{
    res.render('privacy');
});

app.get('/faq', (req,res)=>{
    res.render('faq');
});

app.get('/en', (req,res)=>{
    res.render('en1');
});

app.get('/en2', (req,res)=>{
    res.render('en2');
});

app.get('/en3', (req,res)=>{
    res.render('en3');
});

app.get('/bmi', (req,res)=>{
    res.render('bmi');
});

app.get('/heart', (req,res)=>{
    res.render('heart');
});

app.get('/quiz', (req,res)=>{
    res.render('quiz');
});

app.get('/firstaid', (req,res)=>{
    res.render('firstaid');
});

app.get('/doctor', (req,res)=>{
    res.render('doctor');
});

app.get('/lung', (req,res)=>{
    res.render('lung');
});

app.get('/fitness', (req,res)=>{
    res.render('fitness');
});

app.get('/mental', (req,res)=>{
    res.render('mental');
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});