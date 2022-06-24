const express = require("express");

const router = express.Router();
const controller = require("../controllers/flightController");

router.get("/flight/:id", controller.getFlight);
router.post("/flight", controller.CreateFlight);
router.patch("/flight/:id/update", controller.UpdateFlight);
router.delete("/flight/:id/remove", controller.RemoveFlight);

module.exports = router;
