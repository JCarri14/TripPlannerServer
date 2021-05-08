const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const TicketSchema = Schema(
  {
    transportType: {
      type: String,
      enum: ["plane", "car", "boat"],
    },
    transportDuration: {
      type: Number,
    },
    departureTime: {
      type: Date,
    },
    arrivalTime: {
      type: Date,
    },
    ticketPrice: {
      type: Number,
      min: 0,
    },
    seatNumber: {
      type: String,
    },
    flightData: {
      airportName: {
        type: String,
        trim: true,
      },
      airlineName: {
        type: String,
      },
      location: {
        type: Schema.Types.ObjectId,
        ref: "location",
      },
    },
    carData: {},
    boatData: {},
  },
  { timestamps: true },
);

const Ticket = mongoose.model("ticket", TicketSchema);

module.exports = Ticket;
