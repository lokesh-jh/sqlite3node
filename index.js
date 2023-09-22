const express = require("express");
const flash = require('express-flash');
const app = express();
const path = require("path");
const bcrypt = require("bcryptjs");
const sequelize = require("./database");
const bodyParser = require("body-parser");

//require routes
const adminRoutes = require("./routes/admin");
const registerRoutes = require("./routes/login");
const pagesRoutes = require("./routes/pages");
//const userRoutes = require("./routes/user");

//view engines
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
        return done(null, false,{
          message: "user does not exist"
      });
      }
      const matchpassword = await (bcrypt.compare(password,user.dataValues.password));
      if (!matchpassword) {
        return done(null, false,{
          message: "incorrect password"
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
passport.deserializeUser(async(id, done) => {
  const user = await User.findByPk(id);    
    done(null, user);
});

app.use(session({ secret: "your-secret-key", resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());
//app.use(flash());
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
app.get("/",function (req, res) {    
  res.render("home");
} )
app.use(pagesRoutes);
app.use("/admin", isAuthenticated,adminRoutes);
app.use(isAuthenticated,userRoutes);
app.use(registerRoutes);
app.post(
  "/login",
  passport.authenticate("local", { failureRedirect: "/login",failureMessage: true}),  
    function (req, res) {    
    res.redirect("/profile");
  }
);
exports.getLogin = (req, res) => {  
  if(!req.session.messages){
    //console.log("logged out")
    const message= ["you have been logged out"];
  } else{
       
        console.log(req.session.messages);
  }
 
  res.render("login",{message:[]});
};


// page not found
app.use((req, res) => {
  res.render("404", { pagetitle: "404 page not found" });
});

sequelize.sync().then(() => console.log("db is ready"));

app.listen(3000, () => {
  console.log("app is running");
});
