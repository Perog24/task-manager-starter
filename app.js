const express = require("express");
const tasksRouter = require("./router/tasksRouter");
const validation = require("./middelware/inputValidation");
const app = express();
//Require .env
require("dotenv").config();

const PORT = process.env.PORT || 8000;

app.use(express.static("public"));
app.use(express.json());
app.use(validation);
app.use(tasksRouter);
app.listen(PORT);

