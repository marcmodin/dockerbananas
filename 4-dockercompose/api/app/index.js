// index.js
const express = require("express");
//const cors = require("cors");
const app = express();

// Using cors for cross-domain-access
// app.use(
//   cors({
//     origin: "http://localhost"
//   })
// );

app.get("/api", (req, res) => {
  console.log("I just received a GET request on port 3000!");
  res.send({
    RESPONSE: "This content comes from our API!",
    environment: {
      host: process.env
    }
  });
});
// API served on port 3000
app.listen(3000, () => console.log("I just connected on port 3000!"));
