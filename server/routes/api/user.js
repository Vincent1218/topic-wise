const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
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

// signin an existing user

//

module.exports = router;
