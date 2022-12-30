const mongoose = require("mongoose");
const connectDB = require("../config/db");
const Sport = require("../models/sport");
const dotenv = require("dotenv");

dotenv.config({ path: "./config/config.env" });

connectDB();

const seedSports = [
  { name: "Golf" },
  { name: "Tennis" },
  { name: "Cricket" },
  { name: "Basketball" },
  { name: "Baseball" },
  { name: "American Football" },
  { name: "Aquatics" },
  { name: "Archery" },
  { name: "Automobile Racing" },
  { name: "Badminton" },
  { name: "Beach Volleyball" },
  { name: "Bobsleigh" },
  { name: "Body Building" },
  { name: "Boxing" },
  { name: "Cross Country Running" },
  { name: "Cross Country Skiing" },
  { name: "Curling" },
  { name: "Cycling" },
  { name: "Darts" },
  { name: "Decathlon" },
  { name: "Down Hill Skiing" },
  { name: "Equestrianism" },
  { name: "eSports" },
  { name: "Fencing" },
  { name: "Field Hockey" },
  { name: "Figure Skating" },
  { name: "Gymnastics" },
  { name: "Ice Hockey" },
  { name: "Martial Arts" },
  { name: "Mixed Martial Arts" },
  { name: "Modern Pentathlon" },
  { name: "Motorcycle Racing" },
  { name: "Netball" },
  { name: "Polo" },
  { name: "Racquetball" },
  { name: "Rowing" },
  { name: "Rugby" },
  { name: "Sailing" },
  { name: "Softball" },
  { name: "Shooting" },
  { name: "Skateboarding" },
  { name: "Skeet Shooting" },
  { name: "Skeleton" },
  { name: "Snow Boarding" },
  { name: "Soccer (Football)" },
  { name: "Squash" },
  { name: "Surfing" },
  { name: "Swimming" },
  { name: "Track and Field" },
];

Sport.insertMany(seedSports)
  .then((res) => {
    console.log(res);
  })
  .catch((e) => {
    console.log(e);
  });
