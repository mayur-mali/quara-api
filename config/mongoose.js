// require mongoose library
const mongoose = require("mongoose");

//connect to a databse connection
mongoose.connect("mongodb://localhost/quara_db");

// acquire a connection
const db = mongoose.connection;

// check if the error in connction
db.on("error", console.error.bind(console, "error in connection to database"));

// if connected to database successfully

db.once("open", function () {
  console.log("successfully connected to database");
});
