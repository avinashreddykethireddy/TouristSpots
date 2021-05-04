var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");
var middleware = require("../middleware");

// INDEX - show all campgrounds
router.get("/",function(req, res){
    Campground.find({},function(err,allCampgrounds){
        if(err){
            console.log(err);
        }
        else{
            //console.log(allCampgrounds);
            res.render("campgrounds/index",{campgrounds:allCampgrounds, currentUser: req.user});
        }
    });
    //res.render("campgrounds",{campgrounds:campgrounds});
});

// CREATE - add new campground to data base
router.post("/",middleware.isloggedIn,function(req, res){
   // res.send("JIIII");
    var name = req.body.name;
    var image = req.body.image;
    var price = req.body.price;
    var desc = req.body.description;
    var author = {
        id: req.user._id,
        username: req.user.username
    };
    var newCampground = {name:name,image:image,price: price,description: desc,author:author};
    
 
    Campground.create(newCampground,function(err,newlyCreated){
        if(err){
            console.log(err);
        }
        else{
            
            res.redirect("/campgrounds");
        }
    })
    //campgrounds.push(newCampground);
    
});

//NEW - show form to crete new campgrounds
router.get("/new",middleware.isloggedIn,function(req,res){
    res.render("campgrounds/new");
});

router.get("/:id",function(req,res){
    //this will find the campground with provided ID
    Campground.findById(req.params.id).populate("comments").exec(function(err,foundCampground){
        if(err){
            console.log(err);
        }
        else{
            //console.log(foundCampground);
            res.render("campgrounds/show",{campground:foundCampground});
        }
    });
    // render show template with that campground
    //res.send("THis will added soon@!");
    
});

// EDIT CAMPGROUND ROUTE
router.get("/:id/edit",middleware.checkCampgroundOwnership,function(req,res){
    
    Campground.findById(req.params.id,function(err,foundCampground){
        res.render("campgrounds/edit",{campground: foundCampground});
    });      
    
});
// UPDATE CAMPGROUND ROUTE

router.put("/:id",middleware.checkCampgroundOwnership,function(req,res){
    //find and update correct campground
    Campground.findByIdAndUpdate(req.params.id,req.body.campground,function(err,updatedCampground){
        if(err){
            res.redirect("/campgrounds");
        }
        else{
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
    //redirect somewhere (show page)

});

// DESTROY (DELETE) CAMPGROUND ROUTE
router.delete("/:id",middleware.checkCampgroundOwnership,function(req,res){
    Campground.findByIdAndRemove(req.params.id,function(err){
        if(err){
            res.redirect("/campgrounds");
        }
        else{
            res.redirect("/campgrounds");
        }
    });
});





module.exports = router;