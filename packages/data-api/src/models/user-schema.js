const mongoose = require("mongoose");
const { Schema } = require("mongoose");
const { isEmail } = require("validator");

const UserSchema = Schema(
  {
    username: {
      type: String,
      trim: true,
      unique: true,
    },
    firstName: {
      type: String,
      trim: true,
    },
    lastName: {
      type: String,
      trim: true,
    },
    thumbnail: {
      type: String,
      trim: true,
      required: false,
    },
    email: {
      type: String,
      required: [true, "The email is required"],
      trim: true,
      unique: true,
      validate: {
        validator: (value) => isEmail(value),
        message: (props) => `The email ${props.value} is not valid`,
      },
    },
    location: {
      type: Schema.Types.ObjectId,
      ref: "location",
    },
    metadata: {
      extraIds: {
        type: Map,
        of: String,
      },
      active: {
        type: Boolean,
        default: true,
      },
      lastActiveAt: {
        type: Date,
        default: Date.now,
      },
    },
    trips: {
      type: [
        {
          type: Schema.Types.ObjectId,
          ref: "trip",
        },
      ],
      default: [],
    },
    following: {
      type: [
        {
          type: Schema.Types.ObjectId,
          ref: "user",
        },
      ],
      default: [],
    },
  },
  {
    timestamps: true,
  },
);

const User = mongoose.model("user", UserSchema);

module.exports = User;
