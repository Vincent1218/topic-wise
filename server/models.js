const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postSchema = new Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  dateUpdated: { type: Date, default: Date.now },
  scores: { type: Schema.Types.Mixed, default: {} },
});

const userSchema = new Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  posts: [postSchema],
});

const User = mongoose.model("User", userSchema);
const Post = mongoose.model("Post", postSchema);

module.exports = { User, Post };
