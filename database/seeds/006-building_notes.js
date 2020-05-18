exports.seed = function (knex) {
  return knex('building_notes').insert([
    {
      jobsite_id: 1,
      building_id: 1,
      note: '3rd and 4th floors need to be completed',
    },
  ]);
};
