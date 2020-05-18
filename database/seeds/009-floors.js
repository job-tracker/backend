exports.seed = function (knex) {
  return knex('floors').insert([
    {
      jobsite_id: 1,
      building_id: 1,
      name: '1',
      complete: false,
    },
  ]);
};
