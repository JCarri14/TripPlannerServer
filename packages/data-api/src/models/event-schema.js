const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const EventSchema = Schema(
  {
    name: {
      type: String,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    thumbnail: {
      type: String,
      trim: true,
    },
    rating: {
      type: Number,
      trim: true,
    },
    isPaid: {
      type: Boolean,
      trim: true,
    },
    price: {
      type: Number,
    },
    location: {
      type: Schema.Types.ObjectId,
      ref: "location",
    },
    startDate: {
      type: Date,
    },
    endDate: {
      type: Date,
    },
  },
  { timestamps: true },
);

const Event = mongoose.model("event", EventSchema);

module.exports = Event;
