exports.seed = function (knex) {
  return knex('jobsite_notes').insert([
    {
      jobsite_id: 1,
      note: 'random note being random and a note!',
    },
  ]);
};
