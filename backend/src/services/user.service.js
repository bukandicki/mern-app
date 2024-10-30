const { userModel } = require("../models");

const CREATE = async (payload) => {
  const response = await userModel.create(payload);

  return response;
};

const UPDATE = async (id, payload) => {
  const response = await userModel.findByIdAndUpdate(id, { ...payload });

  return response;
};

const DELETE = async (id) => {
  const response = await userModel.findByIdAndDelete(id);

  return response;
};

const GET_ALL = async () => {
  const response = await userModel.find();

  return response;
};

const GET_DETAIL = async (email) => {
  const response = await userModel.findOne({ email });

  return response;
};

module.exports = {
  CREATE,
  UPDATE,
  DELETE,
  GET_ALL,
  GET_DETAIL,
};
