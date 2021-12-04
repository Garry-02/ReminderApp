let {database} = require("../models/userModel");
const fetch = require("node-fetch")
//let ID = {
 // getRandom() {
  //return Math.random();
//}}; Tried to create a function to use this as an id generator but feel that 
//this was not working becuase in the database we have an id hardcoded, I tried to 
// add a function in the database where Id is but it also nroke the code as it does below.

let authController = {
  login: (req, res) => {
    res.render("auth/login");
  },

  register: (req, res) => {
    res.render("auth/register");
  },

  loginSubmit: (req, res) => {
    res.render("/auth/dashboard")
  },



  registerSubmit: (req, res) => {
    let rand_pic_url = 'https://api.unsplash.com/photos/random?client_id=SkbZtC5qiRRqDkFJBTl7J9bN8Ar5t5doimLxs-GCvoc'
    fetch(rand_pic_url).then(data => data.json()).then(d => {
    let newUser = {
      //id: Math.floor(Math.random * 1000) + 1, this broke the code everytime no matter what I tried, so we had to assign a value
      id: 5,   
      name: req.body.username,
      email: req.body.email,
      password: req.body.password,
      reminders: [],
      role: "user",
      profilePic: d.urls.full,
    }
    console.log(newUser);
    database.push(newUser);
    res.redirect("/login") 

  })
  },
};

module.exports = authController;
