const express = require("express");
const logger = require("morgan");
const cors = require("cors");
require("dotenv").config();

const authRouter = require("./routes/api/auth");
const contactsRouter = require("./routes/api/contacts");
const { customError } = require("./middlewares/customError");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use(express.static("public"))

app.use("/users", authRouter);
app.use("/api/contacts", contactsRouter);
app.use(customError);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

module.exports = app;
