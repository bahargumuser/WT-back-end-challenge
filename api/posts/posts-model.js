const db = require("../../data/dbconfig");

const allPosts = () => {
  return db("posts");
};
const findPost = (postId) => {
  return db("post").where("postId", postId);
};
const newPost = async (input) => {
  const add = await db("posts").insert(input);
  return findPost(add[0]);
};
const upPost = async (postId, body) => {
  await db("posts").where("post_id", post_id).update(body);
  return findPost(postId);
};
const delPost = async (postId) => {
  return await db("posts").where("postId", postId).del();
};
module.exports = {
  allPosts,
  findPost,
  newPost,
  upPost,
  delPost,
};
