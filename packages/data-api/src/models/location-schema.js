const mongoose = require("mongoose");
const { Schema } = require("mongoose");
const { isEmail } = require("validator");

const LocationSchema = Schema(
  {
    address: {
      type: String,
      trim: true,
    },
    city: {
      type: String,
      trim: true,
    },
    region: {
      type: String,
      trim: true,
    },
    country: {
      type: String,
      trim: true,
    },
    postalCode: {
      type: Number,
      trim: true,
    },
    latitude: {
      type: Number,
      trim: true,
    },
    longitude: {
      type: Number,
      trim: true,
    },
  },
  {
    timestamps: false,
  },
);

const Location = mongoose.model("location", LocationSchema);

module.exports = Location;
