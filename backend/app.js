const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
const route = require("./api/todoPostAPI");
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(
  cors({
    origin: "https://mern-note.skdivedi.me",
  })
);

const PORT = process.env.PORT || 3001;
const URI = process.env.MONGO_URI;

mongoose
  .connect(URI)
  .then(() => console.log("mongoDB connected successfully"))
  .catch((err) => console.error(err));

app.get("/", (req, res) => {
  res.send("this is the backend main home page");
});
app.get("/api", (req, res) => {
  res.send("this is api home page");
});

app.use("/api", route);
app.listen(PORT, () => {
  console.log(`app is running on port ${PORT}`);
});
