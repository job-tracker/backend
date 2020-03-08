
exports.seed = function(knex) {
  return knex("idf_room").insert([
    {
      jobsite_id: 1,
      building_id: 1,
      location: 'East end of 1st floor',
      images: 'img url',
      notes: 'Random note',
      complete: false
    }
  ]);
};
