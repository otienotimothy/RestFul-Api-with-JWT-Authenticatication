const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");

//Request Type        GET
//Route               api/auth
//Access              Private
//Desc                Get Logged In User
router.get("/", (req, res) => {
  res.send("Logged In User");
});

//Request Type        POST
//Route               api/auth
//Access              Public
//Desc                Login a User
router.post(
  "/",
  [
    check("email", "Please enter a valid E-mail").isEmail(),
    check("password", "Please enter a Password").exists()
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
    }
    res.send("Login Successful");
  }
);

module.exports = router;
