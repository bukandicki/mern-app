const express = require("express");
const { userController } = require("../../controllers");

const router = express.Router();

router
    .route("/")
    .post(userController.createUser)
    .get(userController.getUsers);

module.exports = router;
