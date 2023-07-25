const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
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
    console.log(req.body);
    //validating email and password
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Please provide both email and password" });
    }

    //checking if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    console.log("reached hashing");
    // hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    //create a new user

    const newUser = new User({ email: email, password: hashedPassword });
    //save user to database
    await newUser.save();

    res.status(201).json(newUser);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error while creating user" });
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
    console.log("email", email);
    const existingUser = await User.findOne({ email: email });
    console.log(existingUser, "found user");
    if (!existingUser) {
      return res.status(400).json({ message: "User does not exist" });
    }
    const hashedPassword = existingUser.password;
    console.log('hashedPassword', hashedPassword)
    const isMatch = await bcrypt.compare(password, hashedPassword);
    console.log('isMatch', isMatch)
    if(!isMatch){
      return res.status(402).json({ message: "Invalid credentials" });
    }
    res.status(200).json({message: 'Login successful'})
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error while logging in" });
  }
});
module.exports = router;
