const express = require("express");
const config = require("config");

//INIT APP
const app = express();

//INIT BODY_PARSER MIDDLEWARE
app.use(express.json({ extended: false }));

//ROUTES
app.use("/api/users", require("./routes/users"));
app.use("/api/auth", require("./routes/auth"));

app.listen(config.get("PORT"), () => {
  console.log(
    `Server running on port ${config.get(
      "PORT"
    )}... Press Ctrl + C to Terminate`
  );
});
