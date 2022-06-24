const express = require("express");
const { json } = require("express");
const flights = require("./controllers/flightController");
const models = require("./models/Flight");
const connectDB = require("./models/db");
const dotenv = require("dotenv");
const routes = require("./routes/flightRoute");
const { errorHandler, notFound } = require("./middleware/errorMiddleware.jsx");

const app = express();

dotenv.config();

connectDB();

app.use(json());

app.use("/api", routes);

app.use(notFound);
app.use(errorHandler);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
