exports.seed = function(knex) {
  return knex("contact").insert([
    {
      jobsite_id: 1,
      title: "Job Supervisor",
      name: "Rick Jones",
      phone_number: "123-555-2323",
    }
  ]);
};
