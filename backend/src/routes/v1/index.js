const express = require("express");

const userRoute = require("./user.route");
const authRoute = require("./auth.route");

const router = express.Router();

const route_list = [
  {
    path: "/auth",
    route: authRoute,
  },
  {
    path: "/users",
    route: userRoute,
  },
];

for (const list of route_list) {
  router.use(list.path, list.route);
}

module.exports = router;
