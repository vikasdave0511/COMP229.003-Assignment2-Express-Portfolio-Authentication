let express = require("express");
let router = express.Router();
let mainController = require("../controllers/index");

/* GET home page. */
router.get("/", mainController.home);

/* GET projects page. */
router.get("/projects", mainController.projects);

/* GET about page. */
router.get("/about", mainController.about);

/* GET services page. */
router.get("/services", mainController.services);

/* GET contact page. */
router.get("/contact", mainController.contact);

module.exports = router;
