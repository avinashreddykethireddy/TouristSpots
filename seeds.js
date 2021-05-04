const mongoose = require('mongoose');

var Campground = require("./models/campground");

var Comment = require("./models/comment");

var campy = [
    {
        name : "ONE WE",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRziMvL0VBsyvB6JFrmt6-JcWPQwQ22qPq4ZA&usqp=CAU",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eligendi non quis exercitationem culpa nesciunt nihil aut nostrum explicabo reprehenderit optio amet ab temporibus asperiores quasi cupiditate. Voluptatum ducimus voluptates voluptas?"  
    },
    {
        name : "TWO WE",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQSF8EReU2By1qfU08JH5IwxB2Leb1Bv_7kw&usqp=CAU",
        description: "HELLLO ME Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eligendi non quis exercitationem culpa nesciunt nihil aut nostrum explicabo reprehenderit optio amet ab temporibus asperiores quasi cupiditate. Voluptatum ducimus voluptates voluptas?"
    }
]

function seedDB(){
    Campground.remove({},function(err){
        if(err){
            console.log(err);
        }
        console.log("Removed all !");
        
        campy.forEach(function(seed){
            Campground.create(seed,function(err,campground){
                if(err){
                    console.log(err);
                }
                else{
                    console.log("Addedd !");
                    // create comment
                    Comment.create(
                        {
                            text:"THis is agood place!",
                            author: "karthik"
                        } ,function(err,comment){
                            if(err){
                                console.log(err);
                            }
                            else{
                                campground.comments.push(comment);
                                campground.save();
                                console.log("Created new Comment!");
                            }

                        });
                }
            });
        });
    });

}

module.exports = seedDB;

