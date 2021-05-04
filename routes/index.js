var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");
var middleware = require("../middleware/index");

router.get('/', function(req, res){
    //res.send("Landing Page!");
    res.render("landing");
});


//=================
//===== AUTH ROUTES
//=================
router.get("/register",function(req,res){
    res.render('register');
});
// sign up logic
router.post("/register",function(req,res){
    var newUser = new User({username: req.body.username});
    User.register(newUser,req.body.password,function(err,user){
            
        if(err){
            // console.log("hello " + err);
            // console.log("hello avi1 " + err.message);
            
            req.flash("error",err.message);
            return res.render("register");
        }
        passport.authenticate("local")(req,res,function(){
            
            req.flash("success","Welcome to Yelpcamp " + user.username);
            res.redirect("/campgrounds");
        });
    }); 
});

// login form
router.get("/login",function(req,res){
    res.render('login');
});
// login  logic
router.post("/login",passport.authenticate("local", 
    {
        successRedirect: "/campgrounds",
        failureRedirect: "/login"
    }),function(req,res){    
});

// logout   
router.get("/logout",function(req,res){
    req.logout();
    req.flash("success","You have just logged out !");
    res.redirect("/campgrounds");
});


module.exports = router;