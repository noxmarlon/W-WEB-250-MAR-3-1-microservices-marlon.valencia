const message = require("../controllers/message/message.controller.js");
var router = require("express").Router();
const { authJwt } = require("../middleware");
module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  // Post a new messahe
  router.post("/", [authJwt.verifyToken], message.create);

  // Retrieve all messages
  router.get("/", [authJwt.verifyToken], message.findAll);

  // Retrieve a single message with id
  router.get("/:id", [authJwt.verifyToken], message.findOne);

  // Update a message with id
  router.put("/:id", [authJwt.verifyToken], message.update);

  // Delete a message with id
  router.delete("/:id", [authJwt.verifyToken], message.delete);

  // Delete all messages
  router.delete("/", [authJwt.verifyToken], message.deleteAll);

  app.use("/api/message", router);
};
