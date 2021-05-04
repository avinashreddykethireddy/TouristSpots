
// ========================
// COMMENTS ROUTES
// ========================

var express = require("express");
var router = express.Router({mergeParams:true});
var Campground = require("../models/campground");
var Comment = require("../models/comment");
var middleware = require("../middleware");

// root route
router.get("/new",middleware.isloggedIn,function(req,res){
    // find campground by id
    Campground.findById(req.params.id,function(err,campground){
        if(err){
            console.log(err);
        }
        else{
            res.render("comments/new",{campground: campground});            
        }
    });

})

router.post("/",middleware.isloggedIn,function(req,res){
    // lookup campground using ID
    Campground.findById(req.params.id,function(err,campground){
        if(err){
            console.log(err);
            res.redirect("/campgrounds"); 
        }
        else{
            //console.log(req.body.comment);
            Comment.create(req.body.comment,function(err,comment){
                if(err){
                    req.flash("error","Something went wrong");
                    console.log(err);
                }
                else{
                    //add usernae and id to comment
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    //console.log("New comments username is :"+ req.user.username);
                    
                    //save comment
                    comment.save();
                    campground.comments.push(comment);
                    campground.save();
                    console.log(comment);
                    req.flash("success","Successfully added comment");
                    res.redirect("/campgrounds/"+campground._id);
                }
            });
                       
        
        }
    });
    // create new comment
    // connect new comment to campground
    // redirect campground show page
});

// comment edit route
router.get("/:comment_id/edit",middleware.checkCommentOwnership,function(req,res){
    Comment.findById(req.params.comment_id,function(err,foundComment){
        if(err){
            res.redirect("back");
        }
        else{
            req.flash("success","Successfully Comment deleted");
            res.render("comments/edit",{campground_id:req.params.id,comment: foundComment});
        }
    });
});

// comment update route
router.put("/:comment_id",middleware.checkCommentOwnership,function(req,res){
    Comment.findByIdAndUpdate(req.params.comment_id,req.body.comment,function(err,updatedComment){
        if(err){
            res.redirect("back");
        }
        else{
            res.redirect("/campgrounds/"+req.params.id);
        }
    });
});

// DESTROY comment
router.delete("/:comment_id",middleware.checkCommentOwnership,function(req,res){
    // findBY ID and Remove
    Comment.findByIdAndRemove(req.params.comment_id,function(err){
        if(err){
            console.log(err);
            res.redirect("back");
        }
        else{
            res.redirect("/campgrounds/"+req.params.id);
        }
    });
})





module.exports = router;