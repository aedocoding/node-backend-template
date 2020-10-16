exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("users")
    .truncate()
    .then(() => {
      return knex("users").insert([
        {
          id: 1,
          username: "test",
          password: "test",
          email: "test@test.com",
        },
      ]);
    });
};
