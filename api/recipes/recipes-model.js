const db = require("../../data/dbConfig.js");


module.exports = {
  getAll,
  getById,
  create,
  updateById,
  removeById
};

function getAll () {
    return db("recipe")
}

function getById(id) {
    return db("recipe")
        .where("id", id)
}


function create (recipe) {
  return db("recipe")
    .insert(recipe)
    .then(([id]) => get(id));
}

function updateById (id, changes) {
  return db("recipe")
    .where("id", id)
    .update(changes)
    .then(count => (count > 0 ? get(id) : null));
}

function removeById(id) {
  return db("recipe")
    .where("id", id)
    .del();
}

