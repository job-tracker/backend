exports.seed = function (knex) {
  return knex('unit_notes').insert([
    {
      jobsite_id: 1,
      building_id: 1,
      floor_id: 1,
      unit_id: 1,
      note: 'Damaged sheet rock in master bedroom',
    },
  ]);
};
