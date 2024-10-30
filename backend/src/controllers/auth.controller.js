const { userService } = require("../services");
const bcrypt = require("bcryptjs");

const login = async (req, res) => {
  try {
    const user = await userService.GET_DETAIL(req.body.email);
    
    const passwordIsMatch = await bcrypt.compare(req.body.password, user.password)
    
    if (!user) return res.send({ message: "User Not Found" });
    else if (!passwordIsMatch) return res.send({ message: "Password not match" });

    user.last_logout = null;
    user.last_login = new Date()

    await user.save()

    res.status(200).send({ message: "Login succeed!" })
  } catch (error) {
    res.status(500).send(error);
  }
};

const logout = async (req, res) => {
  try {
    const user = await userService.GET_DETAIL(req.body.email);

    if (!user) return res.send({ message: "User Not Found" });
    else if (user.last_logout) return res.send({ message: "You already logged out!" });
    else if (!user.last_login) return res.send({ message: "Something wen't wrong!" });

    user.last_logout = new Date()

    await user.save()

    res.status(200).send({ message: "Logout succeed!" });
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = {
  login,
  logout,
};
