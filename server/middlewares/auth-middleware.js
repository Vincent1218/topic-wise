const { User } = require("../models");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const router = require("express").Router();

const userVerification = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ status: false });
  }
  try {
    jwt.verify(token, process.env.TOKEN_KEY, async (err, data) => {
      if (err) {
        return res.status(401).json({ status: false });
      }
      const user = await User.findById(data.id);
      if (!user) {
        return res.status(401).json({ status: false });
      }
      req.user = user;
      if (user) return res.json({ status: true, user: user.username });
      else return res.status(401).json({ status: false });
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ status: false });
  }
};

router.post("/", userVerification);
module.exports = router;
