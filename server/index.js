const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const app = express();
const connectDB = require("./config/db");
const postRouter = require("./routes/api/posts");
const userRouter = require("./routes/api/user");
const userVerification = require("./middlewares/auth-middleware");
const classifyRouter = require("./routes/api/classify");
// middleware for parsing json objects
app.use(express.json());
app.use(express.static("public"));

// app.use(
const allowedOrigins = [
  "http://localhost:5173",
  "https://askwaai.azurewebsites.net",
  "https://askwaai.com",
];
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        const msg = `The CORS policy for this site does not allow access from the specified Origin.`;
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(cookieParser());

app.use("/api/users", userRouter);
app.use("/api/posts", postRouter);
app.get("/api/verify", userVerification, (req, res) => {
  res.status(200).json({ status: true, user: req.user });
});
app.use("/api/classify", classifyRouter);
// start server
const port = process.env.PORT || 8082;
app.listen(port, () => console.log(`Server running on port ${port}`));

// connect to db
try {
  connectDB();
} catch (err) {
  console.log("Error connecting to db ", err);
}
