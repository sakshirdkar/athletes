const mongoose = require("mongoose");
const geocoder = require("../utilities/geocoder");
const imageSchema = require("../schemas/image");

const athleteSchema = new mongoose.Schema({
  name: { type: String, required: true },
  dob: { type: Date, required: true },
  address: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  zipcode: { type: String, required: true },
  country: { type: String, required: true, default: "US" },
  formattedAddress: { type: String },
  team: { type: String, required: true },
  gender: { type: String, enum: ["male", "female"], required: true },
  sports: [{ type: mongoose.Schema.Types.ObjectId, ref: "Sport" }],
  about: { type: String, required: true },
  interests: [{ type: String, required: false }],
  profileImage: { type: imageSchema, required: false },
});

athleteSchema.pre("save", async function (next) {
  const loc = await geocoder.geocode(
    this.address +
      " " +
      this.city +
      " " +
      this.state +
      " " +
      this.zipcode +
      " " +
      this.country
  );
  this.formattedAddress = loc[0].formattedAddress;
  next();
});

module.exports = mongoose.model("Athlete", athleteSchema);
