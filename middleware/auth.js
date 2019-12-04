const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = (req, res, next) => {
  //Get Token from Header
  const token = req.header("x-auth-token");

  //Check if Token exist
  if (!token) {
    res.status(401).json({ msg: "No Token, Authorization Denied" });
  }

  try {
    //Verify the token
    const decoded = jwt.verify(token, config.get("jwtSecret"));

    /* Set the verified token(payload) to an object on the req
     * to be accessible on the request object */
    req.user = decoded.user;
    next();
  } catch (err) {
    console.error(err.message);
    res.status(401).json({ msg: "Invalid Token" });
  }
};
