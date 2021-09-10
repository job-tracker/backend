exports.seed = function (knex) {
  return knex('jobsite_notes').insert([
    {
      jobsite_id: 1,
      note: 'random note being random and a note!',
      complete: false,
    },
    {
      jobsite_id: 2,
      note: 'random note being random and a note and also is the cousin of a random note!',
      complete: false,
    },
  ]);
};
