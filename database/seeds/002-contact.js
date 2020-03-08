exports.seed = function(knex) {
  return knex("contact").insert([
    {
      title: "Job Supervisor",
      name: "Rick Jones",
      phone_number: "123-555-2323",
    }
  ]);
};
