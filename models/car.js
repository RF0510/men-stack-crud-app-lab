const mongoose = require("mongoose");


const carSchema = new mongoose.Schema({
  make: { type: String, required: true },
  color: { type: String, required: true },
  sports: Boolean
  });

  const Car = mongoose.model("Car", carSchema)

  module.exports = Car