const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const session = require("express-session");//must have for passport local session
const path = require("path");
const port = process.env.port || 3002;
//app refers to our Server   
const app = express();

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));//pictures
//sets ups sessions
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
//all congif for passport
const passport = require("./middleware/passport");
const authRoute = require("./routes/authRoute");
const indexRoute = require("./routes/indexRoute");
const helpRoute = require("./routes/helpRoute");

// Middleware for express
//app.use(express.json());
//gets form data from the body via req.body
app.use(expressLayouts);
app.use(express.urlencoded({ extended: true }));
//tells server to use passpoert
app.use(passport.initialize());
//tells server to use with sessions
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
//forward certain routes and can group similar items
//imported at the top from a folder
app.use("/", indexRoute);
app.use("/auth", authRoute);
app.use("/help", helpRoute);

app.listen(port, () => {
  console.log(`🚀 Server has started on port ${port}`);
});