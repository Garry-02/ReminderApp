const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const session = require("express-session");//must have for passport local session
const path = require("path");
const port = process.env.port || 3002;
//app refers to our Server
const GitHubStrategy = require("passport-github").Strategy;
const app = express();
require("dotenv").config()

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
const passport = require("./controller/middleware/passport");
const authRoute = require("./routes/authRoute");
const indexRoute = require("./routes/indexRoute");


// Middleware for express
//app.use(express.json());
//gets form data from the body via req.body
app.use(express.json());
app.use(expressLayouts);
app.use(express.urlencoded({ extended: true }));
//tells server to use passport
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

passport.serializeUser(function(user,cb)  {
  cb(null,user.id);
});

passport.deserializeUser(function(id,cb) {
  cb(null,id);
});

  
passport.use(new GitHubStrategy({
  clientID: process.env.CLIENT_SECRET,
  clientSecret: process.env.CLIENT_ID,
  callbackURL: "http://localhost:3002/auth/github/callback"
},
function (accessToken, refreshToken, profile, done) {
  User.getUserByGitHubIdOrCreate({ githubID: profile.id }, function (err, user) {
    return done(err, user);
  });
}
));

const isAuth = (req,res,next) => {
  if(req.user){
    next();
  } else{
    res.redirect('/login');
  }
}


app.get('/',isAuth, (req,res) => {
   res.sendFile(__dirname + './views/dashboard.ejs');
});

app.get('/login', (req,res) => {
  if(req.user){
    return res.redirect('/');
  }
  res.sendFile(__dirname + './routes/indexRoute.js');
});

app.get('/logout', (req,res) => {
  req.logOut();
  res.redirect("./routes/indexRoute.js")
});


app.get('/auth/github',passport.authenticate('github'));

app.get('/auth/github/callback', 
  passport.authenticate('github', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  });

app.listen(port, () => {
  console.log(`🚀 Server has started on port ${port}`);
});