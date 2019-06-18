var db = require("../models");
var passport = require("passport");

module.exports = function(app) {
  // Log-in user
  app.post(
    "/login",
    passport.authenticate("local", {
      successRedirect: "/profile",
      failureRedirect: "/login"
    })
  );

  // Create a new user
  app.post("/register", function(req, res) {
    req.checkBody("username", "Username field cannot be empty.").notEmpty();
    req
      .checkBody("username", "Username must be between 4-15 characters long.")
      .len(4, 15);
    req
      .checkBody("email", "The email you entered is invalid, please try again.")
      .isEmail();
    req
      .checkBody(
        "email",
        "Email address must be between 4-100 characters long, please try again."
      )
      .len(4, 100);
    req
      .checkBody("password", "Password must be between 8-100 characters long.")
      .len(8, 100);
    req
      .checkBody(
        "password",
        "Password must include one lowercase character, one uppercase character, a number and a special character."
      )
      .matches(
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.* )(?=.*[^a-zA-Z0-9]).{8,}$/,
        "i"
      );
    req
      .checkBody("passwordMatch", "Passwords do not match, please try again.")
      .equals(req.body.password);

    var errors = req.validationErrors();

    if (errors) {
      // console.log("errors: " + JSON.stringify(errors));
      res.render("register", {
        title: "Registration Error",
        errors: errors
      });
    } else {
      db.User.create(req.body).then(function() {
        res.redirect("/");

        // The below code would log-in a user upon registration

        // console.log(dbUser.dataValues.id);

        // var userId = dbUser.dataValues.id;

        // req.login(userId, function(err) {
        //   if (err) {
        //     throw err;
        //   }
        //   res.redirect("/login");
        // });
      });
    }
  });

  app.get("/api/profile", authenticationMiddleware(), function(req, res) {
    db.User.findAll({
      where: {
        id: req.session.passport.user
      },
      include: [{ all: true }]
    }).then(function(dbAuthor) {
      res.json(dbAuthor);
    });
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

passport.serializeUser(function(userId, done) {
  done(null, userId);
});

passport.deserializeUser(function(userId, done) {
  done(null, userId);
});
