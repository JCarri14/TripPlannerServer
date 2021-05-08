const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const TripSchema = Schema(
  {
    metadata: {
      author: {
        type: Schema.Types.ObjectId,
        ref: "user",
      },
      publicVisible: {
        type: Boolean,
        required: false,
        default: true,
      },
      collaborative: {
        type: Boolean,
        required: false,
        default: false,
      },
      collaborators: {
        type: [
          {
            type: Schema.Types.ObjectId,
            ref: "user",
          },
        ],
        default: [],
      },
    },
    startDate: {
      type: Date,
    },
    endDate: {
      type: Date,
    },
    tripOrigin: {
      location: {
        type: Schema.Types.ObjectId,
        ref: "location",
      },
      airport: {
        type: String,
        trim: true,
      },
    },
    tripDestinations: {
      type: [
        {
          location: {
            type: Schema.Types.ObjectId,
            ref: "location",
          },
          airport: {
            type: String,
            trim: true,
          },
        },
      ],
      default: [],
    },
    hotels: {
      type: [
        {
          type: Schema.Types.ObjectId,
          ref: "hotel",
        },
      ],
      default: [],
    },
    tickets: {
      type: [
        {
          type: Schema.Types.ObjectId,
          ref: "ticket",
        },
      ],
      default: [],
    },
    events: {
      type: [
        {
          type: Schema.Types.ObjectId,
          ref: "event",
        },
      ],
      default: [],
    },
  },
  { timestamps: true },
);

const Trip = mongoose.model("trip", TripSchema);

module.exports = Trip;
