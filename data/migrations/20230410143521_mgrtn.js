/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  const all = knex.schema
    .createTable("users", (user) => {
      user.increments("userId"),
        user.string("userName").notNullable().unique(),
        user.string("userEmail").notNullable().unique(),
        user.timestamp("registerDate").defaultTo(knex.fn.now()),
        user.string("password").notNullable();
    })
    .createTable("posts", (post) => {
      post.increments("postId");
      post.string("postMeaning", 600).notNullable();
      post.timestamp("postDate").defaultTo(knex.fn.now());
      post
        .integer("userId")
        .notNullable()
        .references("userId")
        .inTable("users")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
    });
  return all;
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists("posts").dropTableIfExists("users");
};
//shema burada oluşturulacak
