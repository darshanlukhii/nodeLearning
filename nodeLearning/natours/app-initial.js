const fs = require("fs");
const express = require("express");

const app = express();

app.use(express.json());

// app.get("/", (req, res) => {
//   res.status(404).json({ messages: "Hello i am here to learn a node", app: "Node learning" });
// });

// app.post("/", (req, res) => {
//   res.send("Here i am for a making a post api end point");
// });

const tours = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`));

// get the all data
app.get("/api/v1/tours/", (req, res) => {
  res.status(200).json({
    status: "success",
    results: tours.length,
    data: {
      tours,
    },
  });
});

// get a specific a data
app.get("/api/v1/tours/:id", (req, res) => {
  const id = req.params.id;
  const tour = tours.find((ele) => ele.id.toString() === id);

  if (!tour) {
    // if (id > tours.length) {
    return res.status(404).json({
      status: "Failed",
      message: "InValid Id",
    });
  }

  res.status(200).json({
    status: "success",
    results: tours.length,
    data: {
      tours: tour,
    },
  });
});

// add a data
app.post("/api/v1/tours/", (req, res) => {
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);

  tours.push(newTour);

  fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`, JSON.stringify(tours), (err) => {
    res.status(201).json({
      status: "success",
      data: {
        tours,
      },
    });
  });
});

// updating a exiting a data
app.patch("/api/v1/tours/:id", (req, res) => {
  if (req.params.id * 1 > tours.length) {
    // if (id > tours.length) {
    return res.status(404).json({
      status: "Failed",
      message: "InValid Id",
    });
  }

  res.status(200).json({
    status: "success",
    data: {
      tours: "Updating a data ....",
    },
  });
});

// deleting a data
app.delete("/api/v1/tours/:id", (req, res) => {
  if (req.params.id * 1 > tours.length) {
    // if (id > tours.length) {
    return res.status(404).json({
      status: "Failed",
      message: "InValid Id",
    });
  }
  res.status(204).json({
    statusbar: "success",
    data: null,
  });
});

const port = 3000;
app.listen(port, () => {
  console.log(`App running on the ${port}...`);
});
