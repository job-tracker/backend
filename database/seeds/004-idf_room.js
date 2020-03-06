
exports.seed = function(knex) {
  return knex("idf_room").insert([
    {
      building_id: 1,
      floor_id: 1,
      location: 'East',
      images: 'img url',
      notes: 'Random note',
      complete: false
    }
  ]);
};
