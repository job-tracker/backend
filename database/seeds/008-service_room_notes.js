exports.seed = function (knex) {
  return knex('service_room_notes').insert([
    {
      jobsite_id: 1,
      building_id: 1,
      service_room_id: 1,
      note: 'Lockboxes are not in yet',
    },
  ]);
};
