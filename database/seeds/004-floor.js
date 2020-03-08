
exports.seed = function(knex) {
  return knex("floor").insert([
    {
      jobsite_id: 1,
      building_id: 1,
      name: '1',
      unit_count: 4,
      outlet_count: 11,
      notes: 'Random note',
      complete: false
    }
  ]);
};