const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const User = require("../models/Users");

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
    check("email", "Please Add a Valid E-mail Address").isEmail(),
    check(
      "password",
      "Please enter a password with a minimum of 8 characters"
    ).isLength({ min: 8 })
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    let { name, email, password } = req.body;

    try {
      const salt = await bcrypt.genSalt(10);

      password = await bcrypt.hash(password, salt);

      let user = await User.findOne({ email });

      if (user) {
        res.status(400).json({ msg: "user already exists" });
      }

      user = new User({
        name,
        email,
        password
      });

      await user.save();
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
    res.send("User Registered");
  }
);

module.exports = router;
