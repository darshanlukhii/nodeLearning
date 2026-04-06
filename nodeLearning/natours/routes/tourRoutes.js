const express = require("express");

const router = express.Router();
const tourControllers = require("../controllers/tourController");
const reviewController = require("../controllers/reviewController");

router.get("/:tourId/reviews", reviewController.getReviewsByTour);

router.route("/").get(tourControllers.getAllTours).post(tourControllers.createTour);
router.route("/:id").get(tourControllers.getTour).patch(tourControllers.updateTour).delete(tourControllers.deleteTour);

module.exports = router;
