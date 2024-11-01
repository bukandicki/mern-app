const { userService } = require("../services");

const CREATE_USER = async (req, res) => {
  try {
    const user = await userService.CREATE(req.body);

    res.send({ data: user });
  } catch (error) {
    res.status(500).send(error);
  }
};

const GET_USER_LISTS = async (_, res) => {
  try {
    const user = await userService.GET_ALL();

    res.send({ data: user });
  } catch (error) {
    res.status(500).send(error);
  }
};

const UPDATE_USER = async (req, res) => {
  try {
    const user = await userService.UPDATE(req.params.id, req.body);

    res.send({ data: user });
  } catch (error) {
    res.status(500).send(error);
  }
};

const DELETE_USER = async (req, res) => {
  try {
    const user = await userService.DELETE(req.params.id);

    res.send({ data: user });
  } catch (error) {
    res.status(500).send(error);
  }
};

const SEND_EMAIL = async (req, res) => {
  try {
    const info = await userService.CREATE_EMAIL(
      req.body.email,
      req.body.message
    );

    res.send({ data: info });
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = {
  CREATE_USER,
  GET_USER_LISTS,
  UPDATE_USER,
  DELETE_USER,
  SEND_EMAIL,
};
