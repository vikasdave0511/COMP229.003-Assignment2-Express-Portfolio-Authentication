/* GET Login page controller */
exports.login = function (req, res) {
  res.render("login", { title: "Login" });
};

/* GET register page controller */
exports.register = function (req, res) {
  res.render("register", { title: "Register" });
};
