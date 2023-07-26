const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const app = express();
const connectDB = require("./config/db");
const postRouter = require("./routes/api/posts");
const userRouter = require("./routes/api/user");
const verifyRouter = require("./middlewares/auth-middleware");
// middleware for parsing json objects
app.use(express.json());
app.use(cors());
app.use(cookieParser());
// routes
app.use("/api/users", userRouter);
app.use("/api/posts", postRouter);
app.use("/api/verify", verifyRouter)
// start server
const port = process.env.PORT || 8082;
app.listen(port, () => console.log(`Server running on port ${port}`));

// connect to db
try {
  connectDB();
} catch (err) {
  console.log("Error connecting to db ", err);
}
