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
  // console.log(postData.content)
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
      .json({ postId: newPost._id, message: "Post created successfully." });
  } catch (err) {
    // console.log(err.message);
    res.status(500).send({
      message: `Server Error creating post for User with ID : ${userId}`,
    });
  }
});
// Get a post by ID
router.get("/:userId/post/:postId", async (req, res) => {
  // console.log('hello')
  try {
    const userId = req.params.userId;
    const postId = req.params.postId;

    // find user
    const user = await User.findById(userId);
    // console.log(user)
    if (!user) {
      return res.status(404).send("User not found");
    }

    // find post for user
    const post = user.posts.id(postId);
    // console.log(post)
    if (!post) {
      return res.status(404).send("Post not found");
    }
    res.status(200).json(post);
  } catch (err) {
    res.status(500).send({
      message: `Server Error fetching post with ID : ${postId}`,
    });
  }
});

module.exports = router;
