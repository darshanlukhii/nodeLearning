const fs = require("fs");

const TOURS_FILE = `${__dirname}/../dev-data/data/tours-simple.json`;

/** @type {Array<Record<string, unknown>>} */
const tours = JSON.parse(fs.readFileSync(TOURS_FILE, "utf-8"));

function persistTours() {
  fs.writeFileSync(TOURS_FILE, JSON.stringify(tours), "utf-8");
}

function findTourIndexById(id) {
  return tours.findIndex((ele) => ele.id.toString() === id);
}

exports.getAllTours = (req, res) => {
  res.status(200).json({
    status: "success",
    results: tours.length,
    requestedAt: req.requestTime,
    data: {
      tours,
    },
  });
};

exports.getTour = (req, res) => {
  const id = req.params.id;
  const tour = tours.find((ele) => ele.id.toString() === id);

  if (!tour) {
    return res.status(404).json({
      status: "Failed",
      message: "InValid Id",
    });
  }

  res.status(200).json({
    status: "success",
    requestedAt: req.requestTime,
    results: tours.length,
    data: {
      tours: tour,
    },
  });
};

exports.createTour = (req, res) => {
  const newId = tours.length ? tours[tours.length - 1].id + 1 : 0;
  const newTour = Object.assign({ id: newId }, req.body);

  tours.push(newTour);
  try {
    persistTours();
  } catch (err) {
    tours.pop();
    return res.status(500).json({
      status: "error",
      requestedAt: req.requestTime,
      message: "Could not save tour",
    });
  }

  res.status(201).json({
    status: "success",
    requestedAt: req.requestTime,
    data: {
      tours,
    },
  });
};

exports.updateTour = (req, res) => {
  const idx = findTourIndexById(req.params.id);
  if (idx === -1) {
    return res.status(404).json({
      status: "Failed",
      message: "InValid Id",
    });
  }

  const id = tours[idx].id;
  Object.assign(tours[idx], req.body, { id });

  try {
    persistTours();
  } catch (err) {
    return res.status(500).json({
      status: "error",
      requestedAt: req.requestTime,
      message: "Could not save tour",
    });
  }

  res.status(200).json({
    status: "success",
    requestedAt: req.requestTime,
    data: {
      tours: tours[idx],
    },
  });
};

exports.deleteTour = (req, res) => {
  const idx = findTourIndexById(req.params.id);
  if (idx === -1) {
    return res.status(404).json({
      status: "Failed",
      message: "InValid Id",
    });
  }

  tours.splice(idx, 1);

  try {
    persistTours();
  } catch (err) {
    return res.status(500).json({
      status: "error",
      requestedAt: req.requestTime,
      message: "Could not save tour",
    });
  }

  res.status(204).send();
};
