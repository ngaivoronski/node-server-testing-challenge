const db = require("../data/dbConfig.js");

module.exports = {
    insert,
    update,
    remove,
    getAll,
    findById,
};

async function insert(user) {
  return db("users")
    .insert(user)
    .returning("id");
}

async function update(id, changes) {
    return null;
}

function remove(id) {
    return db("users")
    .where("id","=",id)
    .del();
}

function getAll() {
    return db("users");
}

function findById(id) {
    return null;
}