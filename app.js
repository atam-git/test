const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const mongoose = require("mongoose");
const passport = require("passport");
const flash = require("connect-flash");
const session = require("express-session");
require("dotenv").config();

const app = express();

const PORT = process.env.PORT || 3000;

// EJS
app.use(expressLayouts);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Set the 'public' directory to serve static files
app.use(express.static("public"));

// Passport Config
require("./config/passport")(passport);

// Express body parser
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB using Mongoose
const URI = process.env.MONGODB_URI;
mongoose.connect(URI);

// Check if MongoDB connected successfully
mongoose.connection.on("connected", () => {
  console.log("Connected to MongoDB");

  // Start the Express server after successful database connection
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});

// Handle MongoDB connection error
mongoose.connection.on("error", (err) => {
  console.error("MongoDB connection error:", err);
});

// Express session
app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Connect flash
app.use(flash());

// Global variables
app.use(function (req, res, next) {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  res.locals.error = req.flash("error");
  next();
});

// Routes
app.use("/", require("./routes/index.js"));
app.use("/users", require("./routes/users.js"));
