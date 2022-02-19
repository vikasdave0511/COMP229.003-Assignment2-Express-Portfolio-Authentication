const axios = require("axios");
const dotenv = require("dotenv");
dotenv.config({ path: "config.env" });
const URL =
  process.env.URL ||
  "https://vikasdve.herokuapp.com/" ||
  "http://localhost:4000/";
exports.homeRoutes = (req, res) => {
  axios
    .get(`${URL}` + `dashboard/api/contact`)
    .then(function (response) {
      console.log(response.data);
      res.render("bContact", {
        users: response.data,
        title: "Contact Dashboard",
      });
    })
    .catch((err) => {
      res.send(err);
    });
};

exports.add_contact = (req, res) => {
  res.render("add_contact", { title: "Add Contact" });
};

exports.update_contact = (req, res) => {
  axios
    .get(`${URL}` + `dashboard/api/contact`, {
      params: { id: req.query.id },
    })
    .then(function (userdata) {
      console.log(userdata.data);
      res.render("update_contact", {
        user: userdata.data,
        title: "Update Contact",
      });
    })
    .catch((err) => {
      res.send(err);
    });
};
