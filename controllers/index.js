/* GET home page controller */
exports.home = function (req, res) {
  res.render("index", { title: "Home" });
};

/* GET projects page. controller*/
exports.projects = function (req, res) {
  res.render("projects", { title: "Projects" });
};

/* GET about page. controller*/
exports.about = function (req, res) {
  res.render("about", { title: "About" });
};

/* GET services page. controller*/
exports.services = function (req, res) {
  res.render("services", { title: "Services" });
};

/* GET contact page. controller*/
exports.contact = function (req, res) {
  res.render("contact", { title: "Contact" });
};
