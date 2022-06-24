const Flight = require("../models/Flight");
const asyncHandler = require("express-async-handler");

const getFlight = asyncHandler(async (req, res) => {
  const flight = await Flight.findById(req.params.id);
  if (!flight) {
    throw new Error("No flights available");
  } else {
    res.json(flight);
  }
});

const CreateFlight = asyncHandler(async (req, res) => {
  const { title, time, price, date } = req.body;

  if (!title || !time || !price || !date) {
    res.status(400);
    throw new Error("Please Fill all the feilds");
    return;
  } else {
    const flight = new Flight({
      title,
      time,
      price,
      date,
    });

    const flightExists = await Flight.findOne(
      { title } || { time } || { price } || { date }
    );

    if (flightExists) {
      res.status(400);
      throw new Error("Already Applied, Please wait for a response!");
    }

    const createdFlight = await flight.save();

    res.status(201).json(createdFlight);
  }
});

const UpdateFlight = asyncHandler(async (req, res) => {
  const { title, time, price, date } = req.body;

  const flightSelected = await Flight.findById(req.params.id);

  if (title != flightSelected.title) {
    flightSelected.title = title;
    await flightSelected.save();
    res.json(flightSelected);
  }
  if (time != flightSelected.time) {
    flightSelected.time = time;
    await flightSelected.save();
    res.json(flightSelected);
  }
  if (price != flightSelected.price) {
    flightSelected.price = price;
    await flightSelected.save();
    res.json(flightSelected);
  }
  if (date != flightSelected.date) {
    flightSelected.date = date;
    await flightSelected.save();
    res.json(flightSelected);
  }
  if (null) {
    res.status(404);
    throw new Error("No changes made");
  }
});

const RemoveFlight = asyncHandler(async (req, res) => {
  const flightSelected = await Flight.findById(req.params.id);
  await flightSelected.remove();
  res.status(200).json({
    message: "Flight deleted",
  });
});

module.exports = {
  getFlight,
  CreateFlight,
  UpdateFlight,
  RemoveFlight,
};
