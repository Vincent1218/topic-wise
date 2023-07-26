const express = require("express");
const router = express.Router();

router.post("/", async (req, res) => {
  const { content } = req.body;
  console.log(content);
});

module.exports = router;
