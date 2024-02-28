const fs = require("fs");
const express = require("express");

const app = express();

// app.get("/", (req, res) => {
//   res.status(404).json({ messages: "Hello i am here to learn a node", app: "Node learning" });
// });

// app.post("/", (req, res) => {
//   res.send("Here i am for a making a post api end point");
// });

const tours = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`));

app.get("/api/v1/tours/", (req, res) => {
  res.status(200).json({
    status: "success",
    results: tours.length,
    data: {
      tours,
    },
  });
});

const port = 3000;
app.listen(port, () => {
  console.log(`App running on the ${port}...`);
});
