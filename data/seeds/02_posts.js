/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("posts").truncate();
  await knex("posts").insert([
    {
      userId: 1,
      postId: 1,
      postMeaning: "birseyler",
    },
    {
      userId: 2,
      postId: 2,
      postMeaning: "birseyler, birseyler",
    },
    {
      userId: 3,
      postId: 3,
      postMeaning: "birseyler, birseyler, birseyler",
    },
    {
      userId: 4,
      postId: 4,
      postMeaning: "birseyler, birseyler, birseyler, birseyler",
    },
  ]);
};
