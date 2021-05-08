const mongoose = require("mongoose");
const { Schema } = require("mongoose");
const { isEmail } = require("validator");

const HotelSchema = Schema(
  {
    name: {
      type: String,
      trim: true,
    },
    thumbnail: {
      type: String,
      trim: true,
    },
    starRating: {
      type: Number,
      trim: true,
    },
    userRating: {
      type: String,
      trim: Number,
    },
    pricePerNight: {
      type: Number,
      trim: true,
    },
    landmarks: {
      type: [
        {
          type: String,
        },
      ],
      default: [],
    },
    location: {
      type: Schema.Types.ObjectId,
      ref: "location",
    },
  },
  { timestamps: true },
);

const Hotel = mongoose.model("hotel", HotelSchema);

module.exports = Hotel;
