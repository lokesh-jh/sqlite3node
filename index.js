const express = require("express");
const path = require("path");
const app = express();
const bcrypt = require("bcryptjs");

const adminRoutes = require("./routes/admin");
const registerRoutes = require("./routes/login");
const pagesRoutes = require("./routes/pages");
const sequelize = require("./database");
const bodyParser = require("body-parser");
app.set("view engine", "ejs");
app.set("views", "views");

const { start } = require("repl");



// passport code
const passport = require("passport");
const session = require("express-session");
const LocalStrategy = require("passport-local").Strategy;
const User = require("./models/user");
passport.use(
  new LocalStrategy(async function (username,password, done) {
    try {
      const user = await User.findOne({ where: { username: username } });

      if (!user) {
        return done(null, false);
      }
      return done(null, user);
    } catch (error) {
      console.log(error);
      return done(error, false);
    }
  })
);

// Serialize and deserialize user for session management
passport.serializeUser((user, done) => {
  //console.log(user)
  done(null, user.id);
});
passport.deserializeUser(async(id, done) => {
  const user = await User.findByPk(id);
    //console.log(user);
    done(null, user);
});

app.use(session({ secret: "your-secret-key", resave: false, saveUninitialized: false }));
app.use(passport.initialize());

app.use(passport.session());
//console.log(req.user);

// end passport code
// Middleware
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

function isAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login");
}

// routing
app.use(pagesRoutes);
app.use("/admin", adminRoutes);
app.use(registerRoutes);
app.post(
  "/login",
  passport.authenticate("local", { failureRedirect: "/" }),
  //isAuthenticated,
  function (req, res) {
    console.log("hello",req.user);
    res.redirect("/admin/users");
  }
);
app.get(
  "/profile",
  
  isAuthenticated,
  function (req, res) {
    res.render("profile");
  }
);

app.get("/logout", (req, res) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
  }); // Passport.js method to log the user out
  res.redirect("/login"); // Redirect to the login page
});

// page not found
app.use((req, res) => {
  res.render("404", { pagetitle: "404 page not found" });
});

sequelize.sync().then(() => console.log("db is ready"));

app.listen(3000, () => {
  console.log("app is running");
});
