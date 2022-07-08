const express = require("express");
const app = express();
const dotenv = require("dotenv");
const { default: mongoose } = require("mongoose");
const authRoute = require("./routers/auth");
const userRoute = require("./routers/users");
const postRoute = require("./routers/posts");
const categoryRoute = require("./routers/categories");

dotenv.config();
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URL)
  .then(console.log("Connected to mongo"))
  .catch((err) => console.log(err));

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);
app.use("/api/categories", categoryRoute);

app.listen(5050, () => {
  console.log("Backend is running");
});
