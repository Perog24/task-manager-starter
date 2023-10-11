const express = require("express");
const tasksRouter = require("./router/tasksRouter");
const validation = require("./middelware/inputValidation");
const app = express();

require("dotenv").config();

const PORT = process.env.PORT || 8000;

app.use(express.static("public"));
app.use(express.json());
app.use(validation);
app.use(tasksRouter);
app.use((err, req, res, next) => {
   if( err instanceof Error ) {
      res.status(500).json({error: err.message});
   } else {
   res.status(err.status).json({error: "Internal Server Error"})
   }
});
app.listen(PORT);

