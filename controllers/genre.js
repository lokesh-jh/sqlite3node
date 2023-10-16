const Genre = require("../models/genre");

exports.getGenre = async(req, res) => {
  genrelist = await Genre.findAll();  
  res.render("genres", { genrelist,loggedin:req.isAuthenticated()});  
};
exports.getAddGenre = (req, res) => {
  res.render("addGenre",{loggedin:req.isAuthenticated()});
};

exports.getUpdateGenre = async(req, res) => {
  const item = await Genre.findByPk(req.params.id); 
  res.render("updateGenre",{item,loggedin:req.query.loggedin});
};

exports.postUpdateGenre = async(req, res) => {  
  await Genre.update({name:req.body.name }, {
    where: {
      id:req.params.id
    }
  });  
  const genrelist = await Genre.findAll(); 
  res.render("genres",{genrelist,loggedin:req.isAuthenticated()});
};

exports.postAddGenre = async(req, res) => {
  await Genre.create(req.body);
  res.redirect("/admin/genres?loggedin=true")
};

exports.getDeleteGenre = async(req, res) => {
  await Genre.destroy({
  where: {
    id: req.params.id
  }
});
const genrelist = await Genre.findAll();
res.render("genres", {genrelist,loggedin:req.query.loggedin});
};
