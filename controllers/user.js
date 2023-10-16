const User = require("../models/user");

exports.getUsers = async(req, res) => {
  userlist = await User.findAll();  
  res.render("users", { userlist,loggedin:req.isAuthenticated()});
};

exports.getDeleteUser = async(req, res) => {  
  await User.destroy({
    where: {
      username: req.params.username
    }
  });
  const userlist = await User.findAll();
  res.render("users", {userlist,loggedin:req.query.loggedin});
};


exports.getProfile = (req, res) =>{      
  res.render("profile",{loggedin:req.isAuthenticated()});
}

exports.postUpdateProfile = (req, res) =>{      
  res.render("profile",{loggedin:req.isAuthenticated()});
}

exports.getCart = async(req, res) => {
  userlist = await User.findAll();  
  res.render("cart", { userlist,loggedin:req.isAuthenticated()});
};
exports.getAddtoCart = (req, res) =>{      
  res.render("cart",{loggedin:req.isAuthenticated()});
}
exports.getOrders = (req, res) =>{      
  res.render("orders",{loggedin:req.isAuthenticated()});}

exports.getProducts = (req, res) =>{      
  res.render("products",{loggedin:req.isAuthenticated()});
}




