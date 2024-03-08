const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const port = 8081;

app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Hello World");
});

const userRouter = require("./router/user.router");

app.use("/api/user", userRouter);

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
