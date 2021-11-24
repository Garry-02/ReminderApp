let {database} = require("../models/userModel");
const fetch = require("node-fetch")

let authController = {
  login: (req, res) => {
    res.render("auth/login");
  },

  register: (req, res) => {
    res.render("auth/register");
  },

  loginSubmit: (req, res) => {
    // implement
  },

  registerSubmit: (req, res) => {
    let rand_pic_url = 'https://api.unsplash.com/photos/random?client_id=SkbZtC5qiRRqDkFJBTl7J9bN8Ar5t5doimLxs-GCvoc'
  fetch(rand_pic_url).then(data => data.json()).then(d => {
    let newUser = {
      id: Math.floor(Math.random * 1000) + 1,
      email: req.body.email,
      password: req.body.password,
      reminders: [],
      profilePic: d.urls.full
    }
    database.push(newUser);
    res.redirect("/login") // somewhere

  })
  },
};

module.exports = authController;
