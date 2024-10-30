const httpStatus = require("http-status");
const { userService } = require("../services");

const createUser = async (req, res) => {
  try {
    const user = await userService.makeUser(req.body);

    res.send({ data: user });
  } catch (error) {
    res.status(500).send(error);
  }
};

const getUsers = async (_, res) => {
  try {
    const user = await userService.queryUser();

    res.send({ data: user });
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = {
  createUser,
  getUsers,
};
