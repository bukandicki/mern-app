const express = require("express")
const { userController } = require("../../controllers")

const router = express.Router()

router
    .route("/")
    .post(userController.CREATE_USER)
    .get(userController.GET_USER_LISTS)

router
    .route("/:id")
    .patch(userController.UPDATE_USER)
    .delete(userController.DELETE_USER);

module.exports = router
