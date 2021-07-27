const db = require('../../data/dbConfig.js');


async function add(newUser) {
    const [id] = await db("user as u").insert(newUser)
    return findByUserId(id)
}

 function findUsers() {
     return db("user")
 }

function findByUserName(username) {
    return db("user")
        .select("*")
        .where("username", username)
        .first()
}

 function findByUserId(id) {
     return db("user as u")
         .select("*")
         .where("id", id)
         .first()
 }



module.exports = {
    add,
    findUsers,
    findByUserName,
    findByUserId
}