const express = require("express");
const route = express.Router();
const { ensureAuthenticated } = require("../config/auth");
const services = require("../services/contact");
const controller = require("../controllers/contact");

/**
 *  @description add contact
 *  @method GET /add-contact
 */
route.get("/add-contact", ensureAuthenticated, services.add_contact);

/**
 *  @description update contact
 *  @method GET /update-contact
 */
route.get("/update-contact", ensureAuthenticated, services.update_contact);

/**
 *  @description Root Route
 *  @method GET /
 */
route.get("/", ensureAuthenticated, services.homeRoutes);

// API
route.post("/api/contact", controller.create);
route.get("/api/contact", controller.find);
route.put("/api/contact/:id", controller.update);
route.delete("/api/contact/:id", controller.delete);

module.exports = route;
