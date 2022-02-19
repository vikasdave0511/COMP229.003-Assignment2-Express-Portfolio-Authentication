var Contact = require("../models/contact");

// create and save new contact
exports.create = (req, res) => {
  // validate request
  if (!req.body) {
    res.status(400).send({ message: "Content can not be emtpy!" });
    return;
  }
  // new contact
  const contact = new Contact({
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
  });
  // save contact in the database
  contact
    .save(contact)
    .then((data) => {
      //res.send(data)
      res.redirect("/dashboard/add-contact");
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Some error occurred while creating a create operation",
      });
    });
};

// retrieve and return all contact/ retrive and return a single contact
exports.find = (req, res) => {
  if (req.query.id) {
    const id = req.query.id;

    Contact.findById(id)
      .then((data) => {
        if (!data) {
          res.status(404).send({ message: "Not found contact with id " + id });
        } else {
          res.send(data);
        }
      })
      .catch((err) => {
        res
          .status(500)
          .send({ message: "Erro retrieving contact with id " + id });
      });
  } else {
    Contact.find()
      .then((contact) => {
        res.send(contact);
      })
      .catch((err) => {
        res.status(500).send({
          message:
            err.message || "Error Occurred while retriving contact information",
        });
      });
  }
};

// Update a new idetified contact by contact id
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({ message: "Data to update can not be empty" });
  }

  const id = req.params.id;
  Contact.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot Update contact with ${id}. Maybe contact not found!`,
        });
      } else {
        res.send(data);
      }
    })
    .catch((err) => {
      res.status(500).send({ message: "Error Update contact information" });
    });
};

// Delete a contact with specified contact id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Contact.findByIdAndDelete(id)
    .then((data) => {
      if (!data) {
        res
          .status(404)
          .send({ message: `Cannot Delete with id ${id}. Maybe id is wrong` });
      } else {
        res.send({
          message: "User was deleted successfully!",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete User with id=" + id,
      });
    });
};
