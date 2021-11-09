const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const userController = require("../controllers/userController");
const localLogin = new LocalStrategy(
  {
    usernameField: "email",
    passwordField: "password",
  },

//inside of function we first check database for user with email and password, if not return null
//if not null passing to done function otherwise we pass null, if called with a user we create a session 
//if we send false instead of user we don't create a session becuase no user found so pass in a error message
//the third parameter is done which is a callback function given by passport and it must be called
  (email, password, done) => {
    const user = userController.getUserByEmailIdAndPassword(email, password);
    return user
      ? done(null, user)
      : done(null, false, {
          message: "Your login details are not valid. Please try again",
        });
  }
);
//This is where the session is created
//when the seesion is created what does it look like? stores some type of infop that will allow us to identify them that we store for the session 
//creates a special variable req.user = user; gives all the information about the currently logged in user
passport.serializeUser(function (user, done) {
  //the second parameter is telling you what to store in the session 
  done(null, user.id);
});
//This ensures that everytime you refresh a page or navigate to another it makes sure to provide the most up to date information
passport.deserializeUser(function (id, done) {
  let user = userController.getUserById(id);
  if (user) {
    done(null, user);
  } else {
    done({ message: "User not found" }, null);
  }
});

module.exports = passport.use(localLogin);