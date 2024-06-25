const express = require("express");

const router = express.Router();
const tourControllers = require("../controllers/tourController");

router.route("/").get(tourControllers.getAllTours).post(tourControllers.createTour);
router.route("/:id").get(tourControllers.getTour).patch(tourControllers.updateTour).delete(tourControllers.deleteTour);

module.exports = router;
