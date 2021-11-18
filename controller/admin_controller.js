let adminController = {
    revoke: (req, res) => {
    const sessionID = req.query.sessionid; //Gets targeted session.
    req.sessionStore.destroy(sessionID); //Destroys targeted session
    req.sessionStore.all((err, sess) => {
        if (err) {
          return console.log(err);
        }
        let keys = Object.keys(sess)
        res.render('admin/admin', { req, keys })
      })
    },
    adminmode: (req, res) => {
      req.sessionStore.all((err, sess) => {
        if (err) {
          return console.log(err);
        }
        let keys = Object.keys(sess)
        res.render("admin/admin", {req, keys});
      });
    }
}
module.exports = adminController;