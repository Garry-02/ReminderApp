// const express = require("express");
// const expressLayouts = require("express-ejs-layouts");
// const { ensureAuthenticated} = require("./controller/middleware/checkAuth")
// const app = express();
// const path = require("path");
// const ejsLayouts = require("express-ejs-layouts");
// const reminderController = require("./controller/reminder_controller");
// const authController = require("./controller/auth_controller");
// const session = require("express-session");
// const multer = require("multer");
// const imgur = require("imgur");
// const cors = require("cors");
// const fs = require("fs");
// let {database} = require("../models/userModel");


document.getElementById("file").addEventListener("change", (ev) => {
    ev.preventDefault();
    console.log("i was run")
    const formdata = new FormData();
    formdata.append("image", ev.target.files[0]);
    fetch("http://localhost:3002/uploads", {
      method: "POST",
      body: formdata,
    })
      .then((data) => data.json())
      .then((data) => location.reload());
  });


//inserted into ProfilePic section
/*
app.use(express.static(path.join(__dirname, "public")));
app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: false,
      maxAge: 24 * 60 * 60 * 1000,
    },
  })
);
//ask jennifer about below commented out code
// why was this not inserted

// app.use(express.json({ extended: false }));
// app.use(express.urlencoded({ extended: true }));


app.use(upload.any());
// removes the image stored in "/uploads/" file
// after uploading the profile pic to imgur.
app.post("/uploads/", async (req, res) => {
  const file = req.files[0];
  try {
    const url = await imgur.uploadFile(`./uploads/${file.filename}`);
    res.json({ message: url.data.link });
    
    
    let userPic = url.data.link
    console.log(userPic)
    database.get(user.profilePic)
    console.log(user.profilePic)  
    //target the "id" element of the current user
    
  
    // get "profilePic" from "database", from usermodel
    //change the profilePic to url.data.link


    fs.unlinkSync(`./uploads/${file.filename}`);
  } catch (error) {
    console.log("error", error);
  }
});

*/