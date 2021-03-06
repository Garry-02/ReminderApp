module.exports = {
    ensureAuthenticated: function (req, res, next) {
      if (req.isAuthenticated()) {
        return next();
      }
      res.redirect("/login");
    },
    //if already logged in it will not allow the user to see the login page again, it will redirect to dashboard
    forwardAuthenticated: function (req, res, next) {
      if (!req.isAuthenticated()) {
        return next();
      }
      res.redirect("/reminders");
    },
    isAdmin: function (req, res, next) {
      if (!req.isAuthenticated() || req.user.role !== "admin") {
        res.redirect('/')
      };
      if (req.user.role === 'admin') {
        return next();
      }
    }
  };
  //when next is callled it means we are giving permission for the next code to run
  //so if ensureAuthenticated is false then it redirects to the login again and will keep doing so. This
  //ensureAuthenticated protects user information from allowing anyone to go to it,its a securtiy feature to make sure 
  //you are a logged in user to gain access