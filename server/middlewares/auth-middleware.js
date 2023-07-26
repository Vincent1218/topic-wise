const { User } = require("../models");
require("dotenv").config();
const jwt = require("jsonwebtoken");

const userVerification = async (req, res, next) => {
  const token = req.cookies.token;
  console.log(token);
  if (!token) {
    return res
      .status(401)
      .json({ status: false, message: "No token provided" });
  }

  jwt.verify(token, process.env.TOKEN_KEY, async (err, decoded) => {
    if (err) {
      return res.json({ status: false });
    } else {
      const user = await User.findById(decoded.id);
      if (user) {
        req.user = user.email; // set the user object in the request
        next();
      } else {
        return res.json({ status: false });
      }
    }
  });
};

module.exports = userVerification;
