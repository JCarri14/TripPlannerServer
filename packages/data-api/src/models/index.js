const UserSchema = require("./user-schema");
const TripSchema = require("./trip-schema");
const TicketSchema = require("./ticket-schema");
const EventSchema = require("./event-schema");
const HotelSchema = require("./hotel-schema");
const LocationSchema = require("./location-schema");

module.exports = {
  User: UserSchema,
  Trip: TripSchema,
  Ticket: TicketSchema,
  Event: EventSchema,
  Hotel: HotelSchema,
  Location: LocationSchema,
};
