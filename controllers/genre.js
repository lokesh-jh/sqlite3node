const Genre = require("../models/genre");

exports.getGenre = async(req, res) => {
  genrelist = await Genre.findAll();  
  res.render("genres", { genrelist});  
};
exports.getAddGenre = (req, res) => {
  res.render("addGenre");
};

exports.getUpdateGenre = async(req, res) => {
  const item = await Genre.findByPk(req.params.id); 
  res.render("updateGenre",{item});
};

exports.postUpdateGenre = async(req, res) => {
  //console.log(req.body.name, req.params.id);
  await Genre.update({name:req.body.name }, {
    where: {
      id:req.params.id
    }
  });  
  const genrelist = await Genre.findAll(); 
  res.render("genres",{genrelist});
};

exports.postAddGenre = async(req, res) => {
  await Genre.create(req.body);
  res.redirect("/admin/genres")
};

exports.getDeleteGenre = async(req, res) => {
  await Genre.destroy({
  where: {
    id: req.params.id
  }
});
const genrelist = await Genre.findAll();
res.render("genres", {genrelist});
};
