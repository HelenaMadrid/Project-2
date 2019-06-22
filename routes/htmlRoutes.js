var db = require("../models");
module.exports = function (app) {
  // Load Home page
  app.get("/", function (req, res) {
    console.log("user: " + req.user);
    console.log("authenticated: " + req.isAuthenticated());
    res.render("homepage");
  });

  app.get("/register", function (req, res) {
    res.render("register", {
      title: "Registration"
    });
  });

  app.get("/login", function (req, res) {
    res.render("login", {
      title: "Login"
    });
  });

  app.get("/print", authenticationMiddleware(), function (req, res) {
    db.User.findAll({
      where: {
        id: req.session.passport.user
      },
      include: [{ all: true }],
      order: [
        [db.Experience, 'entryDate', 'DESC'],
        [db.Studies, 'entryDateSchool', 'DESC'],
      ]
    }).then(function (results) {
      // console.log(results[0].dataValues);
      // eslint-disable-next-line camelcase
      res.render("print", { data: results[0] });
    });
  });

  app.get("/profesionalexperience", authenticationMiddleware(), function (req, res) {
    res.render("profesionalexperience");
  });



  app.get("/logout", function (req, res) {
    req.logout();
    req.session.destroy(function () {
      res.clearCookie("connect.sid");
      res.redirect("/");
    });
  });

  app.get("/profile", authenticationMiddleware(), function (req, res) {
    db.User.findAll({
      where: {
        id: req.session.passport.user
      },
      include: [{ all: true }],
      order: [
        [db.Experience, 'entryDate', 'DESC'],
        [db.Studies, 'entryDateSchool', 'DESC'],
      ]
    }).then(function (results) {
      // console.log(results[0].dataValues);
      // eslint-disable-next-line camelcase
      res.render("profile", { data: results[0] });
    });
  });

  app.get("/print/all", authenticationMiddleware(), function (req, res) {
    db.User.findAll({
      where: {
        id: req.session.passport.user
      },
      include: [{ all: true }],
      order: [
        [db.Experience, 'entryDate', 'DESC'],
        [db.Studies, 'entryDateSchool', 'DESC'],
      ]
    }).then(function (results) {
      // console.log(results[0].dataValues);
      // eslint-disable-next-line camelcase
      return res.json(results);
    });
  });





  app.post("/general", authenticationMiddleware(), function (req, res) {
    db.GeneralInfo.create({ ...req.body, UserId: req.session.passport.user }).then(function () {
      res.redirect("/profile");
    });
  });

  app.post("/experience", authenticationMiddleware(), function (req, res) {
    db.Experience.create({ ...req.body, UserId: req.session.passport.user }).then(function () {
      res.redirect("/profile");
    });
  });

  app.post("/skills", authenticationMiddleware(), function (req, res) {
    db.Skills.create({ ...req.body, UserId: req.session.passport.user }).then(function () {
      res.redirect("/profile");
    });
  });

  app.post("/languages", authenticationMiddleware(), function (req, res) {
    db.Languages.create({ ...req.body, UserId: req.session.passport.user }).then(function () {
      res.redirect("/profile");
    });
  });

  app.post("/studies", authenticationMiddleware(), function (req, res) {
    db.Studies.create({ ...req.body, UserId: req.session.passport.user }).then(function () {
      res.redirect("/profile");
    });
  });

  app.post("/deletegeneral/:id", function (req, res) {
    // We just have to specify which todo we want to destroy with "where"
    db.GeneralInfo.destroy({
      where: {
        id: req.params.id
      }
    }).then(function (dbTodo) {
      res.redirect("/profile");
    });
  });


  app.post("/deleteexp/:id", function (req, res) {
    // We just have to specify which todo we want to destroy with "where"
    db.Experience.destroy({
      where: {
        id: req.params.id
      }
    }).then(function (dbTodo) {
      res.redirect("/profile");
    });
  });



  app.post("/deletestudies/:id", function (req, res) {
    // We just have to specify which todo we want to destroy with "where"
    db.Studies.destroy({
      where: {
        id: req.params.id
      }
    }).then(function (dbTodo) {
      res.redirect("/profile");
    });
  });
  // Render 404 page for any unmatched routes
  app.get("*", function (req, res) {
    res.render("404");
  });


  app.post("/deleteskills/:id", function (req, res) {
    // We just have to specify which todo we want to destroy with "where"
    db.Skills.destroy({
      where: {
        id: req.params.id
      }
    }).then(function (dbTodo) {
      res.redirect("/profile");
    });
  });

  app.post("/deletelanguages/:id", function (req, res) {
    // We just have to specify which todo we want to destroy with "where"
    db.Languages.destroy({
      where: {
        id: req.params.id
      }
    }).then(function (dbTodo) {
      res.redirect("/profile");
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
