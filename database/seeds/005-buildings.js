exports.seed = function (knex) {
  return knex('buildings').insert([
    {
      jobsite_id: 1,
      name: 'A',
      complete: false,
    },
  ]);
};
