const db = require("../../models");
const Message = db.message;
const Op = db.Sequelize.Op;

//Create and Save a new Message
exports.create = (req, res) => {
  //Validate request
  if (!req.body.message) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }

  //Create a Message
  const message = {
    message: req.body.message,
    room: req.body.room,
    userId: req.userId,
  };

  //Save Message in the database
  Message.create(message)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Message.",
      });
    });
};

//Retrieve all Messages from the database.
exports.findAll = (req, res) => {
  const message = req.query.message;
  var condition = message ? { message: { [Op.like]: `%${message}%` } } : null;

  Message.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving messages.",
      });
    });
};

//Find a single Message with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Message.findByPk(id)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving Message with id=" + id,
      });
    });
};

//Update a Message by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Message.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Message was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Message with id=${id}. Maybe Message was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Message with id=" + id,
      });
    });
};

//Delete a Message with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Message.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Message was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Message with id=${id}. Maybe Message was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Message with id=" + id,
      });
    });
};

//Delete all Messages from the database.
exports.deleteAll = (req, res) => {
  Message.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} Messages were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all messages.",
      });
    });
};
