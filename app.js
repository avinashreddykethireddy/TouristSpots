var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var flash = require("connect-flash");
// DATA BASE SETUP
const mongoose = require('mongoose');

console.log(process.env.DATABASEURL);

//mongoose.connect('mongodb://localhost/yelp_camp', {useNewUrlParser: true, useUnifiedTopology: true});
// mongodb+srv://yelpcamp_mongo:Rama2001@yelpcamp.p4a8z.mongodb.net/test
// mongoose.connect('mongodb+srv://yelpcamp_mongo:Rama2001@yelpcamp.p4a8z.mongodb.net/test', {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.connect('process.env.DATABASEURL', {useNewUrlParser: true, useUnifiedTopology: true});

// SCHEMA
var Campground = require("./models/campground");
var Comment = require("./models/comment");
// comments
var seedDB = require("./seeds");

//seedDB();  // seed the database

// REFACTORING  

var commentRoutes = require("./routes/comments");
    campgroundRoutes = require("./routes/campgrounds");
    indexRoutes = require("./routes/index")



app.use(flash());
    //authentication
var passport = require("passport"),
    LocalStrategy = require("passport-local"),
    User = require("./models/user")

//PASSPORT CONFIGURATION
app.use(require("express-session")({
    secret: "Hi Avinash Decode it !",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(methodOverride("_method"));

app.use(function(req,res,next){
    res.locals.currentUser = req.user;
    res.locals.error= req.flash("error");
    res.locals.success= req.flash("success");
    
    next();
});

app.use(express.static(__dirname+"/public"));

app.use(bodyParser.urlencoded({extended:true}));


// var campgrounds = [
//     {name: "A", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDtHxyjWqrH5cL1r5-HO0hSE4AYL2sf-qwTw&usqp=CAU"},    
//     {name: "B", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlghk71oTTyUvW2bLWXeYhOlwyeklq8tfa0g&usqp=CAU"},
//     {name: "C", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQKcFj7bzJh29DeekT9twVUDRzKpQtIHgx9JA&usqp=CAU"}
//]

app.set("view engine", "ejs");

app.use("/",indexRoutes);
app.use("/campgrounds",campgroundRoutes);
app.use("/campgrounds/:id/comments",commentRoutes);

app.listen(process.env.PORT,process.env.IP);

// app.listen(3000,function(){
//     console.log("Yelpcamp Server started! http://localhost:3000/");
// });

//