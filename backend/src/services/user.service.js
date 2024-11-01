const { userModel } = require("../models");
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.ethereal.email",
  port: 587,
  secure: false, // true for port 465, false for other ports
  auth: {
    user: "bud.gibson@ethereal.email",
    pass: "ZGSPuZ3P6M1nJpkzyu",
  },
});

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

const CREATE_EMAIL = async (email, message) => {
  const info = await transporter.sendMail({
    from: '"Dicki 👻" <bud.gibson@ethereal.email>',
    to: email,
    subject: "Hi Salam kenal",
    text: `Hi Salam kenal ${message}`,
    html: `<b>Hi Salam kenal ${message}</b>`,
  });

  return info;
};

module.exports = {
  CREATE,
  UPDATE,
  DELETE,
  GET_ALL,
  GET_DETAIL,
  CREATE_EMAIL,
};
