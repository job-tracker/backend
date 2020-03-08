
exports.seed = function(knex) {
  return knex("unit").insert([
    {
      jobsite_id: 1,
      building_id: 1,
      floor_id: 1,
      name: '101',
      outlet_count: 3,
      notes: 'Random note',
      complete: true
    }
  ]);
};
