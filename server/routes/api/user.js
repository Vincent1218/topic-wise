const express = require("express");
const bcrypt = require("bcryptjs");
const { createSecretToken } = require("./../../util/JWTToken");

const router = express.Router();

// load users and post models

const { User } = require("./../../models");

//sign up a  new user

router.post("/signup", async (req, res) => {
  // expecting email and password in body, format of post is as follows
  /* {
              email: "email",
              password: "password",
      }*/
  try {
    const { email, password } = req.body;
    // console.log(req.body);
    //validating email and password
    // if (!email || !password) {
    //   return res
    //     .status(400)
    //     .json({ message: "Please provide both email and password" });
    // }

    //checking if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });
    }
    // console.log("reached hashing");
    // hash the password
    // const salt = await bcrypt.genSalt(10);
    // const hashedPassword = await bcrypt.hash(password, salt);

    //create a new user

    const user = await User.create({ email, password }); //save user to database
    const token = createSecretToken(user._id);
    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "None",
      withCredentials: true,
    });
    res
      .status(201)
      .json({ message: "User signed up successfully", success: true, user });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ success: false, message: "Error while creating user" });
  }
});

//login an existing user
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Please provide both email and password" });
    }
    // console.log("email", email);
    const existingUser = await User.findOne({ email: email });
    // console.log(existingUser, "found user");
    if (!existingUser) {
      return res.status(400).json({ message: "User does not exist" });
    }
    const hashedPassword = existingUser.password;
    // console.log("hashedPassword", hashedPassword);
    const isMatch = await bcrypt.compare(password, hashedPassword);
    // console.log("isMatch", isMatch);
    if (!isMatch) {
      return res.status(402).json({ message: "Invalid credentials" });
    }
    const token = createSecretToken(existingUser._id);
    res.cookie("token", token, { httpOnly: false, withCredentials: true });
    res
      .status(201)
      .json({ message: "User logged in successfully", success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error while logging in" });
  }
});
module.exports = router;
