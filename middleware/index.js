// all middleware goes here
var Campground = require("../models/campground");
var Comment = require("../models/comment");
var middlewareObj = {};

middlewareObj.checkCampgroundOwnership = function(req,res,next){
    if(req.isAuthenticated()){
            
        Campground.findById(req.params.id,function(err,foundCampground){
            if(err){
                req.flash("error","Campground not found");
                console.log(err);
                res.redirect("back");
            }
            else{
                // does user own the campground
                if(foundCampground.author.id.equals(req.user._id)){
                    next();
                }
                else{
                    req.flash("error","Permission denied");
                    res.redirect("back");
                }
            }
        });
    }
    else{
        req.flash("error","You must logged in to do that!");
        res.redirect("back");
    }
}
middlewareObj.checkCommentOwnership= function(req,res,next){
    if(req.isAuthenticated()){
            
        Comment.findById(req.params.comment_id,function(err,foundComment){
            if(err){
                console.log(err);
                res.redirect("back");
            }
            else{
                // does user own the campground
                if(foundComment.author.id.equals(req.user._id)){
                    next();
                }
                else{
                    req.flash("error","Permission denied");
    
                    res.redirect("back");
                }
            }
        });
    }
    else{
        req.flash("error","You must logged in to do that!");
        res.redirect("back");
    }
}

middlewareObj.isloggedIn = function(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error","You must logged in to do that!");
    res.redirect("/login");    
}

module.exports = middlewareObj;