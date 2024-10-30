const { userModel } = require("../models");

const makeUser = async (payload) => {
  const response = await userModel.create(payload);

  return response;
};

const queryUser = async () => {
  const response = await userModel.find();

  return response;
};

module.exports = {
  makeUser,
  queryUser,
};
