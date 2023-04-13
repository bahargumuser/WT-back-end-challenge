/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  await knex("users").truncate();
  return await knex("users").insert([
    {
      userName: "Birisi",
      userEmail: "birisi@gmail.com",
      password: "burasiTokenYapilacak1",
    },
    {
      userName: "Digeri",
      userEmail: "digeri@gmail.com",
      password: "burasiTokenYapilacak2",
    },
    {
      userName: "Oteki",
      userEmail: "oteki@gmail.com",
      password: "burasiTokenYapilacak3",
    },
    {
      userName: "Birdigeri",
      userEmail: "birdigeri@gmail.com",
      password: "burasiTokenYapilacak4",
    },
  ]);
};
