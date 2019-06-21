var mongoose = require('mongoose');
var Campground = require('./models/campground');
var Comment = require('./models/comments');

var data = [
  {
    name: "Adirondacks",
    img: "https://dailygazette.com/sites/default/files/styles/article_image/public/180702d.jpg?itok=6L_qDMLP",
    description: "“When New Yorkers spend thousands of dollars on a membership, they should receive the services and amenities they’re promised,” Underwood said in a prepared statement. “This settlement compensates consumers who were duped and requires the companies to fully deliver what they promise to those who buy campground memberships.” ",
  },
  {
    name: " Great Smoky Mountains" ,
    img: "https://www.visitmysmokies.com/wp-content/uploads/2013/03/Sunset-Camping.jpg" ,
    description: "The flowers are blooming, and temperatures are on the rise. Camping season is here, and it’s time to slip into your hiking boots and pack the car with sleeping bags, tents and coolers. The Great Smoky Mountains, the mountain range lining the Tennessee and North Carolina Border, are home to America’s most visited national park The Great Smoky Mountains for valid reasons. The Smokies are known across the world for the diversity of animals, plants and breathtaking views. If you’re headed to the Smokies, whether you’re going for a day trip or week-long excursion, you’ll want to choose the campground that meets all of your outdoor adventure needs."
  },
  {
    name: "New river trail State Park" ,
    img: "https://d2y0su6ixv655t.cloudfront.net/wp-content/uploads/2014/07/16115316/BR15102803V_069.jpg" ,
    description: "New River Trail State Park has four primitive campgrounds: Cliffview, Millrace, Baker Island and Double Shoals. If you’re looking for a most unique tent-camping trip, this is the place to visit. Enjoy the amenities and adventures of the state park and retreat to a peaceful campsite to take in the serenity of nature. There is no vehicular access to the campsites, or any showers or bathhouses. Access to the campgrounds are hike-in or boat-in."
  }
];

function seedDB(){
  //Remove all
  Campground.deleteMany({},function(err){
    if(err){
      console.log(err);
    }else{
      console.log("removed!!");

      //add a few campgrounds

      data.forEach(function(seed){
        Campground.create(seed,function(err,data){
          if(err){
            console.log(err);
          }else{
            console.log("Added!");
            //add a few comments
            Comment.create(
              {
                name:"Abhisek",body:"The place is a great one, thought internet would be there!"
              },function(err,comment){
                  if(err){
                    console.log(err);
                  } else{
                    data.comments.push(comment);
                    data.save();
                    console.log("Added comment!");
                  }
              });
          }
        })
      })
    }
  });




}

module.exports = seedDB;
