const express = require("express");
const mongoose = require("mongoose");
const { MongoClient } = require("mongodb");
// models
require("./model/Student");
require("./model/Alumni");
require("./model/Schollarship");
require("./model/Feedback");
require("./model/Message");
// configuration
const { MONGO_URI, MONGO_URI_2 } = require("./config/keys");
// routes
const authRoutes = require("./routes/authRoutes");
const studentRoutes = require("./routes/studentRoutes");
const schollarshipRoutes = require("./routes/schollarshipRoutes");
const alumniRoutes = require("./routes/alumniRoutes");
const feedbackRoutes = require("./routes/feedbackRoutes");
const messageRoutes = require("./routes/messageRoutes");

// mongo setup
mongoose.connect(MONGO_URI_2, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false
});
const connection = mongoose.connection;
connection.once('open',() =>{
console.log("mongoDB database connection established successfully");
})
// const connection = mongoose.connection;
// connection
//   .once("open", () => {
//     console.log("mongoDB database connection established");
//   })
//   .on("error", (err) => {
//     console.log("Error: ", err);
//   });

const app = express();
app.use(express.json());
// express middlewares
app.use(authRoutes);
app.use(studentRoutes);
app.use(schollarshipRoutes);
app.use(alumniRoutes);
app.use(feedbackRoutes);
app.use(messageRoutes);
// server host config
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`listen on port ${PORT}`);
});
