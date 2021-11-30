const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const { ensureAuthenticated} = require("./controller/middleware/checkAuth")
const app = express();
const path = require("path");
const ejsLayouts = require("express-ejs-layouts");
const reminderController = require("./controller/reminder_controller");
const authController = require("./controller/auth_controller");
const session = require("express-session");
const multer = require("multer");
const imgur = require("imgur");
const cors = require("cors");
const fs = require("fs");

// const database = require("model/usermodel/{database}")


require("dotenv").config()

const passport = require("./controller/middleware/passport");
const authRoute = require("./routes/authRoute");
const indexRoute = require("./routes/indexRoute");
const adminRoute = require("./routes/adminRoute");
const fetch = require("node-fetch");


//start of the Profile Pic section

//random pic section

function randPicGen() {

  // let rand_pic_url = 'https://api.unsplash.com/photos/random?client_id=SkbZtC5qiRRqDkFJBTl7J9bN8Ar5t5doimLxs-GCvoc'
  // fetch(rand_pic_url).then(data => data.json()).then(d => console.log(d))
//   fs.readFile("randomImg.json", "utf8")
//     .then((content) => JSON.parse(content).users.urls.small)
//     .then((listOfUsers) => listOfUsers.find((user) => user.id === id))
//     .then((foundUser) => {
//       res.render("homepage", { user: foundUser });
//     });
  
//     fs.readFile("randomImg.json", "utf8")
//       .then((content) => JSON.parse(content).users)
//       .then((listOfUsers) => listOfUsers.find((user) => user.id === id))
//       .then((foundUser) => {
//         res.render("homepage", { user: foundUser });
//       });
//   });
  


// }
// now add this for each profile

}
const storage = multer.diskStorage({
  destination: "./uploads",
  filename: (req, file, callback) => {
    callback(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});
const upload = multer({
  storage: storage,
});


app.use(cors());

//inserted into ProfilePic section
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
//it is furhter down

 app.use(express.json({ extended: false }));
// app.use(express.urlencoded({ extended: true }));


app.use(upload.any());
// removes the image stored in "/uploads/" file
// after uploading the profile pic to imgur.
app.post("/uploads/", async (req, res) => {
  const file = req.files[0];
  try {
    const url = await imgur.uploadFile('./uploads/${file.filename}');
    res.json({ message: url.data.link });
    fs.unlinkSync('./uploads/${file.filename}');
  } catch (error) {
    console.log("error", error);
  }
});
// End of ProfilePic section.

app.use(express.urlencoded({ extended: true }));
app.use(expressLayouts);
app.use(ejsLayouts);

app.set("view engine", "ejs");
//tells server to use passport
app.use(passport.initialize());
// Routes start here
app.use(passport.session());

app.use((req, res, next) => {
  console.log(`User details are: `);
  console.log(req.user);

  console.log("Entire session object:");
  console.log(req.session);

  console.log(`Session details are: `);
  console.log(req.session.passport);
  next();
});

app.get("/reminders", ensureAuthenticated, reminderController.list);

app.get("/reminder/new", ensureAuthenticated, reminderController.new);

app.get("/reminder/:id", ensureAuthenticated, reminderController.listOne);

app.get("/reminder/:id/edit", ensureAuthenticated, reminderController.edit);

app.post("/reminder/", ensureAuthenticated, reminderController.create);

// Implement this yourself
app.post("/reminder/update/:id", ensureAuthenticated, reminderController.update);

// Implement this yourself
app.post("/reminder/delete/:id", ensureAuthenticated, reminderController.delete);

// Fix this to work with passport! The registration does not need to work, you can use the fake database for this.
app.get("/register", authController.register);
app.get("/login", authController.login);
//app.get("/create", reminderController.create)
app.post("/register", authController.registerSubmit);
app.post("/login", authController.loginSubmit);
//app.post("/reminders", reminderController.createSubmit);
app.get("/dashboard", ensureAuthenticated, (req, res) => {
  console.log(req.sessionID);
  res.render("auth/dashboard", {
    user: req.user,
  });
});

// app.use("/", indexRoute);
app.use("/auth", authRoute);

app.listen(3002, function () {
  console.log(
    "Server running. Visit: localhost:3002/reminders in your browser 🚀"
  );
});
