const express = require("express");
const app = express();
const path = require("path");
const bcrypt = require("bcryptjs");
const sequelize = require("./database");
const bodyParser = require("body-parser");
const multer = require('multer');
const {body} = require("express-validator");


//require routes
const adminRoutes = require("./routes/admin");
const registerRoutes = require("./routes/login");
const shopRoutes = require("./routes/shop");
const userRoutes = require("./routes/user");

//view engines
app.set("view engine", "ejs");
app.set("views", "views");
const { start } = require("repl");

// multercode
const fileFilter = (req, file, cb) => {
  // Define your criteria for accepting or rejecting files
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true); // Accept the file
  } else {
    cb(null, false);
  }
};
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Set the destination folder for uploaded files
  },
  filename: (req, file, cb) => {
    const timestamp = Date.now();
    cb(null, `${timestamp}-${file.originalname}`); // Set the filename to the original name of the file
  },
});

// passport code
const passport = require("passport");
const session = require("express-session");
const LocalStrategy = require("passport-local").Strategy;
const User = require("./models/user");
passport.use(
  new LocalStrategy(async function (username, password, done) {
    try {
      const user = await User.findOne({ where: { username: username } });

      if (!user) {
        return done(null, false, {
          message: "user does not exist",
        });
      }
      const matchpassword = await bcrypt.compare(
        password,
        user.dataValues.password
      );
      if (!matchpassword) {
        return done(null, false, {
          message: "incorrect password",
        });
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
  done(null, user.id);
});
passport.deserializeUser(async (id, done) => {
  const user = await User.findByPk(id);
  done(null, user);
});

app.use(
  session({
    secret: "your-secret-key",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());

// end passport code

// Middleware
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(multer({storage:storage}).single("image"));
app.use(express.static(path.join(__dirname, "public")));
function isAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login");
}


//login routes
//

app.post(
  "/login",
  passport.authenticate("local", { failureRedirect: "/register",failureMessage: true}),
    function (req, res) {
    console.log("hello")
    res.render("profile",{loggedin:req.isAuthenticated()});
  }
);

// routes
app.use(shopRoutes);
app.use(registerRoutes);
app.use("/admin",isAuthenticated, adminRoutes);
app.use(isAuthenticated,userRoutes);

// page not found
app.use((req, res) => {
  res.render("404", { pagetitle: "404 page not found" });
});

sequelize.sync().then(() => console.log("db is ready"));

app.listen(3000, () => {
  console.log("app is running");
});
