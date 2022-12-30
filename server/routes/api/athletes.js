const express = require("express");
const router = express.Router();
const wrapAsync = require("../../utilities/wrapAsync");
const multer = require("multer");
const { storage } = require("../../config/cloudinary");
const { body, validationResult } = require("express-validator");
const Athlete = require("../../models/athlete");
const Sport = require("../../models/sport");

const upload = multer({ storage });

router.post(
  "/",
  // validations
  // body("name").isString().not().isEmpty(),
  // body("dob").isDate(),
  // body("address").isString().not().isEmpty(),
  // body("city").isString().not().isEmpty(),
  // body("state").isString().not().isEmpty(),
  // body("zipcode").isString().not().isEmpty(),
  // body("gender").isString().not().isEmpty(),
  // body("sports").isArray().not().isEmpty(),
  // body("interests").isArray().optional(),
  // uploading image to cloudinary
  upload.single("profileImage"),
  wrapAsync(async (req, res) => {
    console.log(req.body);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      name,
      dob,
      address,
      city,
      state,
      zipcode,
      country,
      gender,
      team,
      sports,
      about,
      interests,
    } = req.body;

    const file = req.file;
    console.log(file);
    const findAthlete = await Athlete.findOne({
      name: name.toLowerCase(),
      dob: dob,
    });
    if (findAthlete) {
      return res.status(400).json({ error: "User already exists" });
    }

    const newAthlete = new Athlete({
      name: name.toLowerCase(),
      dob: dob,
      address: address,
      city: city,
      state: state,
      zipcode: zipcode,
      country: country,
      team: team,
      gender: gender,
      about: about,
      interests: interests,
      profileImage: {
        url: file?.path,
        filename: file?.filename,
      },
    });
    for (let i = 0; i < sports.length; i++) {
      const sport = await Sport.findOne({
        name: sports[i],
      });
      if (!sport)
        res.status(400).json({ error: `Please choose a valid sport` });
      newAthlete.sports.push(sport);
    }
    const savedAthlete = await newAthlete.save();
    const athleteToReturn = await Athlete.findById(savedAthlete._id).populate(
      "profileImage"
    );
    res.send({
      athlete: athleteToReturn,
      msg: "Athlete successfully added!",
    });
  })
);

router.get(
  "/",
  wrapAsync(async (req, res) => {
    const athletes = await Athlete.find().populate("profileImage sports");
    return res.status(200).json(athletes);
  })
);
module.exports = router;
