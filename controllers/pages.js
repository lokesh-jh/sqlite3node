exports.getHome = (req, res) => {
    res.render("home", { homeContent: "this is the home page" });
  };
  
  