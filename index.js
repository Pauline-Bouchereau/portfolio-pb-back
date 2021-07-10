require("dotenv").config();
const express = require("express");
const formidable = require("express-formidable");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(formidable());

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

const projectRoutes = require("./routes/project");
const contactRoutes = require("./routes/contact");
app.use(projectRoutes);
app.use(contactRoutes);

app.get("/", (req, res) => {
  res
    .status(200)
    .json({ message: "Bienvenue sur le backend de mon portfolio" });
});

app.all("*", (req, res) => {
  res.status(404).json({ message: "This page doesn't exist" });
});

app.listen(3001, () => {
  console.log("Server started !");
});
