exports.seed = function (knex) {
  return knex('service_rooms').insert([
    {
      jobsite_id: 1,
      building_id: 1,
      location: 'East side of 4th floor',
      images: 'some url',
      complete: false,
    },
  ]);
};
