const Role = require("../models/role");
const {validationResult} = require("express-validator");

exports.getRole = async(req, res) => {
  rolelist = await Role.findAll();  
  res.render("roles", {rolelist});  
};
exports.getAddRole = (req, res) => {
  res.render("addRole",{ validationError:[] });
};

exports.getUpdateRole = async(req, res) => {
  const item = await Role.findByPk(req.params.id); 
  res.render("updateRole",{item});
};

exports.postUpdateRole = async(req, res) => {  
  await Role.update({role:req.body.role }, {
    where: {
      id:req.params.id
    }
  });

  const rolelist = await Role.findAll(); 
  res.render("roles",{rolelist});
};

exports.postAddRole = async(req, res) => {
    const result = validationResult(req);  
    if (!result.isEmpty()) {
      const validationError = result.array();
      console.log(validationError)
      return res.render("addRole", {validationError});
    }  
    await Role.create(req.body);
    res.redirect("/admin/roles")
  };

exports.getDeleteRole = async(req, res) => {
  await Role.destroy({
  where: {
    id: req.params.id
  }
});
const rolelist = await Role.findAll();
res.render("roles", {rolelist});
};
