const Author = require("../models/author");
const User = require("../models/user");
const {validationResult} = require("express-validator");

exports.getAuthors = async(req, res) => {
  const authorlist = await Author.findAll();
  //console.log(authorlist)  
  res.render("authors", { authorlist});  
};

exports.getAddAuthor = (req, res) => {
  res.render("addAuthor",{ validationError:[] });
};

exports.postAddAuthor = async(req, res) => {
  const result = validationResult(req);  
  if (!result.isEmpty()) {
    const validationError = result.array();
    console.log(validationError)
    return res.render("addAuthor", { validationError});
  }  
  await Author.create(req.body);
  res.redirect("/admin/authors")
};

exports.getUpdateAuthor = async(req, res) => {
  const item = await Author.findByPk(req.params.id); 
  res.render("updateAuthor",{item});
};

exports.postUpdateAuthor = async(req, res) => {  
  await Author.update({name:req.body.name }, {
    where: {
      id:req.params.id
    }
  });  
  const authorlist = await Author.findAll(); 
  res.render("authors",{authorlist});
};

exports.getDeleteAuthor = async(req, res) => {
  await Author.destroy({
    where: {
      id: req.params.id
    }
  });
  const authorlist = await Author.findAll();
  res.render("authors", {authorlist});
  };

