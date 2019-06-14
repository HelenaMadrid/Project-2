module.exports = function(app) {
  // Load Home page
  app.get("/", function(req, res) {
    console.log("user: " + req.user);
    console.log("authenticated: " + req.isAuthenticated());
    res.render("homepage");
  });

  app.get("/register", function(req, res) {
    res.render("register", {
      title: "Registration"
    });
  });

  app.get("/login", function(req, res) {
    res.render("login", {
      title: "Login"
    });
  });

  app.get("/logout", function(req, res) {
    req.logout();
    req.session.destroy(function() {
      res.clearCookie("connect.sid");
      res.redirect("/");
    });
  });

  app.get("/profile", authenticationMiddleware(), function(req, res) {
    res.render("profile");
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};

function authenticationMiddleware() {
  return (req, res, next) => {
    console.log(
      "req.session.passport.user: " + JSON.stringify(req.session.passport)
    );
    if (req.isAuthenticated()) {
      return next();
    }
    res.redirect("/login");
  };
}
