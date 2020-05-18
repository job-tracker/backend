exports.seed = function (knex) {
  return knex('units').insert([
    {
      jobsite_id: 1,
      building_id: 1,
      floor_id: 1,
      name: '101',
      outlet_count: 3,
      complete: true,
    },
  ]);
};
