
exports.seed = function(knex) {
  return knex("building").insert([
    {
      jobsite_id: 1,
      name: 'A',
      floor_count: 3,
      unit_count: 24,
      outlet_count: 72,
      notes: 'Random note',
      complete: false
    }
  ]);
};
