const db = require("../../data/dbconfig");

async function find() {
  const allUsers = await db("users");
  const allUsersRes = allUsers.map((item) => {
    return {
      userId: item.userId,
      userName: item.userName,
    };
  });
  return allUsersRes;
}
async function accordingTo(filter) {
  let filteredUsers = await db("users").where(filter);
  return filteredUsers;
}
async function accordingToId(userId) {
  let userId = await db("users").where("userId", userId);
  return { userId: userId.userId, userName: userId.userName };
}
async function add(user) {
  let insertId = await db("users").insert(user);
  let insertUser = await accordingToId(insertId);
  return insertUser;
}
module.exports = { find, accordingTo, accordingToId, add };
