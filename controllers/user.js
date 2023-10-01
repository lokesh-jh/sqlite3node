const User = require("../models/user");

exports.getUsers = async(req, res) => {
  userlist = await User.findAll();
  console.log(userlist[0]);
  res.render("users", { userlist});
};

exports.getDeleteUser = async(req, res) => {
  console.log(req.params);
  await User.destroy({
    where: {
      username: req.params.username
    }
  });
  const userlist = await User.findAll();
  res.render("users", {userlist});
};


exports.getProfile = (req, res) =>{      
  res.render("profile");
}

exports.postUpdateProfile = (req, res) =>{      
  res.render("profile");
}

exports.getCart = async(req, res) => {
  userlist = await User.findAll();  
  res.render("cart", { userlist});
};
exports.getAddtoCart = (req, res) =>{      
  res.render("cart");
}
exports.getOrders = (req, res) =>{      
  res.render("orders");}

exports.getProducts = (req, res) =>{      
  res.render("products");
}


