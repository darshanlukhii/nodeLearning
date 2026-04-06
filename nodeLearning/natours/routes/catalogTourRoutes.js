const express = require("express");

const router = express.Router();
const catalogTourController = require("../controllers/catalogTourController");

router.route("/").get(catalogTourController.getAllCatalogTours).post(catalogTourController.createCatalogTour);
router
  .route("/:id")
  .get(catalogTourController.getCatalogTour)
  .patch(catalogTourController.updateCatalogTour)
  .delete(catalogTourController.deleteCatalogTour);

module.exports = router;
