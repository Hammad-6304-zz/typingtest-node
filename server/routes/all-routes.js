var passport = require("passport");
var fs = require("fs");
var session = require("express-session")

var User = require("../models/model-users");
var Results = require("../models/model-data")
var Data = require("../models/model-data");
var upload = require("../config/multer-config");

module.exports = function(server) {
  
server.get('/getall',(req,res)=>{
    Results.find({},(err,result)=>{
        if(err){
            res.send("something goes wrong  ")
            next()
        }
        res.send(result)
    })
})

server.post('/logout',(req,res)=>{
    req.session.destroy()
    res.json({logout:false})

})

  server.post("/signup", (req, res) => {
    var user = new User({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      date: req.body.date,
      time: req.body.time,
      firstName:req.body.firstName,
      lastName:req.body.lastName
    });
    user.save((err, user) => {
      if (err) {
        return res.json({ success: false, err: err });
      }
      res.json({ success: null, data: user });
    });
  });

  server.post("/login", passport.authenticate("local"), function(req,res) {
    
    res.json({ logg: true,userData:req.user });

    
    
  });

  server.get("/dashboard", function(req, res) {
    if (!req.isAuthenticated()) {
      res.send("Login Required to visit this page");
    } else {
        // res.json({active:true})
      res.send(
        "Yes you're logged in, and your data is available here: "
      );
      res.json({ loggedIn: true, err: "noerror" });
    }
  });

  server.post("/dataSubmit", function(req, res) {
    var data = new Data({
      dataname: req.body.dataname,
      wpm: req.body.wpm,
      accuracy: req.body.accuracy
    });
    data.save((err, data) => {
      if (err) {
        return res.json({ success: false, err: err });
      }
      res.json({ success: true, data: data });
    });
  });

 
};

// Users.
//             find({
//                 name: { $in: ['Talha', 'Test',] },
//                 balance: { $gt: 10, $lt: 1000000 },
//             }).
//             limit(10).
//             sort({ balance: 1 }).
//             exec(function (err, users) {
//                 if (err) {
//                     return res.json({ success: false, err: err })
//                 }
//                 res.json({ success: true, data: users })
//             });
