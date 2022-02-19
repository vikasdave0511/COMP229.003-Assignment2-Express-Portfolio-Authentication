const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const passport = require("passport");
const User = require("../models/User");

const { forwardAuthenticated } = require("../config/auth");
let authController = require("../controllers/auth");

router.get("/login", forwardAuthenticated, authController.login);

router.get("/register", forwardAuthenticated, authController.register);

router.post("/register", (req, res) => {
  //extract all variables
  const { name, email, password, password2 } = req.body;
  let errors = [];

  //check required fields
  if (!name || !email || !password || !password2) {
    errors.push({ msg: "Please fill in all fields !" });
  }

  //confirm password
  if (password != password2) {
    errors.push({ msg: "Passwords don't match" });
  }

  //check passwords length
  if (password.length < 6) {
    errors.push({ msg: "Password should be at least 6 characters" });
  }

  if (errors.length > 0) {
    res.render("register", {
      errors,
      name,
      email,
      password,
      password2,
    });
  } else {
    //validation passes
    User.findOne({ email: email }).then((user) => {
      if (user) {
        //already user exist
        errors.push({ msg: "Email is already registered" });
        res.render("register", {
          errors,
          name,
          email,
          password,
          password2,
        });
      } else {
        //i have model User,so i will create new instance
        const newUser = new User({
          name: name,
          email: email,
          password: password,
        });

        //hash the password
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            //set password to hash
            newUser.password = hash;

            //save user
            newUser
              .save()
              .then((user) => {
                req.flash("success_msg", "You're now registerd,can login !");
                res.redirect("/users/login");
              })
              .catch((err) => console.log(err));
          });
        });
      }
    });
  }
});

router.post("/login", (req, res, next) => {
  passport.authenticate("local", {
    successRedirect: "/dashboard",
    failureRedirect: "/users/login",
    failureFlash: true,
  })(req, res, next);
});

// Logout
router.get("/logout", (req, res) => {
  req.logout();
  req.flash("success_msg", "You are logged out");
  res.redirect("/users/login");
});

module.exports = router;
