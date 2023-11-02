const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();

//routes import
const account_route = require("./Routes/account"); //route
const aidRequest_route = require("./Routes/aidRequest"); //route
const aidOffer_route = require("./Routes/aidOffer"); //route

//port
const port = process.env.PORT || 5000;

connection = mongoose
  .connect("mongodb://127.0.0.1:27017/globalAid")
  .then(() => {
    console.log("connected");
  });

//use middleware
app.use(cors({ origin: true, credentials: false }));
app.use(express.json({ extended: true }));
app.use("/api/account", account_route);
app.use("/api/aidRequst", aidRequest_route);
app.use("/api/aidOffer", aidOffer_route);

//Listening to our Servers
try {
  app.listen(port, () => console.log(`Server running on port ${port}`));
} catch (e) {
  console.log(e.message);
}
