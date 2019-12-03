const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");

//Request Type     GET
//Route            api/users
//Access           Private
//Desc             Registering a User
router.get("/", (req, res) => {
  res.send("Get Registered User");
});

//Request Type     POST
//Route            api/users
//Access           Public
//Desc             Registering a User
router.post(
  "/",
  [
    check("name", "Please Add Your Name")
      .not()
      .isEmpty(),
    check("email", "Please Add Your E-mail Address").isEmail(),
    check("password", "A Valid Password is Required").isLength({ min: 8 })
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    res.send("User Registered");
  }
);

module.exports = router;
