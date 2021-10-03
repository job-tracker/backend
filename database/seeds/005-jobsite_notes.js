exports.seed = function (knex) {
  return knex('jobsite_notes').insert([
    {
      user_id: 1001,
      jobsite_id: 1,
      note: 'random note being random and a note!',
      complete: false,
    },
    {
      user_id: 1002,
      jobsite_id: 2,
      note: 'random note being random and a note and also is the cousin of a random note!',
      complete: false,
    },
  ]);
};
