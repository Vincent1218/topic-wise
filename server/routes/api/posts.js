const express = require("express");
const router = express.Router();

// load users and post models

const { User, Post } = require("./../../models");

//show all posts for user
router.get("/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await User.findById(userId).exec();
    if (!user) {
      return res.status(404).send("User not found");
    }
    // console.log(user);
    const posts = user.posts;
    res.status(200).json(posts);
  } catch (err) {
    // console.log(err.message);
    res.status(500).send({
      message: `Server Error fetching posts for User with ID : ${userId}`,
    });
  }
});

//create post for user
router.post("/", async (req, res) => {
  //expecting userId and post in body, format of post is as follows
  /* {
            title: "title",
            content: "content",
    }*/

  const userId = req.body.userId;
  const postData = req.body.post;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).send("User not found");
    }
    const newPost = new Post(postData);
    user.posts.push(newPost);
    await user.save();

    return res
      .status(200)
      .json(`Post created with id ${newPost._id} for User with id ${userId}`);
  } catch (err) {
    // console.log(err.message);
    res.status(500).send({
      message: `Server Error creating post for User with ID : ${userId}`,
    });
  }
});

module.exports = router;
